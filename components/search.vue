<template>
  <mdb-form-inline class="active-cyan active-cyan-2">
    <mdbIcon icon="search" />
    <input
      id="btn-search"
      class="form-control mr-sm-2"
      type="text"
      placeholder="Search"
      aria-label="Search"
    />
  </mdb-form-inline>
</template>

<script>
import { mdbIcon, mdbFormInline } from 'mdbvue'
export default {
  components: {
    mdbIcon,
    mdbFormInline,
  },
}
</script>

<style>
#btn-search {
  border-radius: 20px;
  width: 400px;
}

.active-cyan-2 input[type='text']:focus:not([readonly]) {
  border: 1px solid #4dd0e1;
  box-shadow: 0 1px 0 0 #4dd0e1;
}
</style>
