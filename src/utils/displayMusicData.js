const countryData = require('../countries/dataByCountry.json')

const getSongData = (code) => {
    let data = `${countryData[code].song.title}, by ${countryData[code].song.artist}`
    // console.log(data)
    return data
}

const getArtistData = (code) => {
    let data = `${countryData[code].artist}`
    return data
}

module.exports = {
    getSongData,
    getArtistData
}