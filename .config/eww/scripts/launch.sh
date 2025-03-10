#!/bin/bash

# Add logging
exec > /tmp/eww_launch.log 2>&1
echo "Starting eww launch script at $(date)"

# Kill any existing eww instances
pkill eww || echo "No eww processes to kill"

# Wait for all eww processes to terminate
while pgrep eww >/dev/null; do
    echo "Waiting for eww processes to end..."
    sleep 0.1
done

# Check environment
echo "DISPLAY=$DISPLAY"
echo "XAUTHORITY=$XAUTHORITY"
echo "PATH=$PATH"
echo "USER=$USER"

# Start eww daemon
echo "Starting eww daemon..."
/opt/eww daemon

# Open the statusbar
echo "Opening statusbar..."
/opt/eww open-many statusbar notifications

echo "Script completed at $(date)"
