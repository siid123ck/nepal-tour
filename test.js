db.persons.aggregate([
    {
        $group:{_id:"$company.location.country", avg:{$avg:"$age"}}
    }
])
db.persons.aggregate([
    {
        $project:{_id:0, name:1, genderType:{$type:"$gender"}, ageType:{$type:"$age"}}
    },
    {
        $out:"outCollection"
    }
])