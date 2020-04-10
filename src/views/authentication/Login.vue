<template>
  <div class="login">
    <p v-if="isLoading">
      Loading... 
    </p>
    
    <form @submit.prevent="submit">
      <p v-if="errors.length">
        <ul>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </p>
      <div class="form-example">
        <label for="email">Adresse email : </label>
        <input type="text" name="email" id="email" required v-model="email">
      </div>
      <div class="form-example">
        <label for="password">Mot de passe : </label>
        <input type="password" name="password" id="password" required v-model="password">
      </div>
      <div class="form-example">
        <input type="submit" value="Connexion">
      </div>
    </form>
  </div>
</template>
<script>
  import { mapActions, mapState } from 'vuex'

  export default {
    data () {
      return {
        errors: [],
        email: '',
        password: '',
        isLoading: false,
      }
    },

    computed: {
      ...mapState('@gaston/users', {
        user: 'user'
      }),
    },

    methods: {
      ...mapActions('@gaston/users', {
        authenticateUser: 'authenticate'
      }),

      verifyEmail () {
        this.errors = [];
        if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.email))) {
          this.errors.push('L\'email n\'est pas valide');
          return false
        } else {
          return true
        }
      },

      submit () {
        const isValid = this.verifyEmail()

        if (isValid) {
          this.login()
        }
      },

      async login () {
        this.isLoading = true

        try {
          const data = await this.authenticateUser({
            email: this.email, 
            password: this.password,
          })
          console.log('Connecté', data)

          this.$router.push({ name: 'Home' })

        } catch (error) {
          console.log('Impossible de te connecter', error)
        }

        this.isLoading = false
      }
    },

    created () {
      if (this.user) {
        this.$router.push({ name: 'Home' })
      }
    }
  }
</script>