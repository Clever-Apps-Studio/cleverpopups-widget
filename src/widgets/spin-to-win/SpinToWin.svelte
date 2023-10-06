<script>
  import SpinWheel from "./SpinWheel.svelte";
  import Input from "../../components/Input.svelte";
  import Button from "../../components/Button.svelte";

  let spinWheelRef;
  let fullName = "";
  let email = "";
  let formErrors = {};
  let submitted = false;
  let step = 1;
  let winValue = null;

  const formValidations = {
    fullName: {
      type: "string",
      required: true,
      minLength: 3,
    },
    email: {
      type: "email",
      required: true,
      minLength: 3,
    },
  };

  const validate = (validations, values) => {
    const errors = {};
    const keys = Object.keys(validations);
    keys.forEach((key) => {
      if (validations[key].required && !values[key]) {
        errors[key] = "This field is required";
        return;
      }
      if (
        validations[key].minLength &&
        values[key].length < validations[key].minLength
      ) {
        errors[
          key
        ] = `This field must have at least ${validations[key].minLength} characters`;
        return;
      }

      if (validations[key].type) {
        if (validations[key].type === "email") {
          const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (!re.test(String(values[key]).toLowerCase())) {
            errors[key] = "Invalid email";
          }
          return;
        }

        if (typeof validations[key].type !== validations[key].type) {
          errors[key] = `Value should be a ${validations[key].type}`;
          return;
        }
      }
    });

    return errors;
  };

  const changeStep = () => {
    setTimeout(() => {
      step = 2;
      console.log("step----changed");
    }, 5000);
  };

  $: winValue !== undefined && winValue !== null && changeStep();

  const handleSubmit = () => {
    submitted = true;
    console.log("email: ", email);
    console.log("fullName: ", fullName);
    const errors = validate(formValidations, { fullName, email });
    console.log("errors: ", errors);
    formErrors = errors;

    if (Object.keys(errors).length === 0) {
      spinWheelRef.handleSpin();
    }
    console.log("spin---value", winValue);
  };

  const handleInputChange = () => {
    if (!submitted) return;
    const errors = validate(formValidations, { fullName, email });
    formErrors = errors;
  };
</script>

<div class="wrapper">
  <div class="form">
    <div class="left">
      <div class="wheelContainer">
        <SpinWheel bind:this={spinWheelRef} bind:winValue />
      </div>
    </div>

    <div class="right">
      <header class="header">Company name</header>
      {#if step === 1}
        <div>
          <div class="title">
            You have unlocked a promotion <br /> Give it a spin!
          </div>
          <div class="desc">
            You have a chance to win a discount for your next purchase. <span
              >Are you feeling lucky?</span
            >
          </div>
          <ul class="rules">
            <li>You can spin wheel once.</li>
            <li>If you win, coupon can be used within 10 minutes.</li>
            <li>Same email must be used when ordering to apply discount.</li>
          </ul>

          <div class="inputList">
            <div class="field">
              <Input
                bind:value={fullName}
                placeholder="Full name"
                error={formErrors.fullName ?? ""}
                on:change={handleInputChange}
              />
            </div>
            <div class="field">
              <Input
                bind:value={email}
                placeholder="Email"
                error={formErrors.email ?? ""}
                on:change={handleInputChange}
              />
            </div>
            <div class="action">
              <Button on:click={handleSubmit} text="Try Your Luck" />
            </div>
          </div>
        </div>
      {:else}
        <div>
          {#if winValue && winValue > 0}
            <div class="win-container">
              <div class="win-title">Hooray 🎉</div>
              <div class="win-desc">
                You won <span>{winValue}</span>. Discount will be applied
                automatically on your next purchase.
              </div>
              <div class="btn">
                <Button on:click={() => (step = 1)} text="OK" />
              </div>
            </div>
          {:else}
            <div class="lose-container">
              <div class="lose-title">Sorry 😔</div>
              <div class="lose-desc">
                You did not win any discount. Please try again next time
              </div>
              <div class="btn">
                <Button on:click={() => (step = 1)} text="OK" />
              </div>
            </div>
          {/if}
        </div>
      {/if}
      <footer>
        Powered by <a
          target="_blank"
          rel="noreferrer"
          href="https://cleverapps.studio/popups">CleverPopups</a
        >
      </footer>
    </div>
  </div>
</div>

<style>
  * {
    box-sizing: border-box;
  }
  .wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.2);
  }

  .form {
    position: relative;
    display: flex;
    align-items: center;
    width: 780px;
    height: 80%;
    max-height: 550px;
    min-height: 500px;
    background-color: #fff;
    border-radius: 5px;
    overflow: hidden;
    color: #333;
  }

  .left {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40%;
    height: 100%;
    background: #fff;
    overflow: hidden;
    position: relative;
  }

  .right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    flex: 1;
    padding: 40px;
    padding-left: 50px;
    padding-right: 40px;
    padding-bottom: 10px;
  }

  .right header {
    text-align: right;
    color: black;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: auto;
  }

  .right footer {
    text-align: right;
    color: 333;
    font-size: 12px;
    font-weight: 400;
    margin-top: auto;
  }

  .right footer a {
    text-decoration: underline;
    cursor: pointer;
    color: #333;
  }

  .right .title {
    margin-top: 30px;
    font-size: 18px;
    font-weight: 700;
    color: black;
  }

  .right .desc {
    margin-top: 10px;
    font-size: 14px;
    line-height: 18px;
  }

  .right .desc span {
    font-size: 14px;
    font-weight: 500;
  }

  .right .rules {
    margin-top: 16px;
    font-size: 12px;
    line-height: 20px;
  }

  .right .inputList {
    margin-top: 20px;
  }

  .right .inputList div {
    margin-bottom: 16px;
  }

  .right .inputList .field {
    width: 100%;
  }

  .right .action {
    margin-top: 25px;
  }

  .wheelContainer {
    position: absolute;
    left: -180px;
    margin-top: auto;
    margin-bottom: auto;
    width: 450px;
    height: 450px;
  }

  .win-title {
    color: black;
    font-size: 30px;
    font-weight: 600;
  }

  .win-desc {
    margin-top: 20px;
    font-size: 16px;
  }

  .win-desc span {
    font-weight: bold;
  }

  .win-container .btn {
    margin-top: 20px;
  }

  .lose-title {
    color: black;
    font-size: 30px;
    font-weight: 600;
  }

  .lose-desc {
    margin-top: 20px;
    font-size: 16px;
  }

  .lose-container .btn {
    margin-top: 20px;
  }

  :global(*) {
    box-sizing: border-box;
  }
</style>
