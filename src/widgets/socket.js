import io from "socket.io-client";
import { orders } from "./stores/orders";
import useTypeTransform from "../hooks/useTypeTransformer";

export const initSocket = (shopKey, initComp) => {
  // const socket = io("https://hungry-donkey-83.telebit.io");
  const socket = io("https://cleverpopups-socket-715f2b2590f9.herokuapp.com/");

  socket.on("connect", () => {
    console.log("Socket-status", socket.connected); // true
  });

  socket.on("newOrder", async (details) => {
    console.log("details-webhook-socket", details);
    const transformedDetails = useTypeTransform(details, "order");
    await orders.update((store) => {
      let list = store.orders;
      let size = store.size;
      if (size === 0) {
        list = [transformedDetails];
        return {
          ...store,
          orders: list,
          size: 1,
        };
      }

      list = [...list, transformedDetails];
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
      console.log("join error----", error);
      console.log("shop key-----", shopKey);
      return;
    }

    console.log("No Join Error");
  });
};
