<template>
  <div>
    <b-container>
      <div class="user">
        <b-avatar
          variant="info"
          src="https://placekitten.com/300/300"
          size="5.5rem"
          style="border: 2px solid #34334b"
        ></b-avatar>
        <br />
        <div v-if="$store.state.user" right>
          <span style="color: #34334b !important; font-size: 25px">{{
            $store.state.user.user.nickname
          }}</span>
        </div>
        <br />
        <b-img
          src="../../assets/svg/undraw_Bibliophile_hwqc_1.svg"
          fluid
          style="width: 280px"
          alt="Responsive image"
        ></b-img>
        <br />
        <span style="color: #34334b !important; font-size: 4.5vw"
          >{{ countBook }} {{ countBook > 0 ? 'Books' : 'Book' }}</span
        >
      </div>
      <br />
      <b-form>
        <b-form-group id="input-group-2">
          <b-form-input
            id="input-2"
            v-model="form.email"
            disabled
            type="email"
            placeholder="Enter email"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-1">
          <b-form-input
            id="input-1"
            v-model="form.nickname"
            type="text"
            placeholder="Enter nickname"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-3">
          <b-form-input
            id="input-3"
            v-model="form.password"
            placeholder="Enter password"
            :type="form.passwordFieldType"
            required
          >
          </b-form-input>
          <br />
          <div class="user">
            <b-button
              style="
                background-color: #fd8369 !important;
                border: 0;
                color: #34334b;
              "
              @click="EditUser"
              >Edit user</b-button
            >
          </div>
        </b-form-group>
      </b-form>
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
      form: {
        nickname: this.$store.state.user.user.nickname,
        email: this.$store.state.user.user.email,
        password: '',
        passwordFieldType: 'password',
      },
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
    async EditUser() {
      const data = {
        nickname: this.form.nickname,
        email: this.form.email,
        password: this.form.password,
      }
      const result = await this.$axios.put(
        `user/${this.$store.state.user.user.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${this.$store.state.user.meta.token}`,
          },
        }
      )
      if (result.data === 'User modified') {
        await this.$store
          .dispatch('login', {
            email: this.form.email,
            password: this.form.password,
          })
          .then((result) => {
            if (result.data.message) {
              alert(result.data.message)
              return
            }
            this.loading = false
            this.$router.push('/user/profil')
          })
      }
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
