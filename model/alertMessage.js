export const ALERT_TYPE_BATTERY = 'battery'
export const ALERT_TYPE_BATTERY_1_3 = 'battery_1_3'
export const ALERT_TYPE_TELEMATICS = 'telematics'
export const ALERT_TYPE_S1_STS = 's1_sts'
export const ALERT_TYPE_S2_STS = 's2_sts'
export const ALERT_TYPE_S3_STS = 's3_sts'
export const ALERT_TYPE_HLT_STS = 'hlt_sts'
export const ALERT_TYPE_EMG_STS = 'emg_sts'

// order from bit
export const BATTERY = [
  'Voltage High Alarm',
  'Voltage Lower Alarm',
  'Over Charge Alarm',
  'OverLoad Alarm',
  'Over Charge Temperature Alarm',
  'Over Discharge Temperature Alarm',
  'Low SOC Alarm',
  'Low SOH Alarm',
  'Voltage High Cut Warning',
  'Voltage Lower Cut Warning',
  'Over Charge Warning',
  'OverLoad Warning',
  'Over Charge Temperature Warning',
  'Over Discharge Temperature Warning',
  'Low SOC Warning',
  'Low SOH Warning',
]

// order from bit
const BATTERY_1_3 = [
  'Low Cycle Count Warning Battery 1',
  'Low Cycle Count Alarm Battery1',
  'Charge Mosfet Status Battery 1',
  'Discharge Mosfet Status Battery 1',
  'Hardware Fault Batt1',
  'Low Cycle Count Warning Battery 2',
  'Low Cycle Count Alarm Battery2',
  'Charge Mosfet Status Battery 2',
  'Discharge Mosfet Status Battery 2',
  'Hardware Fault Batt2',
  'Low Cycle Count Warning Battery 3',
  'Low Cycle Count Alarm Battery3',
  'Charge Mosfet Status Battery 3',
  'Discharge Mosfet Status Battery 3',
  'Hardware Fault Batt3',
  'Reserve',
]

// order from bit
export const TELEMATICS = [
  'Communication Fail Batt1',
  'Communication Fail Batt2',
  'Communication Fail Batt3',
  '(SOC > 50) LED 1',
  '(50 >= SOC >= 30) LED 2',
  '(30 > SOC) LED 3',
  'GPS Antenna Tempered',
  'GPS Low Statelite Detect',
  'Battery Charging/Discharging',
  'Battery Full Charged',
  'Charge Mosfet Status',
  'Discharge Mosfet Status',
  'Telematics Memory Error',
  'Telematics Charge Mosfet Short',
  'Telematics Discharge Mosfet Short',
  'Telematics Charge Mosfet Open',
]

export const ALERT_S1_STS = {
  6: 'Socket 1 faulty',
}
export const ALERT_S2_STS = {
  6: 'Socket 2 faulty',
}
export const ALERT_S3_STS = {
  6: 'Socket 3 faulty',
}
export const ALERT_HLT_STS = {
  8: 'Partial System Fault',
  9: 'Full System Fault',
}
export const ALERT_EMG_STS = {
  12: 'Emergency Fault',
}

export const ALERT_MESSAGES = {
  battery: BATTERY,
  battery_1_3: BATTERY_1_3,
  telematics: TELEMATICS,
  s1_sts: ALERT_S1_STS,
  s2_sts: ALERT_S2_STS,
  s3_sts: ALERT_S3_STS,
  hlt_sts: ALERT_HLT_STS,
  emg_sts: ALERT_EMG_STS,
}

export function zeroPadding(num, length) {
  return ('0000000000000000' + num).slice(-length)
}

export const getMessageForBattery = (key, i) => {
  // キーと数字もらったらbit変換してメッセージを返す
  if(ALERT_MESSAGES.hasOwnProperty(key)) {
    const int2 = Number(i).toString(2)
    if(int2 > 0) {
      const bit16 = zeroPadding(int2, 16)
      return bit16.
        split('').
        reverse().
        map((b, index) => {
          if(b === '1') return ALERT_MESSAGES[key][index]
        }).
        filter(b => !!b).
        join('<br/>')
    }
  }
  return '-'
}

export const getMessageForCharger = (key, i) => {
  switch (key) {
    case ALERT_TYPE_S1_STS:
      return ALERT_S1_STS.hasOwnProperty(i) ? ALERT_S1_STS[i] : '-'
    case ALERT_TYPE_S2_STS:
      return ALERT_S2_STS.hasOwnProperty(i) ? ALERT_TYPE_S2_STS[i] : '-'
    case ALERT_TYPE_S3_STS:
      return ALERT_S3_STS.hasOwnProperty(i) ? ALERT_S3_STS[i] : '-'
    case ALERT_TYPE_HLT_STS:
      return ALERT_HLT_STS.hasOwnProperty(i) ? ALERT_HLT_STS[i] : '-'
    case ALERT_TYPE_EMG_STS:
      return ALERT_EMG_STS.hasOwnProperty(i) ? ALERT_EMG_STS[i] : '-'
  }
}

export default {
  ALERT_TYPE_BATTERY,
  ALERT_TYPE_BATTERY_1_3,
  ALERT_TYPE_TELEMATICS,
  BATTERY,
  BATTERY_1_3,
  TELEMATICS,
  getMessageForBattery,
  getMessageForCharger,
}
