<template>
  <AppLogo />
  <div class="container">
    <router-view/>
  </div>
</template>

<style>
</style>
<script>
import AppLogo from "./components/AppLogo"
export default {
  components: {AppLogo}
}
</script>
