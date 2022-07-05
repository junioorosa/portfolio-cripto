const express = require('express');
const router = express.Router();
const controllers = require('../controllers/criptoControllers');
const methodOverride = require('method-override');

router.use(methodOverride('_method'))

router.get('/', controllers.home);
router.get('/dashboard/coin', express.json(), controllers.dashboard);

router.post('/historic', express.urlencoded({extended:true}), controllers.historic);
router.post('/save', express.urlencoded({extended:true}), controllers.saveInvestment);

router.delete('/', express.urlencoded({extended:true}), controllers.deleteCripto);

module.exports = router;