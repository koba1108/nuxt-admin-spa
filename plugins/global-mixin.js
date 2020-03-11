import Vue from 'vue'

Vue.mixin({
  methods: {
    arrayUnique(arr) {
      return Array.from(new Set(arr))
    },
    arrayRange(min, max) {
      return Array.from(Array(max + 1).keys()).filter(n => n >= min)
    },
    randInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
  },
})
