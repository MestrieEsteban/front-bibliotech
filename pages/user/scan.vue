<template>
  <div>
    <b-container>
      <MenuScan title="Scan book" />
    </b-container>
    <BottomBar />
  </div>
</template>

<script>
import MenuScan from '@/components/MenuScan'
import BottomBar from '@/components/BottomBar'
import redirect from '../../mixins/redirectLogin'

export default {
  components: {
    MenuScan,
    BottomBar,
  },
  mixins: [redirect],
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
