import logo from './logo.svg';
import './App.css';
import React, { useEffect, useReducer, useRef, useState, } from 'react';

import Webcam from 'react-webcam';
import {OpenCvProvider, useOpenCv} from 'opencv-react';
import {FilesetResolver, PoseLandmarker} from '@mediapipe/tasks-vision';
import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';
import {drawKeypoints, drawSkeleton} from './utilities';

import v from './h.mp4';

function App(){
const WebCamRef = useRef(null);
const canvasRef = useRef(null);

const [buttonC, setButtonC] = useState(false); 
const w = window.innerWidth/2.2
const h = window.innerHeight/1.7

const CAM = (
  <>
  <Webcam
   mirrored = {false}
  ref = {WebCamRef}
  style = {{
    position:'relative',
    right: 0,
    left: 0,
    textAlign:'center',
    zIndex: 9,
    width: w,
    height: h,
    backgroundColor:'#5D737E'
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
  togglePoseEstimation();
  
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
 

 const TUTORIAL = (
  <div>
   <h2>Video Player</h2>
    <video src={v} width="400" height="500" controls autoPlay />
  </div>
 )

 const [bc, setBC] = useState('Jab');

 const [vis, setVIS] = useState('none')
 //stylesheet:

 const styles = {
  text:{
    color: 'red'
  }
 }
  return (
    <div className="App">
 
      <h1 t = 'FitTech' className='head'>FitTech</h1>
 
    
      <div className='secondHeader'>
        <h1>Choose Class: </h1>
      <div className='pap'> 
      <button onMouseDown={()=>{
        if (vis=='none'){
          setVIS('block')
        }
        else{
          setVIS('none')
        }
      }} className='lessonName'>{bc}</button>
          <div className='te' style={{display: vis, position: 'absolute', left:0, right:0, margin:'auto'}}>
            <button onMouseDown={()=>{
              setBC('Rest')
            }} style={{position: 'relative',
            fontSize: '1rem',
            height: '2.5rem',
            width: '5rem',
            textAlign:'center',
            alignItems:'center',
            justifyContent:"center",
            backgroundColor: 'orange',
            color: 'white',
            borderRadius: 10,
            borderWidth: 0 ,
            cursor: 'pointer',
            transitionDuration: '2s',
            userSelect: 'none',
            fontWeight: 700}}>Rest</button>
            <button onMouseDown={()=>{
              setBC('Jab')
            }} style={{position: 'relative',
            fontSize: '1rem',
            height: '2.5rem',
            width: '5rem',
            textAlign:'center',
            alignItems:'center',
            justifyContent:"center",
            backgroundColor: 'maroon',
            color: 'white',
            borderRadius: 10,
            borderWidth: 0 ,
            cursor: 'pointer',
            transitionDuration: '2s',
            userSelect: 'none',
            fontWeight: 700}}>Jab</button>
            <button onMouseDown={()=>{
              setBC('Uppercut')
            }} style={{position: 'relative',
            fontSize: '1rem',
            height: '2.5rem',
            width: '5rem',
            textAlign:'center',
            alignItems:'center',
            justifyContent:"center",
            backgroundColor: 'orange',
            color: 'white',
            borderRadius: 10,
            borderWidth: 0 ,
            cursor: 'pointer',
            transitionDuration: '2s',
            userSelect: 'none',
            fontWeight: 700}}>Uppercut</button>
          </div>
        </div>
      </div>
      <Button />
      <div style={{flexDirection:'row', display:'flex', alignContent:'center', justifyContent:'center', backgroundColor:'#fff'}}>
        <div>

        <h2>Video Player</h2>
        <video src={v} width={window.innerWidth/2} height={window.innerHeight/1.7} controls autoPlay />

        {CAM}

        <div>
          <h3>Turn Your Torso</h3>
        </div>
        </div>
      </div>
  
    </div>
  );
}

export default App;
