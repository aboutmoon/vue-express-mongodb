<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Narbar'
export default {
  name: 'App',
  components: {
    'Navbar': Navbar
  }
}
</script>

<style>
</style>
