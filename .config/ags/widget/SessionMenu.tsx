import { App, Astal } from "astal/gtk3";
import Hyprland from "gi://AstalHyprland";

export default function SessionMenu() {
  const { TOP, RIGHT } = Astal.WindowAnchor;

  return (
    <window
      className="SessionMenu"
      name="session-menu"
      application={App}
      exclusivity={Astal.Exclusivity.IGNORE}
      anchor={TOP | RIGHT}
      marginTop={36}
      widthRequest={100}
    >
      <box className="container">
        <button onClick={() => Hyprland.get_default().dispatch("exit", "")}>
          Logout
        </button>
      </box>
    </window>
  );
}
