<template>
  <div>
    <b-container>
      <div v-if="LoadBook === 'ok'">
        <b-row id="center">
          <b-col cols="*">
            <div
              id="book"
              :style="{ backgroundImage: 'url(' + book.cover + ')' }"
            ></div>
          </b-col>
        </b-row>
        <b-row id="center">
          <b-col cols="*">
            <span id="title">{{ book.title }}</span>
          </b-col>
        </b-row>
        <b-row id="center">
          <b-col cols="*">
            <span id="author">{{ book.author }}</span>
          </b-col>
        </b-row>

        <b-row id="center">
          <b-button id="btn" @click="addBook('true')"
            ><i class="fas fa-book-reader"></i
            ><span style="margin-left: 15px">Add</span></b-button
          >
          <b-button id="btn" @click="addBook('false')"
            ><i class="fas fa-bookmark"></i
            ><span style="margin-left: 15px">Add</span></b-button
          >
          <div v-if="book.sale != null">
            <b-button id="btn" :href="book.sale" target="_blank"
              ><i class="fas fa-shopping-cart"></i
              ><span style="margin-left: 15px">Buy</span></b-button
            >
          </div>
        </b-row>
        <b-row id="center">
          <b-col style="text-align: center">
            <span id="description">{{ book.description }}</span>
          </b-col>
        </b-row>
        <b-row style="margin-top: 30px">
          <b-col style="text-align: left">
            <span id="bta">By This Author</span>
          </b-col>
        </b-row>
        <b-row v-if="bookAuthor !== 'ok'">
          <div id="scrolling-wrapper">
            <b-col
              v-for="item in bookAuthor"
              id="cols-books"
              :key="item.id"
              col
              lg="1.5"
            >
              <div
                id="bookAuthor"
                :style="{ backgroundImage: 'url(' + item.cover + ')' }"
              ></div>
            </b-col>
          </div>
        </b-row>
      </div>
      <div v-if="LoadBook === 'loading'">
        <div>
          <b-spinner class="m-5" label="Busy"></b-spinner>
        </div>
      </div>
      <div v-if="LoadBook === 'noBook'">
        <div class="m-5">
          <span style="font-size: 30px; color: #34334b !important"
            >No book found</span
          >
        </div>
      </div>
    </b-container>
    <BottomBar />
  </div>
</template>

<script>
import BottomBar from '~/components/BottomBar'

export default {
  components: {
    BottomBar,
  },
  data() {
    return {
      id: 1,
      book: '',
      LoadBook: 'loading',
      bookAuthor: '',
      book_user: '',
    }
  },
  mounted() {
    this.getAuthor()
  },
  methods: {
    async getBook() {
      const isbn = this.$route.query.isbn
      await this.$axios
        .$get(`/books/search/${isbn}`)
        .then((result) => {
          if (result.data) {
            this.book = result.data.books[0]
            this.LoadBook = 'ok'
          } else {
            this.LoadBook = 'noBook'
          }
        })
        .catch((error) => {
          window.console.log(error)
        })
    },
    async getAuthor() {
      await this.getBook()
      await this.$axios
        .$get(`/books/by/${this.book.author}`)
        .then((result) => {
          if (result.data.books) {
            this.bookAuthor = result.data.books
          }
        })
        .catch((error) => {
          window.console.log(error)
        })
    },
    async addBook(isBiblio) {
      const isbn = this.$route.query.isbn
      const data = {
        uuid: this.$store.state.user.user.id,
        isbn,
        type: isBiblio,
      }
      await this.$axios
        .$post(`/user/books`, data, {
          headers: {
            Authorization: `Bearer ${this.$store.state.user.meta.token}`,
          },
        })
        .then((result) => {
          window.console.log(result.data.userbooks)
          if (result.data.userbooks) {
            this.$bvToast.toast(
              `The book ${this.book.title} was added in ${
                isBiblio === 'true' ? 'my book' : 'wishlist'
              }`,
              {
                title: 'Book added',
                autoHideDelay: 4000,
                variant: 'success',
                appendToast: false,
              }
            )
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
#center {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
#book {
  border: 1px solid #34334b;
  background-color: #34334b;
  width: 150px;
  height: 230px;
  border-radius: 10px;
  background-size: cover;
  align-items: center;
}
#bookAuthor {
  border: 1px solid #34334b;
  background-color: #34334b;
  width: 90px;
  height: 150px;
  border-radius: 10px;
  background-size: cover;
  display: inline-block;
}
#title {
  color: #34334b;
  text-align: Left;
  font-size: 1.2em;
}
#bta {
  color: #34334b;
  text-align: Left;
  font-size: 1.2em;
}
#author {
  color: #34334b;
  text-align: Left;
  font-size: 0.8em;
}
#description {
  color: #34334b;
  text-align: center;
  font-size: 0.8em;
}
#desc_book {
  font-size: 12px;
}

.container {
  display: flex;
  justify-content: center;
}
#cols-books {
  margin-top: 10px;
}

#scrolling-wrapper {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}

#btn {
  background-color: #ffffff !important;
  color: #34334b;
  border: 0px;
  border-radius: 40px;
}
</style>
