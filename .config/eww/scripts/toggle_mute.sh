pactl set-sink-mute @DEFAULT_SINK@ toggle

if [ "$(eww get is_muted)" = "true" ]; then
  eww update is_muted=false
else
  eww update is_muted=true
fi
