<template>
  <div>
    <line-chart
      :chart-data="chart"
      :options="chartOptions"
    />
  </div>
</template>

<script>
  import { UNIT_MIN } from '~/model/define'

  export default {
    props: {
      currentVehicle: {
        type: Object,
        default: null,
      },
      logs: {
        type: Array,
        required: true,
      },
      unit: {
        type: String,
        required: true,
      },
    },
    computed: {
      UNIT_MIN: () => UNIT_MIN,
      chartOptions() {
        return {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                type: 'time',
                distribution: 'linear',
                time: {
                  minUnit: UNIT_MIN,
                  unit: this.unit,
                  round: this.unit,
                },
              }],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'km',
                },
              },
            ],
          },
        }
      },
      chart() {
        return {
          datasets: this.datasets,
        }
      },
      tidList() {
        return this.arrayUnique(this.logs.map(l => l.TID)).
          sort((a, b) => a > b ? 1 : -1)
      },
      datasets() {
        return this.tidList.filter(tid => {
          return this.currentVehicle ? this.currentVehicle.tms === tid : true
        }).map(tid => {
          const sortedLog = this.logs.filter(l => tid ? l.TID === tid : true).
            sort((a, b) => a.UpdatedAt.toDate() > b.UpdatedAt.toDate() ? 1 : -1)
          const chartData = sortedLog.map((l, index) => {
            const res = {
              t: l.UpdatedAt.toDate(),
              y: 0,
            }
            if(index > 0) {
              const y = l.TDT - sortedLog[index - 1].TDT
              res.y = y > 0 ? y : 0
            }
            return res
          })
          return {
            label: tid,
            animation: true,
            borderColor: this.generateRGB(),
            backgroundColor: 'rgba(0,0,0,0)',
            data: chartData,
          }
        })
      },
    },
    methods: {
      roundTimestamp(date, intervalMin, format = '') {
        const newDate = date.setMinutes(Math.round(date.getMinutes() / intervalMin) * intervalMin)
        return format ? this.$moment(newDate).format(format) : this.$moment(newDate)
      },
      generateRGB() {
        const r = Math.floor(Math.random() * 256)
        const g = Math.floor(Math.random() * 256)
        const b = Math.floor(Math.random() * 256)
        return `rgb(${r}, ${g}, ${b})`
      },
    },
  }
</script>
