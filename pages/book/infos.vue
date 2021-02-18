<template>
  <div>
    <b-container>
      <div v-if="LoadBook == 'ok'">
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
          <b-button id="btn"
            ><i class="fas fa-book-reader"></i> Ajouter</b-button
          >
          <b-button id="btn"><i class="fas fa-bookmark"></i> Ajouter</b-button>
          <div v-if="book.sale != null">
            <b-button :href="book.sale" target="_blank" id="btn"
              ><i class="fas fa-shopping-cart"></i> Acheter</b-button
            >
          </div>
        </b-row>
        <b-row id="center">
          <b-col style="text-align: center;">
            <span id="description">{{ book.description }}</span>
          </b-col>
        </b-row>

        <b-row style="margin-top: 30px;">
          <b-col style="text-align: left;">
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
      <div v-if="LoadBook == 'loading'">
        <div>
          <b-spinner class="m-5" label="Busy"></b-spinner>
        </div>
      </div>
      <div v-if="LoadBook == 'noBook'">
        <div class="m-5">
          <span style="font-size: 30px; color: #34334b !important;"
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
