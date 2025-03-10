#!/bin/bash

# Function to clean up when the script is terminated
cleanup() {
    echo "Cleaning up..."
    eww close-all
    exit 0
}

# Set up the trap for SIGINT (Ctrl+C) and SIGTERM
trap cleanup SIGINT SIGTERM

# Make sure daemon is running
eww daemon

# Initial opening of the bar
eww open statusbar

YUCK_FILE="$HOME/.config/eww/eww.yuck"  # Update this path to your specific yuck file
SCSS_FILE="$HOME/.config/eww/eww.scss"  # Update this path to your specific scss file

echo "Watching for changes to eww config files (Press Ctrl+C to exit)"
while true; do
    inotifywait -q -e modify "$YUCK_FILE" "$SCSS_FILE"
    eww close-all
    sleep 0.5
    eww open statusbar
done
