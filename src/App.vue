<template>
  <div>
    <!-- กล่องค้นหา -->
    <SearchBar ref="searchBar" @to-search="toSearch" />
    <div class="detail mt-4">
      <div class="row p-3">
        <div class="col-md-6">
          <ul class="list-group">
            <h5 class="text-white">คำที่ค้น: <u>{{ keyword }}</u>&nbsp; &nbsp;&nbsp; &nbsp; จำนวนที่เจอ: <u>{{ places.length}} </u> ร้าน</h5>
            <!-- list ข้อมูล -->
            <TransitionGroup name="list" tag="ul" v-if="places.length > 0">
              <Item v-for="(place, index) in places" :key="index" :placeName="place" @click="movePosition(place)" />
            </TransitionGroup>
            <h3 v-else class="text-center text-white">ไม่เจอข้อมูล</h3>
          </ul>
        </div>
        <div class="col-md-6">
          <!-- แผนที่ -->
          <div class="p-4 root">
            <GMapMap :center="places[0] ? places[0].position : center" :zoom="12" map-type-id="terrain"
              style="width: 100%; height: 700px">
              <GMapMarker :key="marker.No" v-for="marker in places" :position="marker.position"
                :options="marker.options">
                <GMapInfoWindow>
                  <div>{{marker.Name_L}}
                    <MyComponent />
                  </div>
                </GMapInfoWindow>
                </GMapMarker>
            </GMapMap>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* import Mabs from './components/Mabs.vue' */
import SearchBar from './components/Search.vue'
import Item from './components/Item.vue'
export default {
  name: 'App',
  data() {
    return {
      center: { lat: 13.755273, lng: 100.493211 },
      markers: [
        {
          id: 'dfsldjl3r',
          position: {
            lat: 13.755273, lng: 100.493211
          },
        }
      ],
      keyword: '',
      places: []
    }
  },
  components: {
    /*     Mabs, */
    SearchBar,
    Item
  },
  mounted() {
    //ดึงข้อมูลตั้งต้นจาก server
    this.keyword = 'Bang sue'
    this.toSearch(this.keyword)
  },
  methods: {
    //ฟังก์ชั่นค้นหาข้อมูล โดยส่งคำที่ต้องการค้นหาไปยัง server
    toSearch(value) {
      this.keyword = value
      this.places = []
      try {
        fetch("http://127.0.0.1:8000/api/getLocation?keyword=" + value)
          .then(response => response.json())
          .then(data => {
            this.places = data.data
            //จัดแต่งข้อมูลก่อนแสดงผล
            this.places = this.places.map(place => {
              //แบ่ง latgitude และ longitude ออกจากกัน
              var LatLon = place.LatLon.split(',');
              return {
                No: place.No,
                Name_L: place.Name_L,
                Name_E: place.Name_E,
                AdminLevel4_L: place.AdminLevel4_L,
                AdminLevel3_L: place.AdminLevel3_L,
                AdminLevel1_L: place.AdminLevel1_L,
                position: {
                  lat: parseFloat(LatLon[0]),
                  lng: parseFloat(LatLon[1]),
                },
                options: {
                  /* label: , */
                  title: place.Name_L
                }
              }
            })
            console.log(this.places)
          });
      } catch (e) {
        console.log(e)
      }
    }
    ,
    movePosition(place) {
      this.center = place.position
      console.log(place.position)
      console.log(this.center == place.position)
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Itim&display=swap');
* {
  font-family: 'Itim', cursive;
}
.root {
  background-color: #f5f5f5;
  border-radius: 40px;
}
#app {
  margin: 0px;
  padding: 0px;
  width: 100vw;
  height: auto;
  align-items: center;
  background-color: #130f40;
  font-family: 'Lato' !important;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>