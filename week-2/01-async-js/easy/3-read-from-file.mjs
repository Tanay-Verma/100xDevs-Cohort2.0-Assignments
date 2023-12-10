import fs from "fs";

fs.readFile("./week-2/01-async-js/easy/3-read-from-file.md","utf-8",(err,data)=>{
    console.log("Error:",err);
    console.log("Data:",data);
});

for(let i=0; i<10000; i++){
    console.log(i);
}