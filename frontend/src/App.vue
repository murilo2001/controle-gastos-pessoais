<template>
  <router-view />
</template>

<script>

export default {
  name: 'App',
  
};
</script>

<style>
@font-face {
    font-family: 'Gotham Rounded';
    src: url('./fonts/GothamRounded-Bold.woff2') format('woff2'),
         url('./fonts/GothamRounded-Bold.woff') format('woff');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
}
@font-face {
    font-family: 'Gotham Rounded';
    src: url('./fonts/GothamRounded-Medium.woff2') format('woff2'),
         url('./fonts/GothamRounded-Medium.woff') format('woff');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
}
@font-face {
    font-family: 'Gotham Rounded';
    src: url('./fonts/GothamRounded-Light.woff2') format('woff2'),
         url('./fonts/GothamRounded-Light.woff') format('woff');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
}
</style>