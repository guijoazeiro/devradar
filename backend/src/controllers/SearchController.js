const Dev = require('../models/dev')
const parseStringAsArray = require('../utils/parseStringArray')

module.exports = {
    async index(request, response) {
        const { latitude, longitude, techs } = request.query

        const techsArray = parseStringAsArray(techs)

        console.log(techsArray)

        const devs = await Dev.find({
            techs: {
                $in: techsArray
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000
                }
            }
        })
        console.log(devs)
        response.json({ devs })
    }
}