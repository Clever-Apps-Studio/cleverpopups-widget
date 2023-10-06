<script>
  import { onMount } from "svelte";
  import PillPopup from "./widgets/PillPopup.svelte";
  import VerticalPopup from "./widgets/VerticalPopup.svelte";
  import HorizontalPopup from "./widgets/HorizontalPopup.svelte";
  import Normal from "./widgets/templates/Normal.svelte";
  import NormalRounded from "./widgets/templates/NormalRounded.svelte";
  import Christmas from "./widgets/templates/Christmas.svelte";

  // @ts-ignore
  let settings = window?.cleverpopups_widget_settings;
  // @ts-ignore
  let currentWidget = window?.cleverpopups_current_widget;

  $: currentSettings = settings ? settings?.[currentWidget] : null;
  $: template = currentSettings?.template;
  $: layout = currentSettings?.layout;

  // Create a getter and setter for the variable
  Object.defineProperty(window, "cleverpopups_current_widget", {
    get: function () {
      return this._cleverpopups_current_widget;
    },
    set: function (value) {
      this._cleverpopups_current_widget = value;
      currentWidget = value;
    },
  });
  // Create a getter and setter for the variable
  Object.defineProperty(window, "cleverpopups_widget_settings", {
    get: function () {
      return this._cleverpopups_widget_settings;
    },
    set: function (value) {
      this._cleverpopups_widget_settings = value;
      settings = value;
    },
  });

  if (
    // @ts-ignore
    !window.cleverpopups_widget_settings ||
    // @ts-ignore
    !window.cleverpopups_current_widget
  ) {
    // @ts-ignore
    window.cleverpopups_current_widget = currentWidget;
    // @ts-ignore
    window.cleverpopups_widget_settings = settings;
  }
</script>

<main>
  {#if template?.isActive}
    {#if template?.template === "normal"}
      <Normal settings={currentSettings} isDarkMode={template.isDarkMode} />
    {:else if template?.template === "normalRounded"}
      <NormalRounded
        settings={currentSettings}
        isDarkMode={template.isDarkMode}
      />
    {:else if template?.template === "christmas"}
      <Christmas settings={currentSettings} />
    {/if}
  {:else if layout === "pill"}
    <PillPopup settings={currentSettings} />
  {:else if layout === "vertical"}
    <VerticalPopup settings={currentSettings} />
  {:else if layout === "horizontal"}
    <HorizontalPopup settings={currentSettings} />
  {/if}
</main>
