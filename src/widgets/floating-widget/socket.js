import io from "socket.io-client";

export const initSocket = (shopKey) => {
  const socket = io("https://hungry-donkey-83.telebit.io");

  socket.on("connect", () => {
    console.log("Socket-status", socket.connected); // true
  });

  socket.emit("join", shopKey, (error) => {
    if (error) {
      console.log("join error----");
      return;
    }

    console.log("No Join Error");
  });
};
