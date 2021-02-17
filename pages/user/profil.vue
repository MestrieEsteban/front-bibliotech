<template>
  <div>
    <b-container>
      <div class="user">
        <b-avatar
          variant="info"
          src="https://placekitten.com/300/300"
          size="5.5rem"
          style="border: 2px solid #34334b;"
        ></b-avatar>
        <br />
        <b-div v-if="$store.state.user" right>
          <span style="color: #34334b !important; font-size: 25px;">{{
            $store.state.user.user.nickname
          }}</span>
        </b-div>
        <br />
        <b-img
          src="../../assets/svg/undraw_Bibliophile_hwqc_1.svg"
          fluid
          style="width: 280px;"
          alt="Responsive image"
        ></b-img>
		<br />
		<span style="color: #34334b !important; font-size: 4.5vw;">{{countBook}} {{countBook > 0 ? "Books":"Book"}}</span>
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
      countBook: 0,
    }
  },
  beforeMount() {
    this.getCountBooks()
  },
  methods: {
    async getCountBooks() {
      await this.$axios
        .$get(`/user/books/count/1`)
        .then((result) => {
          if (result.data.userbookscount) {
            this.countBook = result.data.userbookscount
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
.title {
  font-family: Abyyssinica SIL;
  display: block;
  font-weight: 300;
  font-size: 70px;
  color: #34334b;
  letter-spacing: 1px;
  text-align: center;
  margin-top: 20px;
}
.user {
  display: block;
  text-align: center;
  margin-top: 10px;
}
#center {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
#container {
  margin-top: 10px;
}
</style>
