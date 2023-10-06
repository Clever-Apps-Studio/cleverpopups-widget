<script>
  import { createEventDispatcher } from "svelte";

  export let value;
  export let placeholder = "placeholder";
  export let error = "";

  const dispatch = createEventDispatcher();

  const handleChange = () => {
    dispatch("change", value);
  };
</script>

<main>
  <div class="wrapper" class:error>
    <input type="text" bind:value {placeholder} on:change={handleChange} />
  </div>
  <small class="error">{error}</small>
</main>

<style>
  .wrapper {
    display: flex;
    border: 1px solid #ccc;
    width: 100%;
    background: #fff;
    border-radius: 5px;
    height: 40px;
    padding: 0 5px;
  }

  .error {
    border-color: red;
    color: red;
  }

  .wrapper input {
    color: #333;
    flex: 1;
    max-width: 100%;
    background: transparent;
    border: none;
  }

  .wrapper input:focus-visible {
    border: none;
    outline: none;
  }
</style>
