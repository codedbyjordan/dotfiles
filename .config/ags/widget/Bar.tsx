import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { bind, GLib, Variable } from "astal";
import Hyprland from "gi://AstalHyprland";
import Wp from "gi://AstalWp";

const time = Variable<string>("").poll(
  1000,
  () => GLib.DateTime.new_now_local().format("%I:%M %p - %d/%m/%Y")!
);

const cpuUsage = Variable<string>("").poll(5000, [
  "bash",
  "-c",
  "mpstat 1 1 | awk '/Average:/ {print 100-$NF\"%\"}'",
]);

function Workspaces() {
  const hypr = Hyprland.get_default();

  const focusedWorkspace = bind(hypr, "focusedWorkspace");

  return (
    <box className="Workspaces">
      {bind(hypr, "workspaces").as((wss) =>
        wss
          .filter((ws) => !(ws.id >= -99 && ws.id <= -2)) // filter out special workspaces
          .sort((a, b) => a.id - b.id)
          .map((ws) => (
            <button
              className={focusedWorkspace.as((fws) =>
                fws === ws ? "active-workspace" : ""
              )}
              onClicked={() => ws.focus()}
            >
              {ws.id}
            </button>
          ))
      )}
    </box>
  );
}

function SessionButton() {
  return (
    <button
      className="power-button"
      onClick={() => {
        App.toggle_window("session-menu");
      }}
    >
      
    </button>
  );
}

function Volume() {
  const defaultSpeaker = Wp.get_default()!.audio.defaultSpeaker;

  const volume = bind(defaultSpeaker, "volume");

  return (
    <box spacing={12}>
      <label label={volume.as((v) => `${Math.round(v * 100)}%`)} />
      <label label="" className="icon" />
      <slider
        className="volume-slider"
        widthRequest={100}
        min={0}
        max={100}
        value={volume.as((v) => {
          return Math.round(v * 100);
        })}
        onValueChanged={(slider) => {
          const value = slider.get_value();
          defaultSpeaker?.set_volume(parseFloat((value / 100).toFixed(2)));
        }}
      />
    </box>
  );
}

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;
  return (
    <window
      className="Bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={App}
      heightRequest={24}
    >
      <centerbox className="container">
        <box>
          <Workspaces />
        </box>
        <label
          label={bind(Hyprland.get_default(), "focusedClient").as(
            (fc) => fc.title
          )}
          lines={1}
          widthChars={50}
        />
        <box className="right-box" hexpand halign={Gtk.Align.END}>
          <Volume />
          <label label={cpuUsage().as((cu) => `CPU: ${cu}`)} />
          <label label={time()} />
          <SessionButton />
        </box>
      </centerbox>
    </window>
  );
}
