const User = require("../model/user");

const getAllUsers = async(req, res)=>{
  const users = await User.find()
        res.status(200).json({
            status:'sucess',
            result:users.length,
            users
        })
 }


const getSingleUser =  (req, res)=>{
  res.send('get single user')
};

const deleteUser =  (req, res)=>{
res.send('deleted ')
}

const updateUser = (req, res)=>{
    res.send('updated text ')
}


 module.exports= {getAllUsers, getSingleUser, updateUser, deleteUser};
