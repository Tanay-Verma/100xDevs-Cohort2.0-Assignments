/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

function wait(n) {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve();
        },n);
    })
}
const res = wait(5000);
console.log(res);
res.then(()=>{console.log("resolved")})