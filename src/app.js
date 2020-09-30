const express = require('express')
const path = require('path')
const { getSongData, getArtistData, getGlobal } = require('./utils/displayMusicData')

const app = express()
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/global', async (req, res) => {
    const data = await getGlobal()
    res.send({ globalData: data[1] })
})

app.get('/country', (req, res) => {
    let song = getSongData(req.query.code)
    let artist = getArtistData(req.query.code)
    res.send({ topSong: song, topArtist: artist})
})

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`)
}) 