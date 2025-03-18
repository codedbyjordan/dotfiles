#!/bin/bash
generate_workspace_buttons() {
    local active_id="$1"
    local output="(box :class \"workspaces\" :orientation \"h\" :spacing 10 :halign \"center\""
    
    local workspace_ids=$(hyprctl -j workspaces | jq -r '.[].id' | sort -n)
    
    for id in $workspace_ids; do
        # Determine if this workspace is active
        local class=""
        [[ "$id" == "$active_id" ]] && class="active-workspace"
        
        # Add the button with appropriate class
        output+=" (button :class \"$class\" :onclick \"hyprctl dispatch workspace $id\" \"$id\")"
    done
    
    output+=")"
    echo "$output"
}

workspaces() {
    local event="$1"
    
    # Check if the event starts with "workspacev2"
    if [[ "$event" == "workspacev2>>"* ]]; then
        # Extract the data part after the >>
        local data="${event#workspacev2>>}"
        local workspace_id="${data%%,*}"
        
        generate_workspace_buttons "$workspace_id"
        exec 1>&1
    fi
}

# Output the initial workspace configuration
initial_active_id=$(hyprctl -j monitors | jq -r '.[0].activeWorkspace.id')
generate_workspace_buttons "$initial_active_id"

# Listen for events
socat -u "UNIX-CONNECT:$XDG_RUNTIME_DIR/hypr/$HYPRLAND_INSTANCE_SIGNATURE/.socket2.sock" - | while read -r line; do 
    workspaces "$line"
done
