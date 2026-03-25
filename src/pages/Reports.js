import React, { useEffect, useState, useCallback } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import "../App.css";

function Reports() {
  const [reportType, setReportType] = useState("daily");

  const [reportData, setReportData] = useState({
    heart: [],
    temp: [],
    sleep: [],
    steps: [],
    water: [],
    mood: []
  });

  const [summary, setSummary] = useState({
    avgHeartRate: 0,
    avgTemperature: 0,
    avgSleep: 0,
    totalSteps: 0,
    totalWater: 0,
    topMood: "No Data",
    healthStatus: "Normal"
  });

  const filterDataByType = (data, type, dateKey) => {
    const now = new Date();

    return data.filter((item) => {
      if (!item[dateKey]) return true;

      const itemDate = new Date(item[dateKey]);
      if(isNaN(itemDate.getTime())) return true;

      const diffTime = now - itemDate;
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      if (type === "daily") {
        return diffDays <= 7;
      } else if (type === "weekly") {
        return diffDays <= 30;
      } else if (type === "monthly") {
        return diffDays <= 365;
      }

      return true;
    });
  };

  const formatLabel = (dateString, type) => {
    const date = new Date(dateString);

    if (type === "daily") {
      return date.toLocaleDateString("en-US", { weekday: "short" });
    } else if (type === "weekly") {
      return `W${Math.ceil(date.getDate() / 7)}`;
    } else if (type === "monthly") {
      return date.toLocaleDateString("en-US", { month: "short" });
    }

    return dateString;
  };

  const calculateAverage = (data, key) => {
    if (data.length === 0) return 0;
    const total = data.reduce((sum, item) => sum + Number(item[key] || 0), 0);
    return (total / data.length).toFixed(1);
  };

  const calculateTotal = (data, key) => {
    if (data.length === 0) return 0;
    return data.reduce((sum, item) => sum + Number(item[key] || 0), 0);
  };

  const getTopMood = (moodCounts) => {
    let max = 0;
    let mood = "No Data";

    Object.keys(moodCounts).forEach((key) => {
      if (moodCounts[key] > max) {
        max = moodCounts[key];
        mood = key;
      }
    });

    return mood;
  };

  const fetchReportsData = useCallback(async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("User not logged in");
        return;
      }

      const userId = user._id;

      const [heartRes, tempRes, sleepRes, stepsRes, waterRes, moodRes] =
        await Promise.all([
          fetch(`http://localhost:5000/api/heartrate/${userId}`),
          fetch(`http://localhost:5000/api/temperature/${userId}`),
          fetch(`http://localhost:5000/api/sleep/${userId}`),
          fetch(`http://localhost:5000/api/steps/${userId}`),
          fetch(`http://localhost:5000/api/water/${userId}`),
          fetch(`http://localhost:5000/api/mood/${userId}`)
        ]);

      const heartData = await heartRes.json();
      const tempData = await tempRes.json();
      const sleepData = await sleepRes.json();
      console.log("Sleep API Data:", sleepData);
      const stepsData = await stepsRes.json();
      const waterData = await waterRes.json();
      const moodData = await moodRes.json();

      const filteredHeart = filterDataByType(heartData, reportType, "date");
      const filteredTemp = filterDataByType(tempData, reportType, "date");
      const filteredSleep = filterDataByType(sleepData, reportType, "date");
      console.log("Filtered Sleep:", filteredSleep);
      const filteredSteps = filterDataByType(stepsData, reportType, "date");
      const filteredWater = filterDataByType(waterData, reportType, "date");
      const filteredMood = filterDataByType(moodData, reportType, "date");

      const heartChart = filteredHeart.map((item) => ({
        day: formatLabel(item.date, reportType),
        rate: Number(item.heartRate || 0)
      }));

      const tempChart = filteredTemp.map((item) => ({
        day: formatLabel(item.date, reportType),
        temp: Number(item.temperature || 0)
      }));

      const sleepChart = filteredSleep.map((item, index) => ({
        day: item.date ? formatLabel(item.date, reportType): `Sleep ${index + 1}`,
        hours: Number(item.sleepHours ?? 0)
      }));

      const stepsChart = filteredSteps.map((item) => ({
        day: formatLabel(item.date, reportType),
        count: Number(item.steps || 0)
      }));

      const waterChart = filteredWater.map((item) => ({
        day: formatLabel(item.date, reportType),
        liters: Number(item.amount || 0)
      }));

      const moodCounts = {
        Happy: 0,
        Neutral: 0,
        Sad: 0,
        Stressed: 0
      };

      filteredMood.forEach((item) => {
        if (moodCounts[item.mood] !== undefined) {
          moodCounts[item.mood] += 1;
        }
      });

      const moodChart = Object.keys(moodCounts).map((key) => ({
        name: key,
        value: moodCounts[key]
      }));

      setReportData({
        heart: heartChart,
        temp: tempChart,
        sleep: sleepChart,
        steps: stepsChart,
        water: waterChart,
        mood: moodChart
      });

      const avgHeartRate = calculateAverage(filteredHeart, "heartRate");
      const avgTemperature = calculateAverage(filteredTemp, "temperature");
      const avgSleep = filteredSleep.length
      ? (
        filteredSleep.reduce((sum,item) => sum + Number(item.sleepHours ?? 0),0)
         /filteredSleep.length
      ).toFixed(1)
      : 0;
      const totalSteps = calculateTotal(filteredSteps, "steps");
      const totalWater = calculateTotal(filteredWater, "amount");
      const topMood = getTopMood(moodCounts);

      let healthStatus = "Normal";

      if (
        Number(avgHeartRate) > 100 ||
        Number(avgTemperature) > 38 ||
        Number(avgSleep) < 5
      ) {
        healthStatus = "Warning";
      }

      setSummary({
        avgHeartRate,
        avgTemperature,
        avgSleep,
        totalSteps,
        totalWater,
        topMood,
        healthStatus
      });
    } catch (error) {
      console.log("Error fetching reports data", error);
    }
  }, [reportType]);

  useEffect(() => {
    fetchReportsData();
  }, [fetchReportsData]);

  const downloadPDF = () => {
    const input = document.getElementById("report-content");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("Health_Report.pdf");
    });
  };

  const data = reportData;

  return (
    <div className="reports-page">
      <h1>Health Reports</h1>

      <div className="report-buttons">
        <button onClick={() => setReportType("daily")}>Daily</button>
        <button onClick={() => setReportType("weekly")}>Weekly</button>
        <button onClick={() => setReportType("monthly")}>Monthly</button>
      </div>

      <div className="reports-container">
        <div className="chart-card">
          <h3>❤️ Heart Rate</h3>

          <LineChart width={350} height={220} data={data.heart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="rate" stroke="#ff4d4d" />
          </LineChart>
        </div>

        <div className="chart-card">
          <h3>🌡 Body Temperature</h3>

          <LineChart width={350} height={220} data={data.temp}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="temp" stroke="#ff9f43" />
          </LineChart>
        </div>

        <div className="chart-card">
          <h3>😴 Sleep Hours</h3>

          <BarChart width={350} height={220} data={data.sleep}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis domain={[0, 12]} />
            <Tooltip />
            <Bar dataKey="hours" fill="#6c63ff" />
          </BarChart>
        </div>

        <div className="chart-card">
          <h3>👣 Steps Walked</h3>

          <BarChart width={350} height={220} data={data.steps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#20c997" />
          </BarChart>
        </div>

        <div className="chart-card">
          <h3>💧 Water Intake</h3>

          <BarChart width={350} height={220} data={data.water}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="liters" fill="#3498db" />
          </BarChart>
        </div>

        <div className="chart-card">
          <h3>😊 Mood Distribution</h3>

          <PieChart width={300} height={220}>
            <Pie
              data={data.mood}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {data.mood.map((entry, index) => (
                <Cell
                  key={index}
                  fill={["#6c63ff", "#ff9f43", "#2ecc71", "#ff4d6d"][index % 4]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </div>
      </div>

      <div id="report-content" className="a4-report">
        <h2>Smart Health Monitoring Report</h2>

        <p>
          <b>Name:</b> User
        </p>

        <p>
          <b>Date:</b> {new Date().toLocaleDateString()}
        </p>

        <p>
          <b>Report Type:</b> {reportType}
        </p>

        <hr />

        <p>Average Heart Rate: {summary.avgHeartRate} bpm</p>
        <p>Average Temperature: {summary.avgTemperature}°C</p>
        <p>Average Sleep: {summary.avgSleep} hours</p>
        <p>Total Steps: {summary.totalSteps}</p>
        <p>Total Water Intake: {Number(summary.totalWater).toFixed(2)} L</p>
        <p>Mood Status: {summary.topMood}</p>

        <hr />

        <p>Health Status: {summary.healthStatus}</p>
      </div>

      <button className="download-btn" onClick={downloadPDF}>
        Download PDF
      </button>
    </div>
  );
}

export default Reports;