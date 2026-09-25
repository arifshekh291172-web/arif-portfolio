"""
Rock Paper Scissors — AI Vision
Author: Arif Shekh (AI/ML & Computer Vision Developer)
Technology Stack: Python, OpenCV, MediaPipe, NumPy

Features:
- Optical gesture classifier (Rock, Paper, Scissors)
- Analyzes fingertip elevation relative to PIP joints
- 3-second round countdown timer
- Autonomous computer bot move selector
- Live match scoreboard HUD
"""

import cv2
import mediapipe as mp
import random
import time

def classify_gesture(landmarks):
    # Tip IDs: Thumb: 4, Index: 8, Middle: 12, Ring: 16, Pinky: 20
    # PIP IDs: Index: 6, Middle: 10, Ring: 14, Pinky: 18
    fingers = []

    # 4 fingers (Index, Middle, Ring, Pinky) - check if tip is higher (lower Y coordinate) than PIP
    tip_ids = [8, 12, 16, 20]
    pip_ids = [6, 10, 14, 18]

    for tip, pip in zip(tip_ids, pip_ids):
        if landmarks[tip].y < landmarks[pip].y:
            fingers.append(1)
        else:
            fingers.append(0)

    # Classification
    total_fingers = sum(fingers)

    if total_fingers == 0:
        return "Rock"
    elif total_fingers == 4:
        return "Paper"
    elif fingers[0] == 1 and fingers[1] == 1 and fingers[2] == 0 and fingers[3] == 0:
        return "Scissors"
    else:
        return "Unknown"

def evaluate_winner(player, bot):
    if player == bot:
        return "Draw"
    if (player == "Rock" and bot == "Scissors") or \
       (player == "Paper" and bot == "Rock") or \
       (player == "Scissors" and bot == "Paper"):
        return "Player Wins!"
    return "AI Bot Wins!"

def run_rps_game():
    cap = cv2.VideoCapture(0)
    mp_hands = mp.solutions.hands
    hands = mp_hands.Hands(max_num_hands=1, min_detection_confidence=0.7)
    mp_draw = mp.solutions.drawing_utils

    player_score = 0
    bot_score = 0
    game_state = "WAITING" # WAITING, COUNTDOWN, RESULT
    start_time = 0
    bot_move = ""
    result_text = ""
    last_detected = "None"

    print("========================================")
    print(" Rock Paper Scissors — AI Vision Initialized")
    print(" Press SPACE to start a round")
    print(" Press 'r' to reset scores")
    print(" Press 'q' or ESC to quit")
    print("========================================")

    while True:
        success, img = cap.read()
        if not success:
            break

        img = cv2.flip(img, 1)
        h, w, c = img.shape
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        results = hands.process(img_rgb)

        current_gesture = "None"
        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                mp_draw.draw_landmarks(img, hand_landmarks, mp_hands.HAND_CONNECTIONS)
                current_gesture = classify_gesture(hand_landmarks.landmark)
                last_detected = current_gesture

        # State Machine
        curr_time = time.time()
        if game_state == "COUNTDOWN":
            elapsed = curr_time - start_time
            countdown = 3 - int(elapsed)
            if countdown > 0:
                cv2.putText(img, f"GET READY: {countdown}", (w // 2 - 120, h // 2),
                            cv2.FONT_HERSHEY_DUPLEX, 1.4, (0, 240, 255), 3)
            else:
                # Round complete, pick bot move
                moves = ["Rock", "Paper", "Scissors"]
                bot_move = random.choice(moves)
                if last_detected in moves:
                    result_text = evaluate_winner(last_detected, bot_move)
                    if result_text == "Player Wins!":
                        player_score += 1
                    elif result_text == "AI Bot Wins!":
                        bot_score += 1
                else:
                    result_text = "Hand gesture unclear! Try again."
                game_state = "RESULT"
                start_time = curr_time

        elif game_state == "RESULT":
            # Display results for 3 seconds
            cv2.putText(img, f"PLAYER: {last_detected}  vs  AI: {bot_move}", (w // 2 - 200, h // 2 - 20),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
            color = (0, 255, 0) if "Player" in result_text else (0, 0, 255) if "AI" in result_text else (255, 255, 0)
            cv2.putText(img, result_text, (w // 2 - 140, h // 2 + 40),
                        cv2.FONT_HERSHEY_DUPLEX, 1.1, color, 3)

            if curr_time - start_time > 3.0:
                game_state = "WAITING"

        # HUD Overlay
        cv2.rectangle(img, (10, 10), (320, 100), (11, 15, 25), cv2.FILLED)
        cv2.rectangle(img, (10, 10), (320, 100), (0, 240, 255), 2)
        cv2.putText(img, f"PLAYER: {player_score}   |   AI BOT: {bot_score}", (25, 45),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.65, (0, 240, 255), 2)
        cv2.putText(img, f"Current Pose: {current_gesture}", (25, 80),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (200, 200, 200), 2)

        if game_state == "WAITING":
            cv2.putText(img, "Press [SPACEBAR] to play round", (w // 2 - 180, h - 30),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 240, 255), 2)

        cv2.imshow("Rock Paper Scissors — AI Vision", img)
        key = cv2.waitKey(1)
        if key == 32 and game_state == "WAITING": # Spacebar
            game_state = "COUNTDOWN"
            start_time = time.time()
        elif key == ord('r'):
            player_score, bot_score = 0, 0
        elif key == ord('q') or key == 27:
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    run_rps_game()
