const Config = require('../models/Config')
function calculateWaitingCharges(waitingRate, waitingTimeInitial, waitingTime) {
    if (waitingTime <= waitingTimeInitial) {
      // No additional charges before the initial waiting time
      return 0;
    } else {
      // Calculate additional charges for time after the initial waiting time
      const additionalWaitingTime = waitingTime - waitingTimeInitial;
      const charge = additionalWaitingTime * waitingRate;
      return charge;
    }
  }
  function calculateTMFCharges(realtime,timebarries,initialmultiplier,lastmultiplier) {
    if (realtime <= timebarries) {
      return realtime*initialmultiplier;
    } else {
      return timebarries*initialmultiplier+(realtime-timebarries)*lastmultiplier
    }
  }
  function findDap(distance,DNBDistance,DAPR,DAPK) {
    if (distance <= DNBDistance+DAPK) {
      return 0;
    } else {
      return (distance-DNBDistance-DAPK)*DAPR;
    }
  }  
const calculatePrice=(data,config)=>{
    const { distance, waitingTime, totalTime,day }=data
    const {
        DAPR,DAPK,
        TMFUT,TMFUM,TMFAM,
        WCRS,WCT,WCIT
      }=config
    const waitingcharge=  calculateWaitingCharges(WCRS/WCT,waitingTime-0,WCIT-0);
    const realtime=totalTime-waitingTime;
    const TMFcharges= calculateTMFCharges(realtime-0,TMFUT-0,TMFUM-0,TMFAM-0);
    const DNBPrice=config[`distanceBasePrice${day}P`]-0
    const DNBDistance=config[`distanceBasePrice${day}D`]-0
    const DAPPrice=findDap(distance-0,DNBDistance-0,DAPR-0,DAPK-0)
    console.log( waitingcharge,TMFcharges,DNBPrice,DAPPrice)
  return waitingcharge+TMFcharges+DNBPrice+DAPPrice
}
const authentication = {
    calculate: async (req, res) => {
        try {
            const { data, mycredentials } = req.body
            let config = await Config.findOne({ email: mycredentials.email });
            if (!config) {
                config = await Config.findOne({ email: "deafult@default.com" });
            }
           // console.log(config)
            const price=calculatePrice(data,config)
            return res.send({ "status": "done", "price": price });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },

    config: async (req, res) => {
        try {
            //console.log(req.body)
            const { config, mycredentials } = req.body
            const existingConfig = await Config.findOne({ email: mycredentials.email });

            if (existingConfig) {
                // Update the existing record
                existingConfig.set(config);
                await existingConfig.save();
                console.log('Config updated successfully');
            } else {
                // Create a new record
                const data = {
                    ...config,
                    email: mycredentials.email
                };
                const myconfig = await Config.create(data);
                console.log('Config created successfully');
            }

            return res.send({ "status": "done" });

        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },
};

module.exports = authentication;
