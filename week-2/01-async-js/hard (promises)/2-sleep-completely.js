/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */

function sleep (seconds) {
    const start = new Date();
    while(Date.now() -start < seconds){

    }
    return new Promise((resolve) => {
        resolve()
    })
}

module.exports = sleep;
