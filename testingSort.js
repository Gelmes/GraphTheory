
let counter = 0;
function compare(a,b){
    counter++;
    return a > b;
}

let array = [];
for (let i = 100; i > 0; i--){
    array.push(Math.floor(Math.random() * 100) + 1); // Number between 0 - 99;
}
array.sort(compare);
console.log(counter);

counter = 0;
array.push(1);
array.sort(compare);
console.log(counter);

counter = 0;
array.push(1);
array.sort(compare);
console.log(counter);

counter = 0;
array.push(1);
array.sort(compare);
console.log(counter);

counter = 0;
array.push(1);
array.sort(compare);
console.log(counter);
