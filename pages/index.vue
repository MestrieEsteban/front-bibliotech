<template>
  <section class="section">
    <div class="columns">
      <span class="title">BiblioTech</span>

      <b-row class="container svg">
        <b-img
          src="../assets/svg/image1.svg"
          fluid
          alt="Responsive image"
        ></b-img>
      </b-row>
      <br />
      <div class="control">
        <!--<b-button variant="success" href="/auth/register" class="button is-dark is-fullwidth">
              Register
            </b-button>-->
        <div class="container flex">
          <b-button href="/auth/login" style="border:0px" class=" btn-lg bg-white text-dark">
            Sign In
          </b-button>
        </div>

        <div class="container grid">
          <a
            href="/auth/register"
            style='color: #F3F5F9; font-size:15px'
          >
            Create an account
          </a>
        </div>
      </div>
      <!--<b-button variant="warning" href="/scanner/scan" class="button is-dark is-fullwidth">
				      scan
            </b-button>-->
    </div>
  </section>
</template>

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
.control {
  background: #fd8369;
  position: fixed;
  padding-bottom: 75px;
  padding-top: 35px;
  flex-wrap: wrap;
  bottom: 0;
  display: flex;
  height: 150px;
  width: 100%;
  justify-content: space-around;
  border-radius: 20px 20px 0px 0px;
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
.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.svg {
  height: 100%;
  margin-top: 190px;
}
.links {
  padding-top: 15px;
}
</style>
