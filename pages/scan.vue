<template>
  <div>
    <div v-if="foundCodes" class="level">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">{{ foundCodes.type }}</p>
          <p class="title">{{ foundCodes.code }}</p>
        </div>
      </div>
    </div>
    <nav class="level" role="navigation" aria-label="main navigation">
      <div v-show="!scannerActive" class="level-item">
        <a class="button" @click="start">Start Scanner</a>
      </div>

      <div v-show="scannerActive" class="level-item">
        <a class="button" @click="stop">Stop Scanner</a>
      </div>
    </nav>
    <div id="videoWindow" class="video"></div>
  </div>
</template>

<script>
import Quagga from 'quagga'

export default {
  name: 'Scan',
  data() {
    return {
      scannerActive: false,
      foundCodes: {
        code: '',
        type: '',
      },
    }
  },
  mounted() {
    Quagga.onDetected((data) => {
      const foundResult = data[0]
      const foundCodes = {
        code: foundResult.codeResult.code,
        type: foundResult.codeResult.format,
      }
      window.console.log(this.foundCodes)
      this.foundCodes = foundCodes
      this.$emit('found', this.foundCodes)
    })
  },
  methods: {
    start() {
      const config = {
        locate: true,
        inputStream: {
          name: 'live',
          type: 'LiveStream',
          target: document.querySelector('#videoWindow'),
          constraints: {
            width: { min: 640 },
            height: { min: 480 },
            facingMode: 'environment',
            aspectRatio: { min: 1, max: 2 },
          },
        },
        decoder: {
          readers: ['ean_reader'],
          multiple: true,
        },
        numOfWorkers: navigator.hardwareConcurrency,
        resolution: '1920px',
        locator: {
          halfSample: true,
          patchSize: 'x-large',
        },
      }
      Quagga.init(config, (err) => {
        if (err) {
          window.console.log(err)
          return
        }
        window.console.log('initialization complete')
        Quagga.start()
      })
    },
    stop() {
      this.scannerActive = false
      Quagga.stop()
    },
  },
}
</script>

<style>
.video {
  width: 100%;
}
</style>
