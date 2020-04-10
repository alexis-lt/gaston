<template>
    <div class="card">
        <h1>Editer l'annonce</h1>

        <form @submit.prevent="submit">
          <div class="form-example">
            <label for="title">Titre de l'annonce : </label>
            <input type="text" name="title" id="title" required v-model="title">
          </div>
          <div class="form-example">
              <label for="description">Description : </label>
              <input type="textarea" name="description" id="description" required v-model="description">
          </div>
          <div class="form-example">
            <select required v-model="selectedCategory">
              <option disabled value="">catégorie</option>
              <option v-for="category in categories" :key="category.id" :value="category">
                  {{ category.title }}
              </option>
            </select>
          </div>
        <p>Adresse actuelle : {{ address.label }}</p>
          <address-list v-model="address"></address-list>
          <div class="form-example">
            <input type="submit" value="Modifier">
          </div>
        </form>
    </div>
</template>

<script>
  import AddressList from '@/views/mapbox/address-list'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    props: {
        post: { type: Object, required: true },
    },
    data () {
      return {
        title: '',
        description: '',
        address: {},
        categories: [],
        selectedCategory: {
            id: '',
        },
      }
    },

    computed: {
      ...mapGetters('@gaston/category', {
        getCategory: 'get'
      }),
    },

    methods: {
      ...mapActions('@gaston/post', {
        editPost: 'patch',
      }),

      ...mapActions('@gaston/category', {
        findCategories: 'find'
      }),

      async getValues () {
        this.title = this.post.title
        this.description = this.post.description
        this.selectedCategory = this.getCategory(this.post.category_id)
        this.address = {label: this.post.address_label, coordinates: [this.post.lng, this.post.lat]}
      },

      submit () {
        this.editPost({
            id: this.post.id,
            data: {
                title: this.title,
                description: this.description,
                category_id: this.selectedCategory.id,
                address_label: this.address.label,
                lng: this.address.coordinates[0],
                lat: this.address.coordinates[1],
            }
        })
        this.$emit('postupdated')
      },

      async getCategories () {
        const categories = await this.findCategories()
        this.categories.push(...categories.data)
      },

    },

    async created () {
        await this.getCategories()
        await this.getValues()
    },

    components: {
      AddressList,
    } 
  }
</script>
