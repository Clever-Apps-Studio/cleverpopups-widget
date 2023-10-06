<script>
  import { formatTimeAgo } from "../../../utils/methods";

  import Check from "../../../assets/Check.svelte";

  export let settings;
  export let isDarkMode;
  let title = "";
  let body = "";
  let hideTime = false;
  let productImg =
    "https://www.ubuy.com.gh/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNTFKYnNIU2t0a0wuX0FDX1NMMTUwMF8uanBn.jpg";

  let date = null;
  let checkColor = "#008060";

  $: position = settings?.position || "bl";

  $: if (settings?.title) {
    title = settings.title;
    title = title.replace("{{city}}", "California");
    title = title.replace("{{country}}", "United States");

    if (settings.anonymousActive) {
      title = title.replace("{{first_name}}", settings.anonymousFallback);
    } else {
      title = title.replace("{{first_name}}", "Ben");
    }

    body = settings.body;
    body = body.replace("{{product_title}}", "Bose headset");

    // hide or show time
    const orderDate = new Date();
    orderDate.setDate(orderDate.getDate() - 1);
    const currentDate = new Date(Date.now());
    const diff =
      Math.abs(orderDate.getTime() - currentDate.getTime()) / 3600000;

    if (diff < settings?.hideTimeAfter) {
      hideTime = false;
      date = orderDate;
    } else {
      hideTime = true;
    }

    // set check mark color
    checkColor = settings?.iconColor || "#008060";
  }

  $: styles = settings
    ? `
    border-width: 1px;
    border-color: #eee;
    border-radius: 0px;
    background-color: ${isDarkMode ? "#202123" : "white"};
    color: ${isDarkMode ? "white" : "#1f2125"}
  `
    : "";
</script>

<main>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="container"
    class:bl={position === "bl"}
    class:br={position === "br"}
    class:tr={position === "tr"}
    class:tl={position === "tl"}
    style={styles}
  >
    <div class="image">
      <img src={productImg} alt="product" />
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
</main>

<style lang="scss">
  .bl {
    top: 10px;
    right: 10px;
  }

  .br {
    top: 10px;
    left: 10px;
  }

  .tr {
    bottom: 10px;
    left: 10px;
  }

  .tl {
    bottom: 10px;
    right: 10px;
  }

  .container {
    position: relative;
    display: flex;
    min-width: $widget-width;
    border-radius: $border-radius;
    padding: $widget-padding;
    z-index: 500;
    cursor: pointer;
    overflow: hidden;
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
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .ca-cp-title {
      font-size: 16px;
      font-weight: bold;
    }

    .ca-cp-body {
      margin: 0;
      font-size: 14px;
      margin-top: auto;
    }

    .ca-cp-footer {
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: auto;

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
        color: $text-muted;
        font-size: 13px;
        align-self: flex-end;
      }
    }
  }
</style>
