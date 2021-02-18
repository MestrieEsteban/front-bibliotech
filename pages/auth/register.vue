<template>
  <div>
    <span class="title">Create account</span>
    <br />
    <b-form v-if="show" method="post" @submit.prevent="register">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="email"
          type="email"
          name="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Your nickname:"
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          v-model="nickname"
          name="nickname"
          required
          placeholder="Enter nickname"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Your password:"
        label-for="input-3"
      >
        <b-form-input
          id="input-3"
          v-model="password"
          type="password"
          :state="chackPassword1"
          name="password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Your password confirmation:"
        label-for="input-4"
      >
        <b-form-input
          id="input-4"
          v-model="passwordConfirmation"
          type="password"
          :state="chackPassword2"
          name="passwordConfirmation"
          required
          placeholder="Enter password confirmation"
        >
        </b-form-input>
      </b-form-group>
      <b-alert v-model="passShow" variant="danger">Password not match</b-alert>

      <b-alert v-model="passShow" variant="danger">Password not match</b-alert>

      <div class="control1">
        <div class="container flex">
          <b-button
            type="submit"
            style="border: 0px"
            class="btn-lg bg-white text-dark"
            >Sign Up</b-button
          >
        </div>
      </div>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: 'esteban94.em@gmail.com',
      nickname: 'Esteban',
      password: '',
      passwordConfirmation: '',
      show: true,
      passShow: false,
    }
  },
  mounted() {
    this.chackPassword1()
    this.chackPassword2()
  },
  methods: {
    async register() {
      this.alert = null
      this.loading = true
      await this.$store
        .dispatch('register', {
          email: this.email,
          nickname: this.nickname,
          password: this.password,
          passwordConfirmation: this.passwordConfirmation,
        })
        .then((result) => {
          window.console.log(result.data.message)
          if (result.data.message) {
            alert(result.data.message)
            return
          }
          this.loading = false
          this.$router.push('/user/profil')
        })
        .catch((error) => {
          this.loading = false
          if (error.response && error.response.data) {
            this.alert = {
              type: 'error',
              message: error.response.data.message || error.reponse.status,
            }
          }
        })
    },
  },
  chackPassword1() {
    return this.password.length > 0
  },
  chackPassword2() {
    if (this.passwordConfirmation.length > 0) {
      if (this.password === this.passwordConfirmation) {
        this.passShow = false
        return true
      } else {
        this.passShow = true
        return false
      }
    } else {
      return false
    }
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
  position: absolute;
  padding-bottom: 70px;
  padding-top: 45px;
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
