<script>
  import { onMount } from "svelte";
  import { settings } from "./stores/settings";
  import { initSocket } from "./socket";
  import { orders } from "./stores/orders";
  import QueueInit from "./queue/QueueInit.svelte";
  import FloatingWidget from "./floating-widget/FloatingWidget.svelte";
  import useTypeTransform from "../hooks/useTypeTransformer";

  // @ts-ignore
  const shopKey = window?.clever_popups_keys?.shopId;

  console.log("key", shopKey);

  // @ts-ignore
  const ivKey = window?.clever_popups_keys?.ivKey;
  const domain = window.location?.hostname;

  $: widgetSettings = $settings?.widgetSettings;
  $: ordersSettings = widgetSettings?.orders;
  $: addToCartSettings = widgetSettings?.addToCart;

  $: ordersActive = ordersSettings?.isActive;
  $: addCartActive = addToCartSettings?.isActive;

  let initComp;
  let loading = false;
  const origin = window.location.origin;
  const widgetSettingsUrl = `${origin}/apps/api/widget-settings`;
  const ordersUrl = `${origin}/apps/api/orders?key=${shopKey}&domain=${domain}&ivKey=${ivKey}`;

  const fetchOrders = async () => {
    loading = true;
    const ordersRes = await fetch(ordersUrl);
    const ordersData = await ordersRes.json();

    if (ordersData.success) {
      const transformedData = useTypeTransform(ordersData.orders, "order");
      orders.set({
        current: 0,
        orders: transformedData,
        size: transformedData.length,
      });
    }
    loading = false;
  };

  const fetchSettings = async () => {
    try {
      loading = true;
      const res = await fetch(
        `${widgetSettingsUrl}?key=${shopKey}&domain=${domain}&ivKey=${ivKey}`
      );

      const settingsData = await res.json();
      console.log("res--", settingsData);

      if (settingsData.success) {
        settings.set({
          widgetSettings: settingsData.data,
        });
      }
      loading = false;
    } catch (error) {
      loading = false;
    }
  };

  $: if (widgetSettings?.orders?.isActive) {
    fetchOrders();
  }

  onMount(async () => {
    initSocket(shopKey, initComp);

    await fetchSettings();
  });
</script>

<main>
  <QueueInit bind:this={initComp} />

  <FloatingWidget {initComp} {shopKey} />
</main>
