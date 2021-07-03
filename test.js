const data = [
    {name:'siid', age:21, address:'sydney', legend:true},
    {name:'bisal', age:16, address:'Kathmandu', legend:true},
    {name:'Daate', age:22, address:'Chitwan', legend:false},
    {name:'susil', age:24, address:'Sasural', legend:true},
    {name:'Pini', age:21, address:'Malangwa', legend:false},
    {name:'Sameer', age:21, address:'Lalbandi', legend:false}
]
const myfunc = async ()=>{
    data.select()
    const result= await data;
    console.log('result', result)
   
}
let value = 'dskdf,dfifdi'
console.log(value.split(',').join(' '))