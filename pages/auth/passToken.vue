<template>
  <div>
    <br />
    <span class="title">Password</span>
    <br />
    <b-form method="post" @submit.prevent="sendMail">
      <b-form-group
        id="input-group-1"
        label="New password :"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="password"
          type="password"
          name="password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>
      <div class="control1">
        <div class="container flex">
          <b-button
            type="submit"
            style="border: 0px"
            class="btn-lg bg-white text-dark"
          >
            Send
          </b-button>
        </div>
      </div>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: '',
    }
  },
  methods: {
    async sendMail() {
      const data = {
        password: this.password,
        resettoken: this.$route.query.token,
      }
      const result = await this.$axios.post(`utils/passToken`, data)
      if (result) {
        this.$router.push('/auth/login')
      }
    },
  },
}
</script>

<style>
.title {
  font-family: Abyyssinica SIL;
  display: block;
  font-size: 45px;
  color: #34334b;
  letter-spacing: 1px;
  text-align: center;
  margin-top: 20px;
}
.control1 {
  background: #fd8369;
  position: fixed;
  padding-bottom: 70px;
  padding-top: 40px;
  flex-wrap: wrap;
  bottom: 0;
  display: flex;
  height: 150px;
  width: 100%;
  justify-content: space-around;
  border-radius: 20px 20px 0px 0px;
  margin-left: 0px;
}
.flex {
  font-family: Abyyssinica SIL;
  text-align: center;
  font-size: 10px;
}
</style>
