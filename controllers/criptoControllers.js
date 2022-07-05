const model = require('../models/model');
const config = require('../config/dataHandler')

const home = async (req, res, next) =>{
    try {
        res.render('home');
    }catch(error){
        res.send(error);
    }
};

const saveInvestment = async (req, res, next) =>{
    const newHistoricDoc = new model.Historic(req.body);
    try {
        await newHistoricDoc.save();
        let criptoHistoric = await model.Historic.findOne({_id: newHistoricDoc.id});
        let criptoMetric = await model.Metric.findOne({criptoName: criptoHistoric.criptoName});

        config.handle.newInvestiment(criptoHistoric, criptoMetric);
        let updateDoc = config.handle.updateDoc;
        let newDoc = config.handle.newDoc;

        if(Object.keys(updateDoc).length !== 0){
            await model.Metric.findByIdAndUpdate(updateDoc._id, updateDoc);
            config.handle.updateDoc = {};
        }

        if(Object.keys(newDoc).length !== 0){
            const newMetricDoc = new model.Metric(newDoc);
            await newMetricDoc.save();
            config.handle.newDoc = {};
        }

        res.redirect('/');
    }catch(error){
        res.send(error);
    }
};

const historic = async (req, res)=>{
    let docs = req.body.criptoName;
    try{
        let criptos = await model.Historic.find({criptoName: docs});
        res.render('historic', {criptos});
    }catch(error){
        res.send(error);
    }
}

const deleteCripto = async (req, res) =>{
    let docs = req.body;
    try {
        await model.Historic.findByIdAndDelete(docs.id);
        let criptos = await model.Historic.find({criptoName: docs.criptoName});
        res.render('historic', {criptos});
    }catch(error){
        res.status(404).send(error);
    }
};

const dashboard = async (req, res)=>{
    try {
        let docs = await model.Metric.find({});
        res.json(JSON.stringify(docs));

    }catch(error){
        res.send(error);
    }
}

module.exports = {home, saveInvestment, deleteCripto, historic, dashboard};