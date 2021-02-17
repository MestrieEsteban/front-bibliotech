<template>
  <div>
    <h1 style="color:#34334B">{{ title }}</h1>

    <div v-if="!bShowScanner">
      <b-form-file
        style="width: 90%; text-align: left"
        placeholder="Choose image(s) to decode"
        drop-placeholder="Drop file here..."
        accept="image/png,image/jpeg,image/bmp,image/gif"
        @change="onIptChange"
      ></b-form-file>
	  <br />
      <b-button class="btn-lg" style="background-color:#FD8369 !important; border:0px; color:#34334B; margin-top:120%" @click="showScanner"><i class="fas fa-camera-retro fa-2x"></i></b-button>
    </div>

    <div v-if="bShowScanner">
      <BarcodeScanner @appendMessage="appendMessage"></BarcodeScanner>
	        <b-button class="btn-lg" style="background-color:#FD8369 !important; border:0px; color:#34334B;margin-top:11%" @click="hideScanner"><i class="fas fa-times-circle fa-2x"></i></b-button>
    </div>

    <!--<div ref="divMessage" class="div-message">
      <p v-for="(message, index) of messages" :key="messageKeyBase + index">
        {{ message }}
      </p>
    </div>-->
  </div>
</template>

<script>
import BarcodeScanner from './BarcodeScanner'
import DBR from '~/plugins/dbr'

export default {
  components: {
    BarcodeScanner,
  },
  props: {
    title: String,
  },
  data() {
    return {
      reader: null,
      messageKeyBase: 0,
      messages: [],
      bShowScanner: false,
    }
  },
  beforeDestroy() {
    if (this.reader) {
      this.reader.destroy()
    }
  },
  methods: {
    appendMessage(str) {
      this.messages.push(str)
      if (this.messages.length > 500) {
        ++this.messageKeyBase
        this.messages.splice(0, 1)
      }
      if (this.bShowScanner) {
        window.location = `http://localhost:3000/book/infos?isbn=${this.messages}`
      }
    },
    async onIptChange(event) {
      try {
        this.appendMessage('======== start read... ========')
        const reader = (this.reader =
          this.reader || (await DBR.BarcodeReader.createInstance()))
        const input = event.target
        const files = input.files
        for (let i = 0; i < files.length; ++i) {
          const file = files[i]
          this.appendMessage(file.name + ':')
          const results = await reader.decode(file)
          for (const result of results) {
            this.appendMessage(result.barcodeText)
          }
        }
        input.value = ''
        this.appendMessage('======== finish read ========')
        window.location = `http://localhost:3000/book/infos?isbn=${this.messages[2]}`
      } catch (ex) {
        this.appendMessage(ex.message)

        window.console.error(ex)
      }
    },
    showScanner() {
      this.bShowScanner = true
    },
    hideScanner() {
      this.bShowScanner = false
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.div-message {
  max-height: 200px;
  overflow-y: auto;
  resize: both;
}
</style>
