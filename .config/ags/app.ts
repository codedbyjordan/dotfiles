import { App } from "astal/gtk3";
import style from "./style.scss";
import Bar from "./widget/Bar";
import SessionMenu from "./widget/SessionMenu";

App.start({
  css: style,
  main() {
    const sessionMenu = SessionMenu();
    sessionMenu.hide();

    App.get_monitors().map(Bar);
  },
});
