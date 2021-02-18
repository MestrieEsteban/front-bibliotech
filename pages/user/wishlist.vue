<template>
  <div>
    <b-container>
      <h1 id="title">Wish Books</h1>
      <Search :msg="term" @messageChanged="search($event)"></Search>
      <div v-if="whist_user !== ''"></div>
      <div id="container"></div>
      <b-row v-if="whist_user !== ''">
        <b-col
          v-for="item in whist_filter"
          id="cols-books"
          :key="item.id"
          col
          lg="1.5"
        >
          <div
            id="book"
            :style="{ backgroundImage: 'url(' + item.cover + ')' }"
          ></div>
          <span id="desc_book">{{ item.title.substr(0, 10) }}...</span>
        </b-col>
      </b-row>
    </b-container>
    <BottomBar />
  </div>
</template>

<script>
import Search from '@/components/Search'
import BottomBar from '@/components/BottomBar'
import redirect from '../../mixins/redirectLogin'

export default {
  mixins: [redirect],

  components: {
    Search,
    BottomBar,
  },
  data() {
    return {
      book: '',
      whist_user: '',
      whist_filter: '',
      term: '',
    }
  },
  mounted() {
    this.getBook()
  },
  methods: {
    async getBook() {
      await this.$axios
        .$get(`user/books/${this.$store.state.user.user.id}`, {
          headers: {
            Authorization: `Bearer ${this.$store.state.user.meta.token}`,
          },
        })
        .then((result) => {
          this.book = result.data.userbooks
          for (let i = 0; i < this.book.length; i++) {
            if (!this.book[i].isBiblio && this.book[i].books.length > 0) {
              this.whist_user = this.book[i].books
              this.whist_filter = this.book[i].books
            }
          }
        })
        .catch((error) => {
          window.console.log(error)
        })
    },
    search(event) {
      this.term = event
      this.term !== ''
        ? (this.whist_filter = this.whist_user.filter((book) =>
            book.title.toLowerCase().match(this.term.toLowerCase())
          ))
        : (this.whist_filter = this.whist_user)
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
  color: black;
  text-align: Left;
  font-size: 24px;
  margin-top: 20px;
}

#desc_book {
  font-size: 12px;
}

#container {
  margin-top: 10px;
}

#cols-books {
  margin-top: 10px;
}
</style>
