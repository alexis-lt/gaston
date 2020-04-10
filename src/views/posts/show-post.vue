<template>
    <div class="card" v-if="post">
      <div v-if="showView">
        <h1>{{ post.title }}</h1>
        <i v-if="user.id === post.user_id" @click="showEdit" class="uil uil-edit"></i>
        <i v-if="user.id === post.user_id" @click="deletePost" class="uil uil-trash"></i>

        <p>Description : {{ post.description }}</p>

        <p>Adresse : {{ post.address_label }}</p>
      </div>
      <div v-if="editView">
        <edit-post :post="post" @postupdated="hideEdit"></edit-post>
        <button @click="hideEdit">Annuler</button>
      </div>
    </div>
</template>

<script>
  import EditPost from '@/views/posts/edit-post'
  import { mapGetters, mapActions, mapState } from 'vuex'

  export default {
    data () {
      return {
        editView: false,
        showView: true,
      }
    },

    computed: {
      ...mapGetters('@gaston/post', {
        getLocalPost: 'get',
      }),

      ...mapState('@gaston/users', {
        user: 'user',
      }),

      currentId () {
        return this.$route.query.id
      },

      post () {
        return this.getLocalPost(this.currentId)
      }
    },

    methods: {
      ...mapActions('@gaston/post', {
        getPost: 'get',
        removePost: 'remove',
      }),

      async deletePost () {
            await this.removePost({ id: this.currentId })
            this.$router.push({ name: 'Home' })
      },

      hideEdit () {
        this.editView = false
        this.showView = true
      },

      showEdit () {
        this.editView = true
        this.showView = false
      },

    },

    async created () {
      if (!this.post) {
        console.log('load post')
        await this.getPost({ id: this.currentId })
      }
    },

    components: {
      EditPost,
    },
    
  }
</script>
