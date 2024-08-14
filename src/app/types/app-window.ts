import WindowNostr from "./window-nostr";

interface AppWindow extends Window {
  nostr?: WindowNostr;
}

export default AppWindow;
