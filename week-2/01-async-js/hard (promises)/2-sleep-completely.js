/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 */

function sleep (seconds) {
    const start = Date.now();
    const s = new Date();
    while(Date.now() -start < seconds*1000){

    }
    const e = new Date();
    console.log(`Busy wait complete for ${(e-s)/1000} seconds`)
}

sleep(2);