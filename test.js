const parent = fun=> ()=>fun();

const child = x=> x+5;

console.log(parent(child('s')))