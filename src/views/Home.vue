<template>
  <div class="home">
    <!-- ROUTER-VIEW -->
    <router-view/>

    <!-- MAP -->
    <div class="main-map">
      <main-map v-if="user" :center="[user.lng, user.lat]" @moveend="fetchPosts">
        <MglMarker :coordinates="[user.lng, user.lat]" color="red"/>
        <MglMarker v-for="marker in posts" :key="marker.id" :coordinates="[marker.lng, marker.lat]" color="blue">
          <MglPopup>
              <router-link :to="{ name: 'show-post', query: { id: marker.id } }">{{ marker.title }}</router-link>
          </MglPopup>
        </MglMarker>
      </main-map>
    </div>
  </div>
</template>

<script>
  import MainMap from '@/views/mapbox/map'
  import { MglMarker, MglPopup } from "vue-mapbox";
  import { mapActions, mapState, mapGetters } from 'vuex'

  export default {

    computed: {
      ...mapState('@gaston/users', {
        user: 'user'
      }),

      ...mapState('@gaston/bounds', {
        bounds: 'bounds'
      }),

      ...mapGetters('@gaston/post', {
        findLocalPosts: 'find'
      }),

      ...mapGetters('@gaston/bounds', {
        getQuery: 'getQuery'
      }),


      posts () {
        if (this.bounds.sw && this.bounds.ne) {
        return this.findLocalPosts({ query: this.getQuery })
        } else {
          return {}
        }
      },
    },

    methods: {
      ...mapActions('@gaston/post', {
        findPosts: 'find'
      }),

      async fetchPosts () {
        await this.findPosts({ 
          query: this.getQuery
        }) 
      },
    },

    components: {
      MainMap,
      MglMarker,
      MglPopup,
    }, 
  }

</script>

<style lang="scss">
  .main-map {
    position: absolute;
    height: 100%;
    width: 100%;
  }
</style>
