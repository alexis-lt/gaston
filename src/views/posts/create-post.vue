<template>
    <div class="card">
      <h1>Nouvelle annonce</h1>
    
        <form @submit.prevent="submit">
            <div class="form-example">
              <label for="title">Titre de l'annonce : </label>
              <input type="text" name="title" id="title" required v-model="title">
            </div>
            <div class="form-example">
                <label for="description">Description : </label>
                <input type="text" name="description" id="description" required v-model="description">
            </div>
            <div class="form-example">
              <select required v-model="selectedCategory">
                <option disabled value="">catégorie</option>
                <option v-for="category in categories" :key="category.id" :value="category">{{ category.title }}</option>
              </select>
            </div>

            <address-list v-model="address"></address-list>

            Adresse = {{ address }} 

            <div class="form-example">
              <input type="submit" value="Ajouter">
            </div>
        </form>
    </div>
</template>

<script>
  import AddressList from '@/views/mapbox/address-list'
  import { mapActions } from 'vuex'

  export default {
    data () {
      return {
        title: '',
        description: '',
        address: {},
        categories: [],
        selectedCategory: {}
      }
    },

    methods: {
      ...mapActions('@gaston/post', {
        createPost: 'create'
      }),
      ...mapActions('@gaston/category', {
        findCategories: 'find'
      }),

      submit () {
        this.createPost({
          data: {
            title: this.title,
            description: this.description,
            category_id: this.selectedCategory.id,
            address_label: this.address.label,
            lng: this.address.coordinates[0],
            lat: this.address.coordinates[1],
          }
        })
      },

      async getCategories () {
        const categories = await this.findCategories()
        this.categories.push(...categories.data)
      }

    },

    created () {
      this.getCategories()
    },

    components: {
      AddressList,
    } 
  }
</script>