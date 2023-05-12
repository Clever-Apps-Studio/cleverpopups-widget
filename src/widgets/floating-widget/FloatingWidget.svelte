<script>
  import { settings } from "../stores/settings";
  import { current as currentProduct } from "../queue/current";
  import { orders } from "../stores/orders";

  import PillPopup from "./PillPopup.svelte";
  import VerticalPopup from "./VerticalPopup.svelte";
  import HorizontalPopup from "./HorizontalPopup.svelte";
  import Test from "./Test.svelte";

  // templates
  import Normal from "./templates/Normal.svelte";
  import NormalRounded from "./templates/NormalRounded.svelte";
  import Christmas from "./templates/Christmas.svelte";

  export let initComp;
  export let shopKey;

  let widgetLayout = "pill";
  let currentSettings = null;
  let template = null;

  $: currentProductType = $orders.orders?.[$orders.current]?.type;
  $: widgetSettings = $settings?.widgetSettings;
  $: ordersSettings = widgetSettings?.orders;
  $: addToCartSettings = widgetSettings?.addToCart;

  $: if ($currentProduct) {
    console.log("current product type*****", currentProductType);
    switch (currentProductType) {
      case "order":
        widgetLayout = ordersSettings.layout;
        currentSettings = ordersSettings;
        template = ordersSettings.template;
        break;
      case "add-to-cart":
        widgetLayout = addToCartSettings.layout;
        currentSettings = addToCartSettings;
        template = ordersSettings.template;
        break;
      default:
        widgetLayout = "pill";
        currentSettings = ordersSettings;
        template = ordersSettings.template;
    }
  }
</script>

<main>
  <!-- <PillPopup {initComp} settings={currentSettings} /> -->

  {#if template?.isActive}
    {#if template?.template === "normal"}
      <Normal
        {initComp}
        settings={currentSettings}
        isDarkMode={template.isDarkMode}
      />
    {:else if template?.template === "normalRounded"}
      <NormalRounded
        {initComp}
        settings={currentSettings}
        isDarkMode={template.isDarkMode}
      />
    {:else if template?.template === "christmas"}
      <Christmas {initComp} settings={currentSettings} />
    {/if}
  {:else if widgetLayout === "pill"}
    <PillPopup {initComp} settings={currentSettings} {shopKey} />
  {:else if widgetLayout === "vertical"}
    <VerticalPopup {initComp} settings={currentSettings} />
  {:else if widgetLayout === "horizontal"}
    <HorizontalPopup {initComp} settings={currentSettings} />
  {/if}
</main>

<style>
</style>
