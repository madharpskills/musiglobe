const express = require('express')
const path = require('path')
const apicache = require('apicache')
const { getSongData, getArtistData, getSpotifyData } = require('./utils/displayMusicData')
const { getMusixmatchLyrics } = require('./utils/musixmatch')
const dotenv = require('dotenv').config()

const getDataByCountry = require('./scripts/getDataByCountry.script')

const app = express()
const port = process.env.PORT || 3000
const cache = apicache.middleware

app.use(express.static(path.join(__dirname, '../public')))

const onlyStatus200 = (req, res) => res.statusCode === 200
app.use(cache('1 minutes', onlyStatus200))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/global', async (req, res) => {
    const data = await getSpotifyData('global')
    const lyrics = await getMusixmatchLyrics(data[1].field2, data[1].field3)
    res.send({ globalData: data[1], lyrics })
})

app.get('/country', async (req, res) => {
    try {
        let song = await getSongData(req.query.code)
        let artist = getArtistData(req.query.code)
        let lyrics = await getMusixmatchLyrics(song.title, song.artist)
        res.send({ topSong: song, topArtist: artist, lyrics })
    }
    catch(e) {
        console.log(e)
        res.status(500).send()
    }
})

app.listen(port, () => {
    console.log(`Listening to requests on port ${port}`)
}) 