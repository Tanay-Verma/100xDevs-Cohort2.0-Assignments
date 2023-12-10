let start = 0;
function counter() {
    console.log(++start);
  setTimeout(counter, 1000);
}

counter();
