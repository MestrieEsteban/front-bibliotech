<template>
  <div id="border_search">
    <mdb-form-inline>
      <div id="espacement"></div>
      <mdbIcon id="icon_color" icon="search" />
      <div id="espacement_2"></div>
      <input
        id="btn-search"
        type="text"
        placeholder="Search for books ..."
        :value="search"
        @input="changeMessage"
      />
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
  props: ['search'],
  data() {
    return {
      term: '',
    }
  },
  methods: {
    changeMessage(event) {
      this.term = event.target.value
      this.$emit('messageChanged', this.term)
    },
  },
}
</script>

<style>
#border_search {
  border-radius: 20px;
  background-color: #e5e5e5;
}

input {
  display: inline-block;
  width: 90%;
  border-radius: 20px;
  vertical-align: middle;
  border: none;
  outline: none;
  background-color: #e5e5e5;
  font-size: 12px;
}

::placeholder {
  color: grey;
  font-size: 10px;
}

#icon_color {
  background-color: #e5e5e5;
}

#espacement {
  margin-left: 2%;
}

#espacement_2 {
  margin-left: 1%;
}
</style>
