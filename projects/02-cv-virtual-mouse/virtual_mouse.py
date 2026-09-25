"""
Computer Vision Virtual Mouse
Author: Arif Shekh (AI/ML & Computer Vision Developer)
Technology Stack: Python, OpenCV, MediaPipe, PyAutoGUI, NumPy

How it works:
1. Captures live camera feed using OpenCV.
2. Uses MediaPipe Hands to localize 21 3D landmarks in real time.
3. Maps index fingertip (Landmark 8) to screen resolution with exponential smoothing.
4. Detects click gestures when thumb tip (Landmark 4) pinches index tip (Landmark 8).
5. Dispatches native operating system mouse events via PyAutoGUI.
"""

import cv2
import mediapipe as mp
import pyautogui
import numpy as np
import math
import time

def run_virtual_mouse():
    # PyAutoGUI settings
    pyautogui.FAILSAFE = False
    screen_width, screen_height = pyautogui.size()

    # Camera setup
    cap = cv2.VideoCapture(0)
    cam_width, cam_height = 640, 480
    cap.set(3, cam_width)
    cap.set(4, cam_height)

    # MediaPipe Hands initialization
    mp_hands = mp.solutions.hands
    hands = mp_hands.Hands(
        max_num_hands=1,
        min_detection_confidence=0.7,
        min_tracking_confidence=0.7
    )
    mp_draw = mp.solutions.drawing_utils

    # Smoothing variables
    smoothening = 5
    prev_x, prev_y = 0, 0
    curr_x, curr_y = 0, 0
    frame_reduction = 100  # Frame boundary margin
    last_click_time = 0
    click_cooldown = 0.3

    print("========================================")
    print(" Computer Vision Virtual Mouse Initialized")
    print(" Move Index Finger: Cursor Navigation")
    print(" Pinch Index & Thumb: Left Click")
    print(" Press 'q' or ESC in window to exit.")
    print("========================================")

    while True:
        success, img = cap.read()
        if not success:
            print("Webcam frame not detected. Exiting.")
            break

        # Flip horizontally for natural mirror feel
        img = cv2.flip(img, 1)
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        results = hands.process(img_rgb)

        # Draw boundary box for mapping
        cv2.rectangle(img, (frame_reduction, frame_reduction),
                      (cam_width - frame_reduction, cam_height - frame_reduction),
                      (0, 240, 255), 2)

        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                mp_draw.draw_landmarks(img, hand_landmarks, mp_hands.HAND_CONNECTIONS)
                lm_list = []
                for id, lm in enumerate(hand_landmarks.landmark):
                    h, w, c = img.shape
                    cx, cy = int(lm.x * w), int(lm.y * h)
                    lm_list.append([id, cx, cy])

                if len(lm_list) >= 9:
                    # Index fingertip: id 8
                    x1, y1 = lm_list[8][1], lm_list[8][2]
                    # Thumb tip: id 4
                    x2, y2 = lm_list[4][1], lm_list[4][2]

                    # Map coordinates to screen size with boundary constraints
                    x3 = np.interp(x1, (frame_reduction, cam_width - frame_reduction), (0, screen_width))
                    y3 = np.interp(y1, (frame_reduction, cam_height - frame_reduction), (0, screen_height))

                    # Exponential smoothing
                    curr_x = prev_x + (x3 - prev_x) / smoothening
                    curr_y = prev_y + (y3 - prev_y) / smoothening

                    # Move cursor
                    pyautogui.moveTo(curr_x, curr_y)
                    prev_x, prev_y = curr_x, curr_y

                    # Draw index pointer tracking circle
                    cv2.circle(img, (x1, y1), 10, (255, 0, 255), cv2.FILLED)

                    # Compute distance between thumb tip and index tip for click
                    distance = math.hypot(x2 - x1, y2 - y1)
                    if distance < 35:
                        cv2.circle(img, (x1, y1), 14, (0, 255, 0), cv2.FILLED)
                        curr_time = time.time()
                        if curr_time - last_click_time > click_cooldown:
                            pyautogui.click()
                            last_click_time = curr_time
                            cv2.putText(img, "CLICK!", (x1 - 25, y1 - 25),
                                        cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)

        # HUD Overlay
        cv2.putText(img, "Arif Shekh | CV Virtual Mouse", (20, 35),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 240, 255), 2)
        cv2.putText(img, "Pinch Index & Thumb to Click | 'q' to Quit", (20, 460),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (200, 200, 200), 1)

        cv2.imshow("Computer Vision Virtual Mouse", img)
        key = cv2.waitKey(1)
        if key == ord('q') or key == 27:
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    run_virtual_mouse()
