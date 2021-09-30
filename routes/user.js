const app = require('express');

const { protect, restrictTo } = require('../controllers/authController');
const { getAllUsers, getSingleUser, updateUser, deleteUser, updateMe, deleteMe, 
    getMe, uploadPhoto, resizedAfterUpload } = require('../controllers/userController');
const router = app.Router();

// router.post('/signup', authController.signup)

router.route('/') 
.get(getAllUsers) 

router.use(protect);

router.route('/me')
.get(getMe, getSingleUser)
.patch(uploadPhoto, resizedAfterUpload, updateMe)
.delete(deleteMe)

router.route('/:id')
.get(getSingleUser) 
.patch(restrictTo('user'), updateUser)
.delete(restrictTo('admin'), deleteUser);


module.exports = router;