<template>
    <div class="card" v-if="user">
        <h1>Profil utilisateur</h1>

        <h2>{{ user.email }}</h2>

        <p>Adresse actuelle : {{ user.address_label }} <button @click="editAddress = true">Modifier</button></p>

        <form v-if="editAddress" @submit.prevent="submit">
          <address-list v-model="address"></address-list>
          <div class="form-example">
            <input type="submit" value="Mettre à jour mon profil">
          </div>
          <button @click="editAddress = false">Annuler</button>
        </form>
        <button @click="deleteUser">Supprimer mon compte</button>
    </div>
</template>

<script>
  import AddressList from '@/views/mapbox/address-list'
  import { mapActions, mapState } from 'vuex'

  export default {
    data () {
      return {
        editAddress: false,
        address: {},
      }
    },

    computed: {
      ...mapState('@gaston/users', {
        user: 'user'
      }),
    },

    methods: {

      ...mapActions('@gaston/users', {
        editUser: 'patch',
        removeUser: 'remove'
      }),

      submit () {
        this.editUser({
            id: this.user.id,
            data: {
                address_label: this.address.label,
                lng: this.address.coordinates[0],
                lat: this.address.coordinates[1],
            }
        })
        location.reload()
      },

      async deleteUser () {
            await this.removeUser({ id: this.user.id })
            this.$router.push({ name: 'Login' })
      },

    },

    components: {
      AddressList,
    }, 

  }
</script>
