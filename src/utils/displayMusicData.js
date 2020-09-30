const lastfmCountryData = require('../countries/dataByCountry.json')
const csv = require('csvtojson')
const request = require('request')

const getSongData = async (code) => {
    let spotifyData = await getSpotifyData(code)
    let data = 'This country doesn\'t listen to music'

    if (lastfmCountryData[code]) {
        data = `${lastfmCountryData[code].song.title}, by ${lastfmCountryData[code].song.artist}`
    } 
    
    if (spotifyData[1].field1) {
        data = `${spotifyData[1].field2}, by ${spotifyData[1].field3}`
    }

    return data
}

const getArtistData = (code) => {
    let countryData = lastfmCountryData[code]
    return (countryData && countryData.artist) || 'This country hates the arts'
}

const getSpotifyData = async (code) => {
    code = code.toLowerCase()
    return csv()
        .fromStream(request.get(`https://spotifycharts.com/regional/${code}/daily/latest/download`))
        .subscribe((json) => {
            return new Promise((resolve, reject) => {
                resolve(json)
            })
        }, (error) => console.err(error), () => {})
}

module.exports = {
    getSongData,
    getArtistData,
    getSpotifyData
}