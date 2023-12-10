function A(cb) {
  setTimeout(() => {
    console.log("function A");
    cb();
  }, 0);
}

function B(cb) {
  setTimeout(() => {
    console.log("function B");
    cb();
  }, 10000);
}

function C() {
  setTimeout(() => {
    console.log("function C");
  }, 5000);
}

function main() {
    A(()=>{
        B(C);
    })
}

main();
