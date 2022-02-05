<template>
  <router-view />
</template>

<style lang="scss">
@font-face {
  font-family: 'Titillium Web';
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  unicode-range: U+000-5FF;
  src: local('Titillium Web'),
    url('/fonts/TitilliumWeb-Regular.ttf') format('truetype');
}

@font-face {
  font-family: 'Titillium Web';
  font-weight: 700;
  font-style: normal;
  font-display: auto;
  unicode-range: U+000-5FF;
  src: local('Titillium Web'),
    url('/fonts/TitilliumWeb-Bold.ttf') format('truetype');
}

@import '~normalize.css';
*,
*:before,
*:after {
  box-sizing: border-box;
}

:root {
  font-size: 62.5%; /* (62.5/100) * 16px = 10px */
  --font-size: 2rem;
  --line-height: 1.5;
}

html,
body {
  height: 100%;
  min-height: 100%;
}

body {
  font-family: 'Titillium Web', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol';
  font-size: var(--font-size);
  line-height: var(--line-height);
  text-align: center;
  color: var(--font-color);
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;

  header,
  footer {
    flex-shrink: 0;
  }

  footer {
    padding: 2rem 0;
  }

  main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1 0 auto;
  }
}

.sr-only {
  border: 0 !important;
  clip: rect(1px, 1px, 1px, 1px) !important;
  -webkit-clip-path: inset(50%) !important;
  clip-path: inset(50%) !important;
  height: 1px !important;
  margin: -1px !important;
  overflow: hidden !important;
  padding: 0 !important;
  position: absolute !important;
  width: 1px !important;
  white-space: nowrap !important;
}

.btn {
  background: #000;
  color: #fff;
  padding: 0.5em 1em;
  border-radius: 1.5em;
  text-decoration: none;
  display: inline-block;
  &.brn--disabled {
    opacity: 0.5;
    pointer-events: none;
  }
  &:hover,
  &:focus,
  &:active {
    box-shadow: 0 0 0 0.4rem rgba(0, 0, 0, 0.2);
  }
}
</style>
