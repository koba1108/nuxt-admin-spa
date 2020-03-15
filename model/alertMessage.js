export const ALERT_TYPE_BATTERY = 'battery'
export const ALERT_TYPE_BATTERY_1_3 = 'battery_1_3'
export const ALERT_TYPE_TELEMATICS = 'telematics'

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

export const ALERT_MESSAGES = {
  battery: BATTERY,
  battery_1_3: BATTERY_1_3,
  telematics: TELEMATICS,
}

export const getMessageFromInt = (key, i) => {
  // キーと数字もらったらbit変換してメッセージを返す
  if(ALERT_MESSAGES.hasOwnProperty(key)) {
    const int2 = Number(i).toString(2)
    if (int2 > 0) {
      const bit = int2.length
      return ALERT_MESSAGES[key][bit]
    }
  }
  return '-'
}

export default {
  ALERT_TYPE_BATTERY,
  ALERT_TYPE_BATTERY_1_3,
  ALERT_TYPE_TELEMATICS,
  BATTERY,
  BATTERY_1_3,
  TELEMATICS,
  getMessageFromInt,
}
