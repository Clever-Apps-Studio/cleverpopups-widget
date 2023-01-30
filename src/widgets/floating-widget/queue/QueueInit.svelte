<script>
  import { onDestroy, onMount } from "svelte";
  import { queue } from "./queue";
  import { products } from "./products";
  import { orders } from "../stores/orders";
  import { current } from "./current";

  let interval;
  let currentInterval;

  const generateDelay = (min = 60000000, max = 180000000) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const initQue = () => {
    clearTimeout(interval);
    clearTimeout(currentInterval);

    const orderSize = $orders.size;
    const currentOrder = $orders.current;

    current.update(() => {
      return $queue[0];
    });

    currentInterval = setTimeout(() => {
      current.set(null);
    }, 7000);

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
      } else {
        orders.update((value) => {
          value.current = 0;
          value.orders = [];
          value.size = 0;

          return value;
        });
        return;
      }
    }
    const delay = generateDelay(10000, 15000);
    console.log("delay---", delay);

    interval = setTimeout(initQue, delay);
  };

  export const pause = () => {
    console.log("pause triggered");
    clearTimeout(interval);
    clearTimeout(currentInterval);
  };

  export const resume = () => {
    console.log("mouseout---");
    initQue();
  };

  $: if ($products.length) {
    queue.update(() => {
      return $products;
    });
  }

  $: if ($orders.orders) {
    // setTimeout(initQue2, 10000);
    console.log("change");
  }

  onMount(() => {
    interval = setTimeout(initQue, 10000);
  });

  onDestroy(() => {
    clearTimeout(interval);
    clearTimeout(currentInterval);
  });
</script>
