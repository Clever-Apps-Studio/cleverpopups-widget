<script>
  import { createEventDispatcher } from "svelte";

  export let text = "Button text";

  const dispatch = createEventDispatcher();

  const handleClick = () => {
    dispatch("click");
  };
</script>

<button on:click={handleClick}>
  {text}
</button>

<style>
  button {
    width: 100%;
    height: 40px;
    background-color: #3aa83a;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
  }
</style>
