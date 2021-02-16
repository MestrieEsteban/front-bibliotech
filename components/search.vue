<template>
  <footer class="bg-light text-center text-lg-start">
    <mdb-form-inline class="active-cyan active-cyan-2">
      <mdbIcon icon="search" />
      <input
        id="btn-search"
        class="form-control mr-sm-2"
        type="text"
        placeholder="Search for books..."
        aria-label="Search"
      />
    </mdb-form-inline>
  </footer>
</template>

<style>
#btn-search {
  border-radius: 20px;
  width: 90%;
}

.active-cyan-2 input[type='text']:focus:not([readonly]) {
  border: 1px solid #4dd0e1;
  box-shadow: 0 1px 0 0 #4dd0e1;
}

::placeholder {
  color: grey;
  font-size: 10px;
}
</style>
