const users = [{'name':'siid', 'result':'pass'}];

const getAllUsers = (req, res)=>{
        res.status(200).json({
            status:'sucess',
            result:users.length,
            data:{users}
        })
 }

 const postUser = (req, res)=>{
  res.send('posted')
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


 module.exports= {getAllUsers, postUser, getSingleUser, updateUser, deleteUser};
