import logo from './logo.svg';
import './App.css';
import React, { useEffect, useReducer, useRef, useState } from 'react';

import Webcam from 'react-webcam';
//import {OpenCvProvider, useOpenCv} from 'opencv-react';
//import {FilesetResolver, PoseLandmarker} from '@mediapipe/tasks-vision';
import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';
import {drawKeypoints, drawSkeleton} from './utilities';
function App(){
const WebCamRef = useRef(null);
const canvasRef = useRef(null);

const [buttonC, setButtonC] = useState(false); 
const CAM = (
  <>
  <Webcam
   mirrored = {true}
  ref = {WebCamRef}
  style = {{
    position:'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    right: 0,
    left: 0,
    textAlign:'center',
    zIndex: 9,
    width: 700,
    height: 500,
  }}

  />
  <canvas
  ref = {canvasRef}
  style = {{
    position:"absolute",
    marginRight:'auto',
    marginLeft:'auto',
    right: 0,
    left: 0,
    textAlign:'center',
    zIndex: 9,
    width: 700,
    height: 500 
  }}
  />
  </>
)
  ////tensorflow 
 const poseNetM = async() =>{
  const net = await posenet.load({
    inputResolution: {width: 700, height: 500},
    scale: .5
  })
  setInterval(() =>{
    detect(net); 
  }, 100)
 }

 const detect = async(net) =>{
  if(typeof WebCamRef.current !== "undefined" &&
  WebCamRef.current !== null &&
  WebCamRef.current.video.readyState === 4){
    const video = WebCamRef.current.video;
    const videoW = WebCamRef.current.video.videoWidth;
    const videoH = WebCamRef.current.video.videoHeight;

    WebCamRef.current.video.width  = videoW;
    WebCamRef.current.video.height = videoH;

    const pose = await net.estimateSinglePose(video); 
    console.log(pose); 
    drawOnCanvas(pose, video, videoW, videoH, canvasRef); 
  }
}

 //draw with tensorflow utilities
 const drawOnCanvas = (pose, video, videoW, videoH, canv) => {
  const ctx = canv.current.getContext('2d');
  canv.current.width = videoW;
  canv.current.height = videoH;
  drawKeypoints(pose['keypoints'], .5, ctx);
  drawSkeleton(pose['keypoints'], .5, ctx); 
 }

 const togglePoseEstimation = () => {
  try{
     poseNetM(); 

  }catch{
  
  }
 }
 const [opacity, setOpacity] = useState(1); 
 function fade(){
  let int = setInterval(() =>{
    setOpacity(opacity -1);
    if(opacity == 0){
      
    }
  }, 100);

 }

 const Button = () =>{
  return(
    <div
    onClick={() => setButtonC(!buttonC)}
    style = {{
      position: 'relative',
      height: '2.5rem',
      width: '5rem',
      textAlign:'center',
      alignItems:'center',
      justifyContent:"center",
      backgroundColor: 'orange',
      color: 'white',
      borderRadius: 10,
      cursor: 'pointer',
      transitionDuration: '2s',
      marginInline: '5rem',
      userSelect: 'none'
    }}>
      <h2>{buttonC? 'off' : 'on'}</h2>
      </div>
  )
 }
 
  return (
    <div className="App">
 
      <h1 t = 'FitTech' >FitTech</h1>
 
    
      {CAM}
      <Button />
      <h1 style = {{position:'absolute', margin:"auto", bottom: 100, marginInline: '5rem'}}><label>Status: </label>{buttonC? 'off' : 'on'}</h1>
  
    </div>
  );
}

export default App;
