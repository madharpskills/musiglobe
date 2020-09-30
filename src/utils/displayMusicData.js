const countryData = require('../countries/data-by-country.json')

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