const app = require('express'); 
const router = app.Router();

const viewController = require('../controllers/viewController')

//routes 
router.get('/', viewController.getOverview)

router.get('/tour/:slug', viewController.getTour);

module.exports = router;