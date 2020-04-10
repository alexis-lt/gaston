<template>
    <div class="card">
      <h1>Créer un compte</h1>
    
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
              <label for="confirmPassword">Confirmation mot de passe : </label>
              <input type="password" name="confirmPassword" id="confirmPassword" required v-model="confirmPassword">
            </div>
            <address-list v-model="address"></address-list>
            <div class="form-example">
              <input type="submit" value="C'est parti !">
            </div>
        </form>
    </div>
</template>

<script>
  import AddressList from '@/views/mapbox/address-list'
  import Store from '../../controllers/gaston-api/index';

  export default {
    data () {
      return {
        errors: [],
        email: '',
        password: '',
        confirmPassword: '',
        address: {},
      }
    },

    methods: {

      async submit () {
        const isValid = this.verifyInputs()

        if (isValid) {
          const data = await Store.create({
            email: this.email,
            password: this.password,
            address_label: this.address.label,
            lng: this.address.coordinates[0],
            lat: this.address.coordinates[1],
          })
          console.log(data)
        }
      },

      verifyInputs () {
        this.errors = [];
        if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.email))) {
          this.errors.push('L\'email n\'est pas valide');
        }
        if (this.password !== this.confirmPassword) {
          this.errors.push('Le mot de passe n\'est pas valide');
        }
        if (this.errors.length) {
          return false
        } else {
          return true
        }
      },

    },

    components: {
      AddressList,
    } 
  }
</script>