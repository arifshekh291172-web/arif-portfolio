# Rock Paper Scissors — AI Vision

A real-time computer vision game that recognizes hand gestures through a camera.

## Features
- **Gesture Classification**: Uses finger extension angles (Rock = 0 fingers, Paper = 4 fingers, Scissors = Index & Middle).
- **Match Engine**: 3-second round countdown timer, randomized AI bot counter-move, and instant referee rules.
- **Scoreboard HUD**: Tracks player vs bot scores dynamically on top of the webcam video feed.

## Run
```bash
pip install -r requirements.txt
python rps_game.py
```
- Press `SPACE` to start a round.
- Press `r` to reset scores.
- Press `q` or `ESC` to quit.
