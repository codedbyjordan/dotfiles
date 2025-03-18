#!/usr/bin/env nu

let socket_path = $"($env.XDG_RUNTIME_DIR)/hypr/($env.HYPRLAND_INSTANCE_SIGNATURE)/.socket2.sock"

socat -u $"UNIX-CONNECT:($socket_path)" - | lines | each { |line|
    workspaces $line
}
