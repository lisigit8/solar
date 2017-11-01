/**
 * Created by arun on 17/10/15.
 */
var config = {
    pstg: {
        http: {
            port: 5000
        },
        database: {
            solarpulse: {
                "live_DB": "solarpulse:solarpulse@aerorhythm.mpenv.com:30131/solarpulse"
            }
        },
        env: "cloud",
        minification: false
    }
};

module.exports = config;
