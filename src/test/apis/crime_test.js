const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../index.js');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Crime Endpoint', () => {
    it('should list crimes in a 1 month range', async () => {
        chai.request(server)
        .get('/crime')
        .query({
            border: {
                topRight: {
                    latitude: 39.299236,
                    longitude:-76.609383,
                },
                bottomLeft: {
                    latitude: 39.099236,
                    longitude:-76.409383,
                }
            },
            startDate: '2017-05-01',
            endDate: '2017-06-01',
        })
        .end((err, res) => {
            console.log(res);
            res.incidents.should.be.an('array');
            expect(res.incidents[0]).to.have.all.keys('agency', 'agency_type', 'crimes');
            expect(res.incidents[0].crimes).to.be.an('array');
            expect(res.incidents[0].crimes[0]).to.have.all.keys('id', 'caseNumber', 'categorization', 'city',
                'incidentAddress', 'incidentDescription', 'location', 'primaryType', 'timestamp');
            done();
        });
    });
});
