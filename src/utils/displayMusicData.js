const countryData = require('./countries.json')

const getMusicData = (code) => {
    let data = `${countryData[code].song.title}, by ${countryData[code].song.artist}`
    // console.log(data)
    return data
}

module.exports = {
    getMusicData
}