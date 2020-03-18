<template>
  <line-chart
    :chart-data="chartData"
    :options="options"
  />
</template>

<script>
  import { UNIT_SEC, UNIT_MIN } from '~/model/define'

  const COLOR_WHITE = 'rgba(0,0,0,0)'
  const displayFormats = {
    second: 'YYYY-MM-DD HH:mm:ss',
    minute: 'YYYY-MM-DD HH:mm',
    hour: 'YYYY-MM-DD HH:mm',
    day: 'YYYY-MM-DD',
    week: 'YYYY-MM-DD',
  }

  function generateRGB() {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    return `rgb(${r}, ${g}, ${b})`
  }

  export default {
    props: {
      unit: {
        type: String,
        required: true,
      },
      logs: {
        type: Array,
        default: () => [],
      },
    },
    computed: {
      options() {
        const unitStepSize = this.unit === UNIT_MIN ? 15 : 1
        const timeOption = this.unit === UNIT_SEC ? {
          displayFormats: displayFormats,
        } : {
          unit: this.unit,
          round: this.unit,
          unitStepSize: unitStepSize,
          displayFormats: displayFormats,
        }
        return {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                type: 'time',
                distribution: 'linear',
                time: timeOption,
              },
            ],
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
                scaleLabel: {
                  display: true,
                  labelString: '%',
                },
              },
            ],
          },
        }
      },
      chartData() {
        const tids = this.dataMap ? Object.keys(this.dataMap) : []
        return {
          datasets: tids.map(tid => {
            return {
              label: tid,
              lineTension: 0,
              animation: true,
              borderColor: generateRGB(),
              backgroundColor: COLOR_WHITE,
              data: this.dataMap[tid],
            }
          }),
        }
      },
      sortedLogs() {
        return this.logs.sort((a, b) => a.TIME > b.TIME ? 1 : -1)
      },
      dataMap() {
        const dataMap = {}
        this.sortedLogs.map(({ TID, SOC, TIME }) => {
          if(!dataMap.hasOwnProperty(TID)) {
            dataMap[TID] = []
          }
          dataMap[TID].push({ t: TIME, y: SOC })
        })
        return dataMap
      },
    },
  }
</script>
