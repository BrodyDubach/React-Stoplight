import React, { useState, useEffect } from "react";

const Home = () => {
  const [home, setHome] = useState("green");
  const [intervalOn, setIntervalOn] = useState(true);
  const [lights, setLights] = useState([]);
  const [purpleLightOn, setPurpleLightOn] = useState(false);

  useEffect(() => {
    let intervalId;

    if (intervalOn) {
      intervalId = setInterval(() => {
        switch (home) {
          case "red":
            setHome("yellow");
            break;
          case "yellow":
            setHome("green");
            break;
          case "green":
            setHome("red");
            break;

        }

        if (purpleLightOn) {
          setLights((prevLights) =>
            prevLights.length > 0 && prevLights[prevLights.length - 1] === "purple"
              ? prevLights.slice(0, -1)
              : [...prevLights, "purple"]
          );
        }
      }, 2000);
    }

    return () => clearInterval(intervalId);
  }, [home, intervalOn, purpleLightOn]);

  const toggleInterval = () => {
    setIntervalOn(!intervalOn);
  };

  const togglePurpleLight = () => {
    setPurpleLightOn(!purpleLightOn);
  };

  return (
    <>
      <div className="stick mx-auto"></div>
      <div className="container">
        {lights.map((light, index) => (
          <div key={index} className={`${light} light`}></div>
        ))}
        <div
          className={home === "red" ? "red light glow" : "red light"}
          onClick={() => setHome("red")}
        ></div>
        <div
          className={home === "yellow" ? "yellow light glow" : "yellow light"}
          onClick={() => setHome("yellow")}
        ></div>
        <div
          className={home === "green" ? "green light glow" : "green light"}
          onClick={() => setHome("green")}
        ></div>

        {purpleLightOn &&        
		<div className={home === "purple" ? "purple light glow" : "purple light"}
          onClick={() => setHome("purple")}
        ></div>}
      </div>
      <button onClick={toggleInterval}>
        {intervalOn ? "Stop Interval" : "Start Interval"}
      </button>
      <button onClick={togglePurpleLight}>
        {purpleLightOn ? "Remove Purple Light" : "Add Purple Light"}
      </button>
    </>
  );
};

export default Home;