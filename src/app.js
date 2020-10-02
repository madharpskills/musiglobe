const express = require('express')
const path = require('path')
const apicache = require('apicache')
const { getSongData, getArtistData, getSpotifyData } = require('./utils/displayMusicData')
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
    res.send({ globalData: data[1] })
})

app.get('/country', async (req, res) => {
    try {
        let song = await getSongData(req.query.code)
        let artist = getArtistData(req.query.code)
        res.send({ topSong: song, topArtist: artist})
    }
    catch(e) {
        console.log(e)
        res.status(500).send()
    }
})

app.listen(port, () => {
    console.log(`Listening to requests on port ${port}`)
}) 