<template>
  <section class="section">
    <div class="columns">
      <span class="title">Connection</span>
      <br />
      <div class="column is-4 is-offset-4">
        <form method="post" @submit.prevent="login">
          <div class="container">
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <b-form-input
                  v-model="email"
                  type="email"
                  class="input"
                  name="email"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <b-form-input
                  v-model="password"
                  type="password"
                  class="input"
                  name="password"
                />
              </div>
            </div>
          </div>
          <br />
          <div class="control1">
            <div class="container flex">
              <b-button
                type="submit"
                style="border: 0px"
                class="btn-lg bg-white text-dark"
              >
                Log In
              </b-button>
            </div>

            <div class="container grid">
              <a
                style="color: #f3f5f9; font-size: 15px"
                href="/auth/resetPassword"
              >
                Forgot password
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  components: {},
  transition: 'intro',

  data() {
    return {
      email: '',
      password: '',
      error: null,
    }
  },
  methods: {
    async login() {
      this.alert = null
      this.loading = true
      await this.$store
        .dispatch('login', {
          email: this.email,
          password: this.password,
        })
        .then((result) => {
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
  padding-top: 1px;
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
.grid {
  font-family: Abyyssinica SIL;
  display: block;
  text-align: center;
  font-size: 30px;
}
</style>
