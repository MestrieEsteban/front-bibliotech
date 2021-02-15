<template>
  <div>
    <h1>{{ title }}</h1>

    <div v-if="!bShowScanner">
      Choose image(s) to decode:
      <input
        type="file"
        multiple
        accept="image/png,image/jpeg,image/bmp,image/gif"
        @change="onIptChange"
      />
      <br /><br />
      <button @click="showScanner">show scanner</button>
    </div>

    <div v-if="bShowScanner">
      <button @click="hideScanner">hide scanner</button>
      <BarcodeScanner @appendMessage="appendMessage"></BarcodeScanner>
    </div>

    <div ref="divMessage" class="div-message">
      <p v-for="(message, index) of messages" :key="messageKeyBase + index">
        {{ message }}
      </p>
    </div>
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
  updated() {
    this.$refs.divMessage.scrollTop = this.$refs.divMessage.scrollHeight
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
