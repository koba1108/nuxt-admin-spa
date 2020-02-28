export const charger = {
  id: {
    // 数字（インクリメント？）
    type: Number,
    required: true,
    value: 0,
  },
  name: {
    // AC001_SMART_DWK4
    type: String,
    required: true,
    value: '',
  },
  cs_id: {
    // cs10k00004
    type: String,
    required: true,
    value: '',
  },
  longitude: {
    // 77.057518
    type: Number,
    required: false,
    value: 0,
  },
  latitude: {
    // 28.552622
    type: Number,
    required: false,
    value: 0,
  },
  new(data) {
    Object.keys(charger).map(c => {
      console.log(c, charger[c])
    })
  },
}

export default {
  charger,
}
