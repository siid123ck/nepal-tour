const app = require('express');
const { getAllUsers, getSingleUser, updateUser, deleteUser } = require('../controllers/userController');
const router = app.Router();

// router.post('/signup', authController.signup)

router.route('/')
.get(getAllUsers)

router.route('/:user')
.get(getSingleUser)
.patch(updateUser)
.delete(deleteUser);

module.exports = router;