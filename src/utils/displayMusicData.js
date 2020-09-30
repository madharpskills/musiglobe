const countryData = require('./countries.json')
const csv = require('csvtojson')
const request = require('request')

const getSongData = (code) => {
    let data = `${countryData[code].song.title}, by ${countryData[code].song.artist}`
    // console.log(data)
    return data
}

const getArtistData = (code) => {
    let data = `${countryData[code].artist}`
    return data
}

const getGlobal = async () => {
    return csv()
    .fromStream(request.get('https://spotifycharts.com/regional/global/daily/latest/download'))
    .subscribe((json) => {
        return new Promise((resolve, reject) => {
            resolve(json)
        })
    }, (error) => console.err(error), () => {})
}

module.exports = {
    getSongData,
    getArtistData,
    getGlobal
}