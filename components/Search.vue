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
  props: {
    search: {
      type: String,
      default: '',
    },
  },
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
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
}

input {
  display: inline-block;
  width: 90%;
  border-radius: 20px;
  vertical-align: middle;
  border: none;
  outline: none;
  background-color: #ffffff;
  font-size: 12px;
}

::placeholder {
  color: grey;
  font-size: 10px;
}

#icon_color {
  background-color: #ffffff;
  color: #28d063;
}

#espacement {
  margin-left: 2%;
}

#espacement_2 {
  margin-left: 1%;
}
</style>
