# Virtual Volume Control

Control system master volume touchlessly using hand gestures and computer vision.

## How it Works
1. Identifies hand landmarks in the camera feed using MediaPipe.
2. Extracts Landmark 4 (Thumb tip) and Landmark 8 (Index tip).
3. Computes the geometric Euclidean distance between them.
4. Linearly maps the pixel distance to system decibels and 0-100% volume HUD levels.

## Run
```bash
pip install -r requirements.txt
python volume_control.py
```
