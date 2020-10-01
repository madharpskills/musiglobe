const express = require('express')
const path = require('path')
const apicache = require('apicache')
const { getSongData, getArtistData, getSpotifyData } = require('./utils/displayMusicData')
const dotenv = require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000
const cache = apicache.middleware

app.use(express.static(path.join(__dirname, '../public')))
app.use(cache('1 minutes'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/global', async (req, res) => {
    console.log('getting global data')
    const data = await getSpotifyData('global')
    res.send({ globalData: data[1] })
})

app.get('/country', async (req, res) => {
    console.log(`getting data for ${req.query.code}`)
    let song = await getSongData(req.query.code)
    let artist = getArtistData(req.query.code)
    res.send({ topSong: song, topArtist: artist})
})

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`)
}) 