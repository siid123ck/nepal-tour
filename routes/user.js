const app = require('express');
const { protect } = require('../controllers/authController');
const { getAllUsers, getSingleUser, updateUser, deleteUser, updateMe, deleteMe } = require('../controllers/userController');
const router = app.Router();

// router.post('/signup', authController.signup)

router.route('/updateme').patch(protect, updateMe)
router.route('/deleteme').delete(protect, deleteMe)

router.route('/') 
.get(getAllUsers) 

router.route('/:user')
.get(getSingleUser) 
.patch(updateUser)
.delete(deleteUser);


module.exports = router;