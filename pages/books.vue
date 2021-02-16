<template>
  <div>
    <b-container>
      <h1 id="title">My books</h1>
      <Search />
      <div id="container"></div>
      <b-row>
        <b-col v-for="item in book_user" :key="item.id" col lg="1.5">
          <div id="book"></div>
          <p id="title_book">{{ item.title }}</p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Search from '~/components/search.vue'

export default {
  components: {
    Search,
  },
  data() {
    return {
      id: 1,
      book: '',
      book_user: '',
    }
  },
  mounted() {
    this.getBook()
  },
  methods: {
    async getBook() {
      await this.$axios
        .$get('user/books/1')
        .then((result) => {
          this.book = result.data.userbooks
          for (let i = 0; this.book.length; i++) {
            if (result.data.userbooks[i].id === this.id) {
              this.book_user = result.data.userbooks[i].books
            }
          }
        })
        .catch((error) => {
          window.console.log(error)
        })
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
}
#title {
  color: black;
  font-family: Abyssinica SIL;
  text-align: Left;
  font-size: 24px;
  margin-top: 20px;
}

#title_book {
  font-size: 12px;
}

#container {
  margin-top: 10px;
}
</style>
