# Computer Vision Virtual Mouse

A hand-gesture controlled virtual mouse using computer vision.

## Features
- **21-Point Hand Tracking**: Real-time hand landmark estimation using MediaPipe.
- **Cursor Motion Mapping**: Normalizes bounding camera region to native display resolution.
- **Smoothing Filter**: Exponential moving average prevents jitter.
- **Gesture Clicking**: Pinch thumb and index finger tips together to trigger native left clicks.

## Requirements & Run
```bash
pip install -r requirements.txt
python virtual_mouse.py
```
Press `q` or `ESC` in the camera preview window to quit.
