const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
    email: String,
    distanceBasePriceSunP: String,
    distanceBasePriceMonP: String,
    distanceBasePriceTueP: String,
    distanceBasePriceWedP: String,
    distanceBasePriceThuP: String,
    distanceBasePriceFriP: String,
    distanceBasePriceSatP: String,
    distanceBasePriceSunD: String,
    distanceBasePriceMonD: String,
    distanceBasePriceTueD: String,
    distanceBasePriceWedD: String,
    distanceBasePriceThuD: String,
    distanceBasePriceFriD: String,
    distanceBasePriceSatD: String,
    DAPR: String,
    DAPK: String,
    TMFUT: String,
    TMFUM: String,
    TMFAM: String,
    WCRS: String,
    WCT: String,
    WCIT: String
  
});

module.exports = mongoose.model('Config', configSchema);