<template>
  <div>
    <line-chart
      :chart-data="chart"
      :options="chartOptions"
    />
  </div>
</template>

<script>
  const COLOR_WHITE = 'rgba(0,0,0,0)'

  function generateRGB() {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    return `rgb(${r}, ${g}, ${b})`
  }

  function newDataset(tid, logs) {
    return {
      label: tid,
      animation: true,
      borderColor: generateRGB(),
      backgroundColor: COLOR_WHITE,
      data: logs.filter(l => l.TID === tid).map(l => l.TDT),
    }
  }

  export default {
    props: {
      logs: {
        type: Array,
        required: true,
      },
      currentTid: {
        type: String,
        default: '',
      }
    },
    computed: {
      chartOptions() {
        return {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
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
      labels() {
        return this.arrayUnique(this.logs.map(l => l.TIME)).sort((a, b) => a > b ? 1 : -1)
      },
      chart() {
        const tidUnique = this.arrayUnique(this.logs.map(l => l.TID)).
          filter(tid => this.currentTid ? tid === this.currentTid :true)
        const datasets = tidUnique.map(tid => newDataset(tid, this.logs))
        console.log('datasets', datasets)
        return {
          labels: this.labels,
          datasets
        }
      },
    },
  }
</script>
