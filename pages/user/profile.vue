<template>
  <div>
    <b-container>
      <span class='title'>Profile</span>

        <span class='user'> 
          <b-div v-if="$store.state.user" right>
            <span>{{ $store.state.user.user.nickname }}</span>
          </b-div></span>

    </b-container>
    <BottomBar />
  </div>
</template>

<script>

import BottomBar from '~/components/BottomBar'
export default {
  components: {
    BottomBar,
  }
}
</script>

<style>

.title {
  font-family: Abyyssinica SIL;
  display: block;
  font-weight: 300;
  font-size: 70px;
  color: #34334B;
  letter-spacing: 1px;
  text-align: center;
  margin-top: 20px;
}

.user{
  font-family: Abyyssinica SIL;
  display: block;
  text-align: center;
  color: #34334B;

}

#container {
  margin-top: 10px;
}

</style>