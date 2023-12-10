/*
 * Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Print out the time it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */

function waitOneSecond() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(console.log("Wait One Second"));
    }, 1000);
  });
}

function waitTwoSecond() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(console.log("Wait Two Second"));
    }, 2000);
  });
}

function waitThreeSecond() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(console.log("Wait Three Second"));
    }, 3000);
  });
}

function calculateTime() {
  const start = new Date();
  waitOneSecond()
    .then(waitTwoSecond)
    .then(waitThreeSecond)
    .then(() => {
      const end = new Date();
      console.log(`Completion time: ${(end - start) / 1000} seconds`);
    });
  console.log("This is after promise chaining");
}

calculateTime();
