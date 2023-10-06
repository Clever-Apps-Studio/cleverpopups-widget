<script>
  import { onDestroy } from "svelte";
  import wheelAudio from "../../assets/wheel.wav";

  export let winValue = null;
  let wheelRef;
  let audio;

  let value = Math.ceil(Math.random() * 3600);

  let audioStop1;
  let audioStop2;

  export const handleSpin = () => {
    clearTimeout(audioStop1);
    clearTimeout(audioStop2);

    audio.volume = 0.5;

    wheelRef.style.transform = `rotate(${value}deg)`;
    let spinDeg = value;

    while (spinDeg >= 360) {
      spinDeg = spinDeg - 360;
    }
    console.log("initial spin deg----->", spinDeg);
    console.log("spin deg----->", spinDeg);

    if (spinDeg >= 200) {
      audio.play();
      audioStop1 = setTimeout(() => {
        audio.currentTime = 9;
        audioStop2 = setTimeout(() => {
          audio.pause();
          audio.currentTime = 0;
        }, 3000);
      }, 2200);
    }

    if (spinDeg < 200) {
      audio.currentTime = 9;
      audio.play();
      audioStop1 = setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
      }, 5000);
    }

    if (spinDeg >= 338 && spinDeg <= 360) {
      console.log("prize won----> 100$");
      winValue = 100;
    }
    if (spinDeg >= 0 && spinDeg <= 22) {
      console.log("prize won----> 100$");
      winValue = 100;
    }

    if (spinDeg >= 337 && spinDeg < 293) {
      console.log("prize won----> 1$");
      winValue = 1;
    }
    if (spinDeg > 22 && spinDeg <= 67) {
      console.log("prize won----> 20$");
      winValue = 20;
    }

    if (spinDeg > 67 && spinDeg <= 112) {
      console.log("prize won----> 5$");
      winValue = 5;
    }

    if (spinDeg > 112 && spinDeg <= 157) {
      console.log("prize won----> 10$");
      winValue = 10;
    }

    if (spinDeg > 157 && spinDeg <= 201) {
      console.log("prize won----> 1000$");
      winValue = 1000;
    }

    if (spinDeg > 201 && spinDeg <= 246) {
      console.log("prize won----> 0$");
      winValue = 0;
    }

    if (spinDeg > 246 && spinDeg <= 291) {
      console.log("prize won----> 50$");
      winValue = 50;
    }

    if (spinDeg > 291 && spinDeg <= 336) {
      console.log("prize won----> 1$");
      winValue = 1;
    }

    value = Math.ceil(Math.random() * 3600) + value;
  };

  onDestroy(() => {
    clearTimeout(audioStop1);
    clearTimeout(audioStop2);
  });
</script>

<div class="wrapper">
  <audio
    bind:this={audio}
    id="wheel"
    src={`${wheelAudio}`}
    preload="auto"
    controls
  />
  <div class="container">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="spinBtn" />
    <div class="shadow" />
    <div bind:this={wheelRef} class="wheel">
      <div class="number" style="--i:1; --clr:#db7093;"><span>100</span></div>
      <div class="number" style="--i:2; --clr:#20b2aa;"><span>1</span></div>
      <div class="number" style="--i:3; --clr:#d63e92;"><span>50</span></div>
      <div class="number" style="--i:4; --clr:#daa520;"><span>0</span></div>
      <div class="number" style="--i:5; --clr:#ff340f;"><span>1000</span></div>
      <div class="number" style="--i:6; --clr:#ff7f50;"><span>10</span></div>
      <div class="number" style="--i:7; --clr:#3cb371;"><span>5</span></div>
      <div class="number" style="--i:8; --clr:#4169e1;"><span>20</span></div>
    </div>
  </div>
</div>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
  }
  #wheel {
    display: none;
  }
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container .spinBtn {
    position: absolute;
    width: 60px;
    height: 60px;
    background: #fff;
    border-radius: 50%;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-weight: 600;
    color: #333;
    letter-spacing: 0.1em;
    border: 4px solid rgba(0, 0, 0, 0.75);
    cursor: pointer;
    user-select: none;
    box-shadow: 3px 5px 6px 1px rgba(90, 90, 90, 0.5);
    -webkit-box-shadow: 3px 5px 6px 1px rgba(90, 90, 90, 0.5);
    -moz-box-shadow: 3px 5px 6px 1px rgba(90, 90, 90, 0.5);
  }

  .container .spinBtn::before {
    content: "";
    position: absolute;
    top: -28px;
    width: 20px;
    height: 30px;
    background: #fff;
    clip-path: polygon(50% 0%, 10% 100%, 90% 100%);
  }

  .container .wheel {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #333;
    border-radius: 50%;
    box-shadow: 0 0 0 5px #fff, 0 0 0 8px #111;
    transition: transform 5s ease-out;
  }

  .shadow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: rgba(198, 46, 46, 0.3);
    box-shadow: 0 0 0 5px #fff, 0 0 0 8px #111,
      10px 10px 15px 10px rgba(170, 170, 170, 0.5);
  }

  .container .wheel .number {
    position: absolute;
    width: 50%;
    height: 50%;
    background: var(--clr);
    transform-origin: bottom right;
    transform: rotate(calc(45deg * var(--i)));
    clip-path: polygon(0 0, 60% 0, 100% 100%, 0 60%);
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    cursor: pointer;
  }

  .container .wheel .number span {
    position: relative;
    transform: rotate(45deg);
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    /* text-shadow: 3px 5px 2px rgba(0, 0, 0, 0.15); */
  }

  .container .wheel .number span::after {
    content: "$";
    position: absolute;
    font-size: 0.75em;
    font-weight: 500;
  }
</style>
