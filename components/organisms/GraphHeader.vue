<template>
  <v-row>
    <v-col cols="12">
      <v-card-title>{{ title }}</v-card-title>
    </v-col>
    <v-col cols="3">
      <v-text-field
        type="date"
        label="From"
        prepend-icon="event"
        :value="from"
        @click="openDatepicker(PICKER_TYPE_FROM)"
      />
    </v-col>
    <v-col cols="3">
      <v-text-field
        :value="to"
        type="date"
        label="To"
        prepend-icon="event"
        @click="openDatepicker(PICKER_TYPE_TO)"
      />
    </v-col>
    <v-col cols="3">
      <v-select
        :value="selected"
        @input="$emit('itemSelected', $event)"
        :items="selectItems"
        label="Select Vehicle Name"
        clearable
      />
    </v-col>
    <v-col cols="3">
      <v-select
        :value="unit"
        @input="$emit('unitSelected', $event)"
        :items="UNIT_TYPES"
        label="Select Unit"
        clearable
      />
    </v-col>
    <v-dialog :max-width="290" v-model="dialogActive">
      <v-date-picker
        show-current
        no-title
        reactive
        :min="pickerMin"
        :max="pickerMax"
        @click:date="setPickedDate"
      />
    </v-dialog>
  </v-row>
</template>

<script>
  import { PICKER_TYPE_FROM, PICKER_TYPE_TO, UNIT_TYPES } from '~/model/define'

  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
      from: {
        type: String,
        required: true,
      },
      to: {
        type: String,
        required: true,
      },
      unit: {
        type: String,
        default: 'minute',
      },
      selectItems: {
        type: Array,
        required: true,
      },
      selected: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        dialogActive: false,
        pickerType: PICKER_TYPE_FROM,
      }
    },
    computed: {
      UNIT_TYPES: () => UNIT_TYPES,
      PICKER_TYPE_FROM: () => PICKER_TYPE_FROM,
      PICKER_TYPE_TO: () => PICKER_TYPE_TO,
      pickerMin() {
        return this.pickerType !== PICKER_TYPE_FROM ? this.from : ''
      },
      pickerMax() {
        return this.pickerType !== PICKER_TYPE_TO ? this.to : ''
      },
    },
    methods: {
      openDatepicker(selectedType) {
        this.pickerType = selectedType
        this.dialogActive = true
      },
      setPickedDate(selectedDate) {
        const emit = this.pickerType === PICKER_TYPE_FROM ? 'fromSelected' : 'toSelected'
        this.$emit(emit, selectedDate)
        this.dialogActive = false
      },
    },
  }
</script>
