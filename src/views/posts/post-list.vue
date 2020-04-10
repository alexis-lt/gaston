<template>
    <div class="card">
      <ul>
        <li v-for="post in posts" :key="post.id">
          <router-link :to="{ name: 'show-post', query: { id: post.id } }">{{ post.title }}</router-link>
        </li>
      </ul>
    </div>
</template>

<script>
  import { mapGetters,mapState } from 'vuex'

  export default {
    
    computed: {
      ...mapGetters('@gaston/post', {
        findLocalPosts: 'find',
      }),

      ...mapGetters('@gaston/bounds', {
        getQuery: 'getQuery'
      }),

      ...mapState('@gaston/bounds', {
        bounds: 'bounds'
      }),

      posts () {
        if (this.bounds.sw && this.bounds.ne) {
        return this.findLocalPosts({ query: this.getQuery })
        } else {
          return {}
        }
      },
    },
  }
</script>