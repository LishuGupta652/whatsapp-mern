import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { useEffect } from "react";
import Pusher from "pusher-js";

function App() {
  useEffect(() => {}, []);
  useEffect(() => {
    const pusher = new Pusher("2af785b0a0350dc54c48", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (data) {
      alert(JSON.stringify(data));
    });
  }, []);
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
