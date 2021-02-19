<template>
        <b-row id="center">
          <b-col style="text-align: center">
            <gmap-map
              :center="center"
              :zoom="12"
              style="width: 100%; height: 300px">
              <gmap-marker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                :clickable="true"
                :draggable="false"
                @click="center=m.position"
              >
			  </gmap-marker>
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
	  libraries: 'places',
    }
  });

export default {
    data() {
    return {
      center: {lat: 48.807280, lng: 2.571398},
        markers: [{
          position: {lat: 48.799590, lng: 2.607510},
		  name:'qsd'
        }, {
          position: {lat: 48.792376, lng:2.558032}
        }, {
          position: {lat: 48.811151, lng:2.544197}
        }, {
          position: {lat: 48.810921, lng:2.570657}
        }]
    }
  },
    
}
</script>
<style scoped>

</style>