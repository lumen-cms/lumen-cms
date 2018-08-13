<template>
  <div class="preloader">
    <div class="spinner"/>
  </div>
</template>
<script>
  export default {
    name: 'LcSpinner'
  }
</script>
<style lang="styl">
  .preloader {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: none;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    z-index: 9999;
    background-color: white;
  }

  .spinner {
    width: 40px;
    height: 40px;
    background-color: #333;
    border-radius: 100%;
    -webkit-animation: sk-scaleout 1.0s infinite ease-in-out;
    animation: sk-scaleout 1.0s infinite ease-in-out;
  }

  .wf-loading .preloader {
    display: flex
  }

  .wf-inactive .preloader {
    display: none !important;
  }

  .wf-active .preloader {
    display: none !important;
  }

  @-webkit-keyframes sk-scaleout {
    0% {
      -webkit-transform: scale(0)
    }
    100% {
      -webkit-transform: scale(1.0);
      opacity: 0;
    }
  }

  @keyframes sk-scaleout {
    0% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    100% {
      -webkit-transform: scale(1.0);
      transform: scale(1.0);
      opacity: 0;
    }
  }

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    /* IE10+ CSS styles go here */
    .preloader {
      display: none !important;
    }
  }
</style>
