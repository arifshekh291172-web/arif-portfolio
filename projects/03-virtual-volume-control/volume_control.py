"""
Virtual Volume Control
Author: Arif Shekh (AI/ML & Computer Vision Developer)
Technology Stack: Python, OpenCV, MediaPipe, NumPy, PyAutoGUI / pycaw

Features:
- Real-time 21-point hand tracking with MediaPipe
- Calculates Euclidean distance between thumb tip (id 4) and index finger tip (id 8)
- Dynamic interpolation to audio decibels and 0-100% scale
- Visual HUD volume bar and numeric percentage display on live video feed
"""

import cv2
import mediapipe as mp
import numpy as np
import math
import sys

# Attempt Windows audio control import
try:
    from ctypes import cast, POINTER
    from comtypes import CLSCTX_ALL
    from pycaw.pycaw import AudioUtilities, IAudioEndpointVolume
    devices = AudioUtilities.GetSpeakers()
    interface = devices.Activate(IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
    volume = cast(interface, POINTER(IAudioEndpointVolume))
    vol_range = volume.GetVolumeRange()
    min_vol, max_vol = vol_range[0], vol_range[1]
    HAS_PYCAW = True
except Exception:
    HAS_PYCAW = False
    min_vol, max_vol = -65.0, 0.0

def run_volume_control():
    cap = cv2.VideoCapture(0)
    cam_width, cam_height = 640, 480
    cap.set(3, cam_width)
    cap.set(4, cam_height)

    mp_hands = mp.solutions.hands
    hands = mp_hands.Hands(
        max_num_hands=1,
        min_detection_confidence=0.7,
        min_tracking_confidence=0.7
    )
    mp_draw = mp.solutions.drawing_utils

    vol_bar = 400
    vol_per = 0

    print("========================================")
    print(" Virtual Volume Control Initialized")
    print(" Distance between Thumb & Index controls Volume")
    print(f" Native Hardware Audio Interface: {'ENABLED (pycaw)' if HAS_PYCAW else 'SIMULATION / HUD MODE'}")
    print(" Press 'q' or ESC in window to exit.")
    print("========================================")

    while True:
        success, img = cap.read()
        if not success:
            break

        img = cv2.flip(img, 1)
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        results = hands.process(img_rgb)

        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                mp_draw.draw_landmarks(img, hand_landmarks, mp_hands.HAND_CONNECTIONS)
                lm_list = []
                for id, lm in enumerate(hand_landmarks.landmark):
                    h, w, c = img.shape
                    cx, cy = int(lm.x * w), int(lm.y * h)
                    lm_list.append([id, cx, cy])

                if len(lm_list) >= 9:
                    x1, y1 = lm_list[4][1], lm_list[4][2] # Thumb
                    x2, y2 = lm_list[8][1], lm_list[8][2] # Index
                    cx, cy = (x1 + x2) // 2, (y1 + y2) // 2

                    cv2.circle(img, (x1, y1), 10, (255, 0, 255), cv2.FILLED)
                    cv2.circle(img, (x2, y2), 10, (255, 0, 255), cv2.FILLED)
                    cv2.line(img, (x1, y1), (x2, y2), (255, 0, 255), 3)
                    cv2.circle(img, (cx, cy), 8, (255, 0, 0), cv2.FILLED)

                    length = math.hypot(x2 - x1, y2 - y1)

                    # Hand range: 25 - 200 pixels
                    vol = np.interp(length, [25, 200], [min_vol, max_vol])
                    vol_bar = np.interp(length, [25, 200], [400, 150])
                    vol_per = np.interp(length, [25, 200], [0, 100])

                    if HAS_PYCAW:
                        try:
                            volume.SetMasterVolumeLevel(vol, None)
                        except Exception:
                            pass

                    # Feedback when at minimum distance
                    if length < 30:
                        cv2.circle(img, (cx, cy), 10, (0, 255, 0), cv2.FILLED)

        # Draw Futuristic Visual Volume HUD
        cv2.rectangle(img, (50, 150), (85, 400), (0, 240, 255), 2)
        cv2.rectangle(img, (50, int(vol_bar)), (85, 400), (0, 240, 255), cv2.FILLED)
        cv2.putText(img, f'{int(vol_per)} %', (45, 435), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 240, 255), 2)

        # Header Titles
        cv2.putText(img, "Arif Shekh | Virtual Volume Control", (20, 35),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 240, 255), 2)
        cv2.putText(img, "Pinch/Spread Thumb & Index | 'q' to Quit", (20, 460),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (200, 200, 200), 1)

        cv2.imshow("Virtual Volume Control", img)
        key = cv2.waitKey(1)
        if key == ord('q') or key == 27:
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    run_volume_control()
