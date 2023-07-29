<script>
  import { onDestroy, onMount } from "svelte";
  import { queue } from "./queue";
  import { products } from "./products";
  import { orders } from "../stores/orders";
  import { current } from "./current";

  let interval;
  let currentInterval;
  let startOver = false;

  const generateDelay = (min = 60000000, max = 180000000) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  export const pause = () => {
    console.log("pause triggered");
    clearTimeout(interval);
    clearTimeout(currentInterval);
  };

  export const initQue = () => {
    console.log("init----*");
    clearTimeout(interval);
    clearTimeout(currentInterval);

    const orderSize = $orders.size;
    const currentOrder = $orders.current;

    current.update(() => {
      return $queue[0];
    });

    currentInterval = setTimeout(() => {
      current.set(null);
    }, 8000);

    if ($queue.length) {
      queue.update((value) => {
        return value.slice(1);
      });
    } else {
      if (currentOrder < orderSize - 1) {
        orders.update((value) => {
          value.current = value.current + 1;

          return value;
        });
        startOver = false;
      } else {
        orders.update((value) => {
          value.current = 0;
          value.orders = [];
          value.size = 0;

          return value;
        });
        startOver = true;
        pause();
        return;
      }
    }
    const delay = generateDelay(10000, 20000);
    console.log("delay%", delay);
    interval = setTimeout(initQue, delay);
  };

  export const resume = () => {
    console.log("resume---mouseout");
    initQue();
  };

  $: if ($products.length) {
    queue.update(() => {
      return $products;
    });
  }

  $: if ($orders.orders) {
    // setTimeout(initQue2, 10000);
    console.log("orders change 4", $orders);
    // if (!$queue.length && startOver) {
    //   console.log("resume------start-again---again", startOver);
    //   initQue();
    // }
  }

  onMount(() => {
    interval = setTimeout(initQue, 10000);
  });

  onDestroy(() => {
    clearTimeout(interval);
    clearTimeout(currentInterval);
  });
</script>
