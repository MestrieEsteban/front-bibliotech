<template>
  <div>
    <b-container>
      <div class="containers">
        <div class="container_text">
          <span>
            <div id="text-color1">Good</div>
            <div id="text-color2">{{ hour_time }}</div>
            <!-- <div id="text-color3" v-if="$store.state.user !== ''">
              {{ $store.state.user.user.nickname }}
            </div>-->
          </span>
        </div>
        <div class="container-image">
          <img src="@/assets/svg/reading-corner-colour_1.svg" />
        </div>
      </div>
      <Search />
      <h1 id="title">Last Books</h1>
      <vue-horizontal-list
        :items="book_user"
        :options="{ responsive: [{ size: 0 }] }"
      >
        <template #default="{ item }">
          <div
            id="book"
            :style="{ backgroundImage: 'url(' + item.cover + ')' }"
          ></div>
          <span id="desc_book">{{ item.title.substr(0, 10) }}...</span>
        </template>
      </vue-horizontal-list>
      <br />
    </b-container>
    <BottomBar />
  </div>
</template>

<script>
import VueHorizontalList from 'vue-horizontal-list'
import Search from '@/components/Search'
import BottomBar from '~/components/BottomBar'

export default {
  components: {
    Search,
    BottomBar,
    VueHorizontalList,
  },
  data() {
    return {
      id: 1,
      book_user: [],
      hour_time: '',
    }
  },
  mounted() {
    this.getBook()
    this.getDate()
  },
  methods: {
    async getBook() {
      await this.$axios
        .$get(`user/books/last/${this.id}`)
        .then((result) => {
          this.book_user = result.data.userbookslast
        })
        .catch((error) => {
          window.console.log(error)
        })
    },
    getDate() {
      const date = new Date()
      const time = `${date.getHours()}`
      if (time < 12) {
        this.hour_time = 'Morning'
      } else if (time >= 12 && time <= 17) {
        this.hour_time = 'Afternoon'
      } else if (time >= 17 && time <= 24) {
        this.hour_time = 'Evening'
      }
    },
  },
}
</script>

<style>
#book {
  border: 2px solid #34334b;
  background-color: #34334b;
  width: 100px;
  height: 170px;
  border-radius: 10px;
  background-size: cover;
}
#title {
  color: #34334b;
  text-align: Left;
  font-size: 24px;
  margin-top: 20px;
}

#desc_book {
  font-size: 12px;
}

.containers {
  display: flex;
  align-items: center;
  justify-content: center;
}

img {
  max-width: 100%;
}

.container-image {
  flex-basis: 40%;
}

.container_text {
  font-size: 20px;
  padding-left: 20px;
  margin-right: 10%;
}

#text-color1,
#text-color2 {
  color: #28d063;
  font-size: 15px;
}

#text-color3 {
  color: #34334b;
  font-size: 18px;
}
</style>
