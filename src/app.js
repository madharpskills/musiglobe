const express = require('express')
const path = require('path')
const { getSongData } = require('./utils/displayMusicData')

const app = express()
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/country', (req, res) => {
    let data = getSongData(req.query.code)
    res.send({ topSong: data })
})

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`)
}) 