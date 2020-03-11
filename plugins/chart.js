import Vue from 'vue'
import { Line, mixins } from 'vue-chartjs'

Vue.component('line-chart', {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: ['chartData', 'options'],
  watch: {
    'options': {
      handler(newOption, oldOption) {
        this.$data._chart.destroy()
        this.renderChart(this.chartData, this.options)
      },
      deep: true,
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  },
})
