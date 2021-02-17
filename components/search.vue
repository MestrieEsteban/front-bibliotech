<template>
  <div id="border_search">
    <mdb-form-inline>
      <div id="espacement"></div>
      <mdbIcon id="icon_color" icon="search" />
      <div id="espacement_2"></div>
      <input id="btn-search" type="text" placeholder="Search for books ..." />
    </mdb-form-inline>
  </div>
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
#border_search {
  border-radius: 20px;
  background-color: #f3f5f9;
}

input {
  display: inline-block;
  width: 90%;
  border-radius: 20px;
  vertical-align: middle;
  border: none;
  outline: none;
  background-color: #f3f5f9;
}

::placeholder {
  color: grey;
  font-size: 10px;
}

#icon_color {
  background-color: #f3f5f9;
}

#espacement {
  margin-left: 2%;
}

#espacement_2 {
  margin-left: 1%;
}
</style>
