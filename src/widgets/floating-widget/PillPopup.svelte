<script>
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { orders } from "../stores/orders";
  import { current } from "../queue/current";

  import { formatTimeAgo } from "../../utils/methods";
  import { useTracker } from "../../hooks/useTracker";

  import Check from "../../assets/Check.svelte";
  import { widgetTypes } from "../../utils/constants";

  export let initComp;
  export let settings;
  export let shopKey;

  let title = "";
  let body = "";
  let hideTime = false;

  let date = null;
  let checkColor = "#008060";

  const { trackEvent } = useTracker(shopKey);

  $: currentOrder = $orders.orders[$orders.current];
  $: currentProduct = $current;
  $: position = settings?.position || "bl";

  $: if (settings?.title) {
    title = settings.title;
    title = title.replace("{{city}}", currentOrder?.city);
    title = title.replace("{{country}}", currentOrder?.country);

    if (settings.anonymousActive) {
      title = title.replace("{{first_name}}", settings.anonymousFallback);
    } else {
      title = title.replace("{{first_name}}", currentOrder?.customerFirstName);
    }

    body = settings.body;
    body = body.replace("{{product_title}}", currentProduct?.name);

    // hide or show time
    const orderDate = new Date(currentOrder?.createdAt);
    const currentDate = new Date(Date.now());
    const diff =
      Math.abs(orderDate.getTime() - currentDate.getTime()) / 3600000;

    if (diff < settings?.hideTimeAfter) {
      hideTime = false;
      date = new Date(currentOrder?.createdAt);
    } else {
      hideTime = true;
    }

    // set check mark color
    checkColor = settings?.iconColor || "#008060";
  }

  $: styles = settings
    ? `
    border-width: ${settings.borderWidth}px;
    border-color: ${settings.borderColor};
    border-radius: ${settings.borderRadius}px;
    background-color: ${settings.backgroundColor};
    color: ${settings.textColor};
  `
    : "";

  $: if (currentProduct) {
    trackEvent("view", widgetTypes[1]);
  }

  // @ts-ignore
  console.log("clever object", window?.clever_popups_keys);
</script>

<main>
  {#if currentProduct}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      class="container"
      class:bl={position === "bl"}
      class:br={position === "br"}
      class:tr={position === "tr"}
      class:tl={position === "tl"}
      style={styles}
      in:fly={{ y: 200, duration: 2000 }}
      out:fade
      on:mouseenter={() => {
        initComp.pause();
      }}
      on:mouseleave={() => {
        initComp.resume();
      }}
      on:click={() => {
        window.open(currentProduct.link, "_self");
        trackEvent("click", widgetTypes[1]);
      }}
    >
      <div class="image">
        <img src={currentProduct?.image?.src} alt="product" />
      </div>
      <div class="ca-cp-right">
        <div class="ca-cp-title">
          {title}
        </div>
        <p class="ca-cp-body">{body}</p>
        <div class="ca-cp-footer">
          <div>
            <div class="ca-cp-badge">
              <div class="ca-cp-icon"><Check color={checkColor} /></div>
              <span>Verified</span>
            </div>
            <div class="ca-cp-brand">by CleverPopups</div>
          </div>

          {#if !hideTime}
            <div class="ca-cp-time">{formatTimeAgo(date)}</div>
          {/if}
        </div>
      </div>
    </div>
  {/if}
</main>

<style lang="scss">
  .bl {
    bottom: 10px;
    left: 10px;
  }

  .br {
    bottom: 10px;
    right: 10px;
  }

  .tr {
    top: 10px;
    right: 10px;
  }

  .tl {
    top: 10px;
    left: 10px;
  }

  .container {
    position: fixed;
    display: flex;
    min-width: $widget-width;
    border-radius: $border-radius;
    padding: $widget-padding;
    z-index: 1000000;
    cursor: pointer;
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
        font-size: 13px;

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

      .ca-cp-brand {
        font-size: 10px;
        margin-top: -5px;
      }

      .ca-cp-time {
        font-size: 13px;
      }
    }
  }
</style>
