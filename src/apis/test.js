const cr = require('./crimereports.js')

const startDate = new Date().toDateString()

const endDate = new Date().toDateString()

lat = 39.2904
lng = -76.6122
border= {
    topRight: {
        latitude: 39.2904,
        longitude: -76.6122
    },
    bottomLeft: {
        latitude: 39.0904,
        longitude: -76.1122
    }
}
cr.getIncidents(startDate, endDate, border)