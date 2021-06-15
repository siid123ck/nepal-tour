const app = require('express');
const { getAllUsers, postUser, getSingleUser, updateUser, deleteUser } = require('../controllers/userController');
const router = app.Router();



router.route('/')
.get(getAllUsers)
.post(postUser);

router.route('/:user')
.get(getSingleUser)
.patch(updateUser)
.delete(deleteUser);

module.exports = router;