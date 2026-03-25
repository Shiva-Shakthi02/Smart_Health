import React from "react";
import "./../App.css";

function Home() {
  return (
    <div className="home">

      <div className="home-content">

        <h1 className="title">Smart Health Monitoring System</h1>

        <p className="description">
        A modern health monitoring platform that helps track
        heart rate, stress level, temperature, sleep data and
        provides smart health alerts for better wellbeing.
        </p>

      </div>

      <div className="about">
        <h3>About Us</h3>

        <p>
        Our system helps users monitor daily health metrics,
        analyze mood patterns and receive preventive alerts
        for a healthier lifestyle.
        </p>
      </div>

    </div>
  );
}

export default Home;