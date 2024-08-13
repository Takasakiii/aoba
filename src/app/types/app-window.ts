import NostrWindow from "./nostr-window";

interface AppWindow extends Window {
  nostr?: NostrWindow;
}

export default AppWindow;
