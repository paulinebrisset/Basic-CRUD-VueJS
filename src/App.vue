<template>
  <div class="background-image">
    <div class="bodyimage">
      <img id="logo" alt="Logo" src="./assets/logo.png">
      <AllCards msg="Welcome to Your Vue.js App" />
    </div>
  </div>
</template>


<script>
import AllCards from './views/AllCards.vue'

export default {
  name: 'App',
  components: {
    AllCards
  },
}
</script>

<style>
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  list-style-type: none;
}


#app {

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#logo {
  height: 150px;
  width: 150px;
  animation: mymove 5s infinite;
  position: relative;
}

@keyframes mymove {
  0% {
    bottom: -60px;
  }

  25% {
    bottom: -25px;
  }

  50% {
    bottom: 50px;
  }

  75% {
    bottom: -30px;
  }

  100% {
    bottom: -60px;
  }
}

.background-image,
.bodyimage {
  width: 100%;
  height: 100vh;
  z-index: 1;
  position: fixed;

}

.background-image {
  background-image: url("./assets/background.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.bodyimage {
  background-color: #233a3d33;
}
</style>
