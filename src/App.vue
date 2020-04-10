<template>
  <div id="app">
    <div id="nav">
      <router-link  v-if="user" to="/">| Accueil |</router-link>
      <router-link  v-if="user" to="/post-list">| Liste des annonces |</router-link>
      <router-link  v-if="user" to="/create-post">| Ajouter une annonce |</router-link>
      <router-link  v-if="!user" to="/create-user">| Inscription |</router-link>
      <router-link  v-if="user" to="/user-profile">| Profil |</router-link>
      <router-link v-if="!user" to="/login">| Connexion |</router-link> 
      <button v-if="user" @click="logout">Déconnexion</button>
    </div>

    <router-view/>
  </div>
</template>

<style lang="scss">
  #app {
    position: relative;
    min-height: 100%;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

</style>

<script>
  import { mapActions, mapState } from 'vuex'

  export default {
    computed: {
      ...mapState('@gaston/users', {
        user: 'user'
      }),
    },

    methods: {
      ...mapActions('@gaston/users', {
        authenticate: 'authenticate'
      }),
      ...mapActions('@gaston/users', {
        logout: 'logout'
      }),

    },

    async created () {
      console.log(this.$route.name)
      if (this.$route.name !== 'Login') {
        try {
          await this.authenticate()
        } catch (error) {
          console.log('Redirection vers le login', error)
          this.$router.push({ name: 'Login' })
        }
      }
    },
  }
</script>