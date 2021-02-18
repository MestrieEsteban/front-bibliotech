<template>
        <b-row id="center">
          <b-col style="text-align: center">
            <gmap-map
              :center="center"
              :zoom="7"
              style="width: 100%; height: 300px">
              <gmap-marker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                :clickable="true"
                :draggable="true"
                @click="center=m.position"
              ></gmap-marker>
            </gmap-map>
          </b-col>
        </b-row>
</template>

<script>
import * as VueGoogleMaps from '~/node_modules/vue2-google-maps/src/main'
import Vue from 'vue'

Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyD6jhVV7Z0XYuOkUYHe6vLADfVq4t_ErZM',
    }
  });

export default {
    data() {
    return {
      center: {lat: 10.0, lng: 10.0},
        markers: [{
          position: {lat: 10.0, lng: 10.0}
        }, {
          position: {lat: 11.0, lng: 11.0}
        }]
    }
  },
    
}
</script>
<style scoped>

</style>