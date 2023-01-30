<script>
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { orders } from "./stores/orders";
  import { current } from "./queue/current";

  import checkIcon from "../../assets/check.svg";
  import { promisify } from "../../utils/methods";
  import { sampleOrder } from "../../utils/constants";
  import QueueInit from "./queue/QueueInit.svelte";
  import { initSocket } from "./socket";

  // @ts-ignore
  const shopKey = window?.clever_popups_keys?.shopId;
  console.log("key", shopKey);

  // @ts-ignore
  const ivKey = window?.clever_popups_keys?.ivKey;
  const domain = window.location?.hostname;

  initSocket(shopKey);

  let initComp;

  $: currentOrder = $orders.orders[$orders.current];
  $: currentProduct = $current;

  // @ts-ignore
  console.log("clever object", window?.clever_popups_keys);
  const widgetSettingsUrl = `apps/widgets/widget-settings`;
  const ordersUrl = `apps/widgets/orders?key=${shopKey}&domain=${domain}&ivKey=${ivKey}`;

  onMount(async () => {
    const res = await fetch(
      `${widgetSettingsUrl}?key=${shopKey}&domain=${domain}&ivKey=${ivKey}`
    );
    const data = await res.json();
    console.log("res--", data);
    console.log("next");

    const ordersRes = await fetch(ordersUrl);
    const ordersData = await ordersRes.json();

    if (ordersData.success) {
      orders.set({
        current: 0,
        orders: ordersData.orders,
        size: ordersData.orders.length,
      });
    }
    console.log("orders-->", ordersData);
  });
</script>

<main>
  <QueueInit bind:this={initComp} />
  {#if currentProduct}
    <div
      class="container"
      in:fly={{ y: 200, duration: 2000 }}
      out:fade
      on:mouseenter={() => {
        initComp.pause();
      }}
      on:mouseleave={() => {
        initComp.resume();
      }}
    >
      <div class="image">
        <img src={currentProduct?.image?.src} alt="product" />
      </div>
      <div class="ca-cp-right">
        <div class="ca-cp-title">
          Someone in {currentOrder.city}, {currentOrder.country}
        </div>
        <p class="ca-cp-body">purchased {currentProduct.name}</p>
        <div class="ca-cp-footer">
          <div class="ca-cp-badge">
            <div class="ca-cp-icon"><img src={checkIcon} alt="check" /></div>
            Verified by CleverPopups
          </div>
          <div class="ca-cp-time">1hour ago</div>
        </div>
      </div>
    </div>
  {/if}
</main>

<style lang="scss">
  .container {
    position: fixed;
    display: flex;
    bottom: 10px;
    left: 10px;
    min-width: $widget-width;
    border-radius: $border-radius;
    padding: $widget-padding;
    z-index: 1000000;
    @include basic-light-widget;

    .image {
      position: relative;
      width: 100px;
      /* height: 40px; */
      background-color: $light-gray;
      margin-right: 10px;
      border-radius: $border-radius;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }
    .ca-cp-right {
      width: 100%;
    }

    .ca-cp-title {
      font-size: 16px;
      font-weight: bold;
    }

    .ca-cp-body {
      margin: 0;
      font-size: 14px;
    }

    .ca-cp-footer {
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 5px;

      .ca-cp-badge {
        display: flex;
        align-items: center;

        .ca-cp-icon {
          display: flex;
          align-items: center;
          margin-right: 3px;

          img {
            width: 24px;
            height: 24px;
          }
        }
      }

      .ca-cp-time {
        color: $text-muted;
      }
    }
  }
</style>
