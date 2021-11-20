import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import axios from "./axios";

function App() {
  const [messages, setmessages] = useState([]);
  useEffect(() => {
    axios.get("/api/v1/message/").then((res) => {
      console.log(res);
      setmessages([res.data]);
    });
  }, []);
  useEffect(() => {
    const pusher = new Pusher("2af785b0a0350dc54c48", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (newmessage) {
      console.log(newmessage);
      setmessages([...messages, newmessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
