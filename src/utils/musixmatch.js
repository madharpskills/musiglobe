const axios = require('axios')

let token

const getMusixmatchSearchQuery = async (track, artist) => {
    try {
        track = track.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ")

        const res = await axios.get(`http://api.musixmatch.com/ws/1.1/track.search?apikey=ef2f3f20d4b2e93e1da4d65e82be7a42&q_artist=${artist}&q_track=${track}`)
        if (res.data.message.body.track_list.length > 0) {
            return res.data.message.body.track_list[0].track.track_id
        } else {
            return ''
        }
    } catch (e) {
        console.error(e)
        throw e
    }
}

const getMusixmatchLyrics = async (track, artist) => {
    try {
        let res
        let id = await getMusixmatchSearchQuery(track, artist)

        if (id) {
            res = await axios.get(`http://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=ef2f3f20d4b2e93e1da4d65e82be7a42&track_id=${id}`)
        } else {
            return 'No lyrics found'
        }

        return res.data.message.body.lyrics.lyrics_body
    } catch (e) {
        console.error(e)
        throw e
    }

}

module.exports = {
    getMusixmatchLyrics
}