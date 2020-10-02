const countryList = require('../countries/countryList.js')
const { getTopTrack, getTopArtist } = require('../utils/lastfm')
const fs = require('fs')

const getCountryData = async () => {
    let countries = new Map()
    for (const el in countryList) {
        let value = {name: '', song: {title: '', artist: ''}, artist: ''}
        
        let name = countryList[el]
        value.name = name
        let topTrack = await getTopTrack(name)
        if (topTrack && topTrack.length > 0) {
            value.song = {title: topTrack[0].name, artist: topTrack[0].artist.name}
        }
        let topArtist = await getTopArtist(name)
        if (topArtist && topArtist.length > 0) {
            value.artist = topArtist[0].name
        }

        let index = el.toLowerCase()
        countries.set(index, value)
    }
    let countriesObj = convertMapToObj(countries)
    let countriesJson = JSON.stringify(countriesObj)

    fs.writeFile('./src/countries/dataByCountry.json', countriesJson, 'utf8', function (err) {
        if (err) {
            console.log("An error has occured writing JSON object to file.")
            return console.log(err)
        }
    
        console.log("JSON file has been saved.")
    })

    return countries
}

function convertMapToObj (map) {
    let obj = {}
    map.forEach(function (v, k) {
        obj[k] = v
    })
    return obj
}

const start = async function() {
    let countries = await getCountryData()
    // console.log(countries)
    console.log('done! ' + new Date())
}

start()

setInterval(start, 1000 * 60 * 60 * 24)