# Football Scorekeeper App

## Overview

This Football Scorekeeper app allows users to track and manage a live football match, including team details, match events, and score updates. The app provides an interactive interface to manage teams, add events like goals and fouls, and display dynamic updates as the match progresses.

## Features

### 1. **Team Management**
   - **Team Logos:** Users can upload custom logos for each team.
   - **Team Names:** Ability to modify the team names via a text input when in edit mode.

### 2. **Match Timer**
   - **Live Match Timer:** A timer counts up to 90 minutes, representing a typical football match duration. The timer starts with a click and can be reset at any time.
   - **Time Format:** The timer is displayed in the "MM:SS" format.

### 3. **Match Events**
   - **Add Events:** Users can add events to the match, including goals, yellow cards, and red cards.
   - **Player and Event Input:** The app allows users to input the player’s name and the time of the event.
   - **Event List:** Each event (goal, yellow/red card) is displayed in the match summary for both teams.

### 4. **Scoreboard**
   - **Live Score Updates:** The app displays live scores for both teams. The score updates automatically as events are added.
   - **Dynamic Background Gradient:** The background of the app dynamically adjusts based on the team logos to create a visually appealing gradient effect.

### 5. **User Interface**
   - **Editable Team Information:** When in edit mode, users can change team names and logos.
   - **Interactive Event Input:** A popup form lets users input player names and event types, such as goals and fouls.
   - **Responsive Design:** The app is designed to work well on different screen sizes.

## How to Use

1. **Team Setup:** Upload team logos and set team names for both teams.
2. **Start Timer:** Click the "Start" button to begin the match timer.
3. **Add Events:** During the match, click the "Add" button to input events for either team. Select the team, enter the player name and event type, and click "Add" to record the event.
4. **View Events:** Events like goals and yellow/red cards are displayed under the respective teams with the player name and timestamp.
5. **Reset Timer:** Click the "Reset" button to reset the match timer to 0:00.

## Dependencies

- React
- FontAwesome for icons
- Fast Average Color (for dynamic background gradient)
