export async function getData(){
    //const response = await fetch('https://corona.lmao.ninja/countries')
    const response = await fetch('https://api.covid19api.com/all')
    const statusValue = 'confirmed'
    const countryValue = 'peru'
    //const response = await fetch(`https://api.covid19api.com/dayone/country/${countryValue}/status/${statusValue}`)
    const data = await response.json()
    console.log(data)
    return data
}

export function sortByDate(data){
    return import('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.15/lodash.min.js')
    .then(() => {
        const recovered = _.sortBy(Object.values(data.recovered), ['date'])
        const deaths = _.sortBy(Object.values(data.deaths), ['date'])
        const confirmed = _.sortBy(Object.values(data.confirmed), ['date'])
        return{
            recovered,
            deaths,
            confirmed,
        }
    })
}

export async function getTotalCasesByDate() {
    const data = await getData()
    const dataByDate = {
      confirmed: {},
      recovered: {},
      deaths: {},
    }
    data.forEach((item) => {
        try {
          const cases = (dataByDate[item.Status][item.Date]) ? dataByDate[item.Status][item.Date].cases + item.Cases : item.Cases
          dataByDate[item.Status][item.Date] = {
            cases,
            date: `${item.Date}`,
          }
        } catch {
        }
      })
      return await sortByDate(dataByDate)
    }