<template>
  <v-col cols="12">
    <v-card>
      <v-card-title>
        <slot name="header"/>
      </v-card-title>
      <v-card-text class="h-500px">
        <slot name="chart"/>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
  export default {}
</script>
