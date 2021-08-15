const app = require('express');
const authController = require('../controllers/authController')
const { getAllUsers, getSingleUser, updateUser, deleteUser } = require('../controllers/userController');
const router = app.Router();

// router.post('/signup', authController.signup)

router.route('/')
.get(getAllUsers)

router.post('/signup', authController.signup)

router.route('/:user')
.get(getSingleUser)
.patch(updateUser)
.delete(deleteUser);

module.exports = router;