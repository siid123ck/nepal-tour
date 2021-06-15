const fs = require("fs");

// Asynchronous writing
fs.appendFile('appendAsync.txt', 'append asynchronous text', function (err) {
   if (err) {
      return console.error(err);
   }
   console.log("Asynchronous append success ");
});

// Synchronous writing
fs.writeFileSync('appendSync.txt', 'append synchronous text');
console.log("Synchronous append");

