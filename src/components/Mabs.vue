<template>
  <div class="p-4">
    <GMapMap :center="center" :zoom="12" map-type-id="terrain" style="width: 100%; height: 400px">
      <GMapMarker :key="marker.id" v-for="marker in markers" :position="marker.position" />
    </GMapMap>
  </div>
</template>

<script >
export default {
  name: 'App',
  props:['places'],
  data() {
    return {
      center: { lat: 13.755273, lng: 100.493211 },
      markers: [
        /* {
          id: 'dfsldjl3r',
          position: {
            lat: 13.755273, lng: 100.493211
          },
        } */
      ],
      restaurant:null
    }
  },
  created() {
    this.restaurant = this.places.map(place => {
      /* var LatLon = place.LatLon.split(','); */
      return {
        id: place.No,
        /* position: {
          lat: LatLon[0],
          lng: LatLon[1]
        } */
      }
    })
    console.log(this.restaurant)
    
    }
}
</script>
<style scoped>
.root{
  background-color: #f5f5f5;
  border-radius: 40px;
}
</style> 