import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { bind, GLib, Variable } from "astal";
import Hyprland from "gi://AstalHyprland";

const time = Variable<string>("").poll(
  1000,
  () => GLib.DateTime.new_now_local().format("%I:%M %p - %d/%m/%Y")!
);

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

function Power() {
  const power = bind(Hyprland.get_default(), "powerManagement");

  return (
    <button
      className={power.as((p) => (p ? "" : "disabled"))}
      onClicked={() => power.set(!power.get())}
    >
      {power.as((p) => (p ? "🔌" : "🔋"))}
    </button>
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
      <box className="container">
        <box>
          <Workspaces />
        </box>
        <box hexpand halign={Gtk.Align.END}>
          <label label={time()} />
          <Power />
        </box>
      </box>
    </window>
  );
}
