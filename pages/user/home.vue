<template>
  <div>
    <b-container>
      <div class="containers">
        <div class="container_text">
          <span>
            <div id="text-color1">Good</div>
            <div id="text-color2">{{ hour_time }}</div>
            <div v-if="$store.state.user !== ''" id="text-color3">
              {{ $store.state.user.user.nickname }}
            </div>
          </span>
        </div>
        <div class="container-image">
          <img src="@/assets/svg/reading-corner-colour_1.svg" />
        </div>
      </div>
      <Search :msg="term" @messageChanged="search($event)"></Search>
      <h1 id="title">{{ title }}</h1>
      <b-row>
        <div style="max-width: 90%; margin-left: 15px">
          <vue-horizontal-list
            :items="book_user"
            :options="{ responsive: [{ size: 0 }] }"
          >
            <template #default="{ item }">
              <a :href="`/book/infos?isbn=${item.isbn}`">
                <div
                  id="book"
                  :style="{ backgroundImage: 'url(' + item.cover + ')' }"
                ></div
              ></a>
              <span id="desc_book">{{ item.title.substr(0, 10) }}...</span>
            </template>
          </vue-horizontal-list>
        </div>
      </b-row>
      <br />
    </b-container>
    <BottomBar />
  </div>
</template>

<script>
import VueHorizontalList from 'vue-horizontal-list'
import Search from '@/components/Search'
import BottomBar from '@/components/BottomBar'
import redirect from '../../mixins/redirectLogin'

export default {
  components: {
    Search,
    BottomBar,
    VueHorizontalList,
  },
  mixins: [redirect],

  data() {
    return {
      book_user: [],
      hour_time: '',
      term: '',
      awaitingSearch: false,
      title: 'Last Books',
    }
  },
  mounted() {
    this.getBook()
    this.getDate()
  },
  methods: {
    async getBook() {
      await this.$axios
        .$get(`user/books/last/${this.$store.state.user.user.id}`, {
          headers: {
            Authorization: `Bearer ${this.$store.state.user.meta.token}`,
          },
        })
        .then((result) => {
          this.book_user = result.data.userbookslast.reverse()
        })
        .catch((error) => {
          window.console.log(error)
        })
    },
    getDate() {
      const date = new Date()
      const time = `${date.getHours()}`
      if (time < 12) {
        this.hour_time = 'Morning,'
      } else if (time >= 12 && time <= 17) {
        this.hour_time = 'Afternoon,'
      } else if (time >= 17 && time <= 24) {
        this.hour_time = 'Evening,'
      }
    },
    search(event) {
      this.term = event
      if (this.term == '') {
        this.title = 'Last Books'
		this.getBook()
      } else {
        if (!this.awaitingSearch) {
          setTimeout(async () => {
            console.log(this.term)
            this.awaitingSearch = false
            await this.$axios
              .$get(`/books/by/${this.term}`, {
                headers: {
                  Authorization: `Bearer ${this.$store.state.user.meta.token}`,
                },
              })
              .then((result) => {
                this.book_user = result.data.books
                this.title = 'Search'
              })
              .catch((error) => {
                window.console.log(error)
              })
          }, 1000)
        }
        this.awaitingSearch = true
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
  margin-right: 20%;
}

#text-color1,
#text-color2 {
  color: #28d063;
  font-size: 15px;
  letter-spacing: 3px;
}

#text-color3 {
  color: #34334b;
  font-size: 18px;
  letter-spacing: 3px;
}
</style>
