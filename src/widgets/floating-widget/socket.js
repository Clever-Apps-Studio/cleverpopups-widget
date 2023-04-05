import io from "socket.io-client";
import { orders } from "./stores/orders";

export const initSocket = (shopKey, initComp) => {
  const socket = io("https://hungry-donkey-83.telebit.io");

  socket.on("connect", () => {
    console.log("Socket-status", socket.connected); // true
  });

  socket.on("newOrder", async (details) => {
    console.log("details-webhook-socket", details);
    await orders.update((store) => {
      let list = store.orders;
      let size = store.size;
      if (size === 0) {
        list = [details];
        return {
          ...store,
          orders: list,
          size: 1,
        };
      }

      list = [...list, details];
      size = size + 1;
      return {
        ...store,
        orders: list,
        size,
      };
    });
    initComp.pause();
    initComp.initQue();
  });

  socket.on("message", (message) => {
    console.log("message -", message);
  });

  socket.emit("join", shopKey, (error) => {
    if (error) {
      console.log("join error----");
      return;
    }

    console.log("No Join Error");
  });
};
