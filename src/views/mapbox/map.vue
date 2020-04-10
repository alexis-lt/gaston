<template>
  <div class="map-view">
    <slot name="title"></slot>
    <!-- :center recieve simples coordinates -->
    <!-- :center="center" -->
    <MglMap
      :accessToken="accessToken"
      :mapStyle.sync="mapStyle"
      :center="currentCenter"
      @load="onMapLoad"
      @moveend="onMoveEnd"
    >
      <!-- :marker recieve an object, and use object.lat and object.lng -->
      <slot></slot>
    </MglMap>
  </div>
</template>

<script>

import Mapbox from "mapbox-gl";
import { MglMap } from "vue-mapbox";
import { mapActions } from 'vuex'

export default {
  components: {
    MglMap,
  },

  props: {
    center: { type: Array, default: () => [-2.084423, 47.650854] },
  },

  data() {
    return {
      accessToken: "pk.eyJ1Ijoiem9pZDM1NiIsImEiOiJjazhlaWl3bjEwNmI1M2ZwM2ZzMG9wZ2NrIn0.BGIQe_F2Tj6_id9c7nDn-w",
      mapStyle: "mapbox://styles/zoid356/ck8ek35vt2ab41hnvhnbc9h62",
      mapbox: Mapbox,
      actions: null,
      currentCenter: this.center,
    }
  },

  methods: {

    ...mapActions('@gaston/bounds', {
      updateBounds: 'update'
    }),

    async onMapLoad (event) {
      // Here we cathing 'load' map event
      this.actions = event.component.actions

      await this.actions.flyTo({
        center: this.center,
        zoom: 12,
        speed: 1.5
      })
    },

    onMoveEnd (event) {    

      const bounds = event.map.getBounds() 

      this.$emit('moveend', this.updateBounds(bounds))
      
    },
  }
};

</script>

<style lang="scss">
    .map-view {
        position: absolute;
        height: 100%;
        width: 100%;
    }
</style>