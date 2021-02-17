<template>
  <div id="footer">
    <div id="bordures">
      <a href="/home">
        <div id="home">
          <i class="fas fa-home"></i>
        </div>
      </a>
      <a href="/books">
        <div id="book_btn">
          <i class="fas fa-book-reader"></i>
        </div>
      </a>
      <a href="/scan">
        <span id="scan">
          <b-button id="btn_scan"
            ><i id="icons-plus" class="fas fa-plus"></i
          ></b-button>
        </span>
      </a>
      <a href="/whishlist">
        <div id="whishlist">
          <i class="fas fa-bookmark"></i>
        </div>
      </a>
      <div id="profil">
        <i class="fas fa-user-circle"></i>
      </div>
    </div>
  </div>
</template>
<style>
#footer {
  bottom: 0%;
  position: fixed;
  width: 100%;
}
#bordures {
  background-color: #fd8369;
  border: 2px solid #fd8369;
  border-radius: 20px 20px 0px 0px;
  width: 100%;
  height: 10%;
  display: inline-block;
  text-align: center;
}
#home,
#book_btn,
#whishlist,
#profil {
  display: inline-block;
  background-color: #fd8369;
  border: 2px solid #fd8369;
  border-radius: 20px 20px 0px 0px;
  width: 17%;
}

#btn_scan {
  background-color: #f3f5f9 !important;
  border: 0px solid #f3f5f9;
  border-radius: 20px;
}

#icons-plus {
  color: #34334b;
}

#scan {
  display: inline-block;
  background-color: #fd8369;
  border: 2px solid #fd8369;
  border-radius: 20px 20px 0px 0px;
  width: 18%;
}

a,
a:hover {
  color: black;
}
</style>
