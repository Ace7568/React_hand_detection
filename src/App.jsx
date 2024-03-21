import { useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import "./App.css";
import { drawHand } from "./utilities";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runHandpose = async () => {
    // console.log("ram")
    const net = await handpose.load();
    console.log("Handpose Model is loaded");
    //Loop and detect hands
    setInterval(()=>{
      detect(net)
    },10)
  };

  const detect = async (net) => {
    //Check data is available
    if (
      typeof webcamRef !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get video properties
      const video = webcamRef.current.video
      const videoWidth = webcamRef.current.video.videoWidth
      const videoHeight = webcamRef.current.video.videoHeight

      // Set video height and width
      webcamRef.current.video.width = videoWidth
      webcamRef.current.video.height = videoHeight

      // Set canva height and width
      canvasRef.current.width = videoWidth
      canvasRef.current.height = videoHeight

      //Make detection
      const hand = await net.estimateHands(video)

      //Draw Mesh
      const ctx = canvasRef.current.getContext('2d')
      drawHand(hand,ctx)
    }
  };

  runHandpose();
  return (
    <div className="App">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            width: 640,
            height: 480,
            transform: "scaleX(-1)"
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            width: 640,
            height: 480,
            transform: "scaleX(-1)"
          }}
        />
    </div>
  );
}

export default App;
