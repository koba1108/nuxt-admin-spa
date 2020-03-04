<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-title>TOP5</v-card-title>
        <v-list disabled>
          <v-list-item-group v-model="top5" color="primary">
            <v-list-item v-for="(t, i) in top5" :key="i">
              <v-list-item-content>
                <v-list-item-title>
                  {{ t.key }}: {{ t.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card>
        <v-card-title>グラフその1</v-card-title>
        <v-card-text class="h-500px">
          <line-chart v-if="chartData" :chart-data="chartData" :options="options"/>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card>
        <v-card-title>グラフその2</v-card-title>
        <v-card-text class="h-500px">
          <line-chart v-if="chartData2" :chart-data="chartData" :options="options"/>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  const range = (min, max) => {
    return Array.from(Array(max + 1).keys()).filter(n => n >= min)
  }
  const randInt = () => {
    return Math.floor(Math.random() * (50 - 5 + 1)) + 5
  }
  const makeTestData = () => {
    return range(1, 12).map(i => randInt())
  }

  export default {
    data() {
      return {
        top5: [
          { key: 'driver_key1', text: '10000km', },
          { key: 'driver_key2', text: '1000km', },
          { key: 'driver_key3', text: '100km', },
          { key: 'driver_key4', text: '10km', },
          { key: 'driver_key5', text: '1km', },
        ],
        chartData: null,
        chartData2: null,
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      }
    },
    methods: {
      getData() {
        return {
          labels: range(1, 12).map(i => `${i}月`),
          datasets: [
            {
              label: 'Test Data1',
              animation: true,
              backgroundColor: 'rgba(255, 100, 130, 0.2)',
              data: makeTestData(),
            },
            {
              label: 'Test Data2',
              animation: true,
              backgroundColor: 'rgba(100, 130, 255, 0.2)',
              data: makeTestData(),
            },
            {
              label: 'Test Data3',
              animation: true,
              backgroundColor: 'rgba(130, 255, 100, 0.2)',
              data: makeTestData(),
            },
          ],
        }
      },
    },
    mounted() {
      this.chartData = this.getData()
      this.chartData2 = this.getData()
    },
  }
</script>

<style lang="scss">
  #line-chart {
    height: 500px !important;
  }
</style>
