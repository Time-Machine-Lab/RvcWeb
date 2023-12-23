import { createVuetify } from 'vuetify'

import './vuetify.css'
const vuetify = createVuetify({
  theme:{
    themes:{
       light:{
          dark:false,
          colors:{
      //       primary:'#316ce8',
      //       accent:'#607df9',
      //       secondary:'#a73aeb',
      //       info:'#0164d3',
      //       warning:'#fec500',
            error:'#ff4d7e',
      //       success:'#2cdd9b',
          },
          variables:{}
       }
    }
  },
  display:{
    thresholds:{
        // "xs": 0,
        // "sm": 600, // min
        // "md": 960,
        // "lg": 1280,
        // "xl": 1920,
        // "xxl": 2560
    }
  }
})

export default vuetify