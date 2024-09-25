/** @type {import('tailwindcss').Config} */
function generateSize(cssNames, sizeList, extraValues) {
  let obj = {}
  cssNames.forEach((cssName) => {
    obj[cssName] = {}
    sizeList.forEach((size) => {
      obj[cssName][size] = `${size}px`
    })
    if (extraValues) {
      for (let key in extraValues) {
        obj[cssName][key] = extraValues[key]
      }

    }
  })
  return obj
}
const generateScreens = () => {
  const responseSize = [500,640,768,800,820,920,1024,1080,1100,1280,1300,1320,1350,1440,1536,1920];
  const obj = {}
  responseSize.forEach(item => { 
    obj[`max${item}`] = { max: `${item}px` }
    // obj[`min${item}`] = { min: `${item}px` } 
  })
  return obj
  
}

export default {
  darkMode: ['class'],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      screens: generateScreens(),
      ...generateSize(
        ['padding', 'margin', 'fontSize'],
        new Array(100).fill('').map((value, idx) => idx + 5),
      ),
      ...generateSize(
        ['fontSize'],
        new Array(50).fill('').map((value, idx) => idx + 12),
      ),
      ...generateSize(
        ['maxWidth', 'minWidth', 'width'],
        [
          ...new Array(800).fill('').map((value, idx) => idx + 10),
          1200,
          1080,
          1300,
          1440,
          1680
        ]
      ),
      ...generateSize(
        ['maxHeight', 'minHeight', 'height'],
        [
          ...new Array(800).fill('').map((value, idx) => idx + 10),
        ],
        {
          'content': 'var(--layout-main-content-h)'
        }
      ),

      colors: {
        active: '#8dc215',
        brand: '#8dc215',
        activeBg: '#ECF4D9',
        common: 'rgba(0,0,0,.6)',
        t1color: 'rgba(0,0,0,0.9)',
        t2color: 'rgba(0,0,0,0.6)',
        t3color: 'rgba(0,0,0,0.4)',
        price: '#E76C43',
        '3d': '#3d3d3d',
        '99': '#999999',
        'grey-common': 'rgb(241, 243, 247)',
        warn: '#E37318',
      },
      fontFamily: {
        mst: 'Montserrat',
        'mst-sb': 'Montserrat-SemiBold',
        'mst-b': 'Montserrat-Bold',
      },
    },
  },
  plugins: []
}
