from flask import Flask 
import mediapipe as mp 
import requests
import cv2 

app = Flask(__name__)

@app.route("/", methods = ['GET', 'POST'])

def backend():
    mp_drawing = mp.solutions.drawing_utils 
    mp_pose = mp.solutions.pose 

    pose = mp_pose.Pose(
    min_detection_confidence = .5,
    min_tracking_confidence = .5)

        #frame = np.zeros(frame.shape, np.uint8)
   # mp_drawing.draw_landmarks(
        #frame, lm, mp_pose.POSE_CONNECTIONS) 
      
           #index will show the limb / joing cordinate 
    with cv2
    res = pose.process(rgb)
    landmarks = res.pose_landmarks.landmark

    if app.request_class().method == 'GET':
        return "Hello Universe"
    else:
        return {"backend": ["Hello", "Universe"]}


if __name__ == "__main__":
    app.run()