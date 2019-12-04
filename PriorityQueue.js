// The Priority Queue
// A queue is a list that automatically rearanges the nodes so that they are
// sorted in priority.
//
// Runtime:
// 

// Index Table
// Left child index: 2i + 1
// Right child index: 2i + 2
// Parent: floor(i/2)

// Javascript has a sort function that can be adjusted to do the same
// thing as a priority queue

class MinQueue{
    constructor(compareFunction){
        this.itable = [1,2,3,4,5,6];               // Index table
        this.compare = compareFunction; // Compare function

    }

    add(val){
        this.itable[this.itable.length] = val;
        if(this.itable.length-1){
            this.bubbleUp(this.itable.length-1);
        }
    }

    bubbleUp(index){
        let parentIndex = Math.floor(index/2);
        let largeChild = this.compare(this.itable[parentIndex], this.itable[index]);
        if(largeChild){
            let temp = this.itable[index]; // temporary value
            this.itable[index] =  this.itable[parentIndex];
            this.itable[parentIndex] =  temp;
            this.bubbleUp(parentIndex);
        }
    }

    bubbleDown(index){
        
        let rightIsSmaller = this.compare(this.itable[2*index+1], this.itable[2*index+2]);
        if(rightIsSmaller){
            let right = this.compare(this.itable[index], this.itable[2*index+2]);
            if(right){
                let temp = this.itable[index]; // temporary value
                this.itable[index] = this.itable[2*index+2];
                this.itable[2*index+2] = temp;    
                index = 2*index+2;        
                this.bubbleDown(index);    
            }
        }
        else{
            let left = this.compare(this.itable[index], this.itable[2*index+1]);
            if(left){
                let temp = this.itable[index]; // temporary value
                this.itable[index] = this.itable[2*index+1];
                this.itable[2*index+1] = temp;
                index = 2*index+1;
                this.bubbleDown(index);

            }
        }
    }

    poll(){ // Removes the item at the top of the queue
        // swap top (first) item with leftmost child & remove the last element
        let temp = this.itable[0]; // temporary value
        this.itable[0] =  this.itable[this.itable.length - 1];
        this.itable[this.itable.length - 1] =  temp;
        let value = this.itable.pop(); // Return Value

        // Bubling steps
        let index = 0;
        this.bubbleDown(index);
        

        return value;
    }

    remove(val){
    }
}

class MaxQueue{
    constructor(compareFunction){
        this.itable = [1,2,3,4,5,6];               // Index table
        this.compare = compareFunction; // Compare function
        this.itable.sort(this.compare);
    }

    add(val){
        this.itable.push(val);
        this.itable.sort(this.compare);
    }

    poll(){
        this.itable.sort(this.compare);
        return this.itable.pop();
    }

    remove(val){
        let index = this.itable.indexOf(val);
        this.itable.splice(index, 1);
        this.itable.sort(this.compare);
    }
}


let countSorts = 0;
function compareMin(a,b){
    countSorts++;
    return a > b;
}

function compareMax(a,b){
    return a < b;
}


////////////////////////////////////////////////////////////////////////////////
console.log("MinQueue without sort");
let queue = new MinQueue(compareMin);
queue.itable = [1,2,3,4,5,6];
console.time('Timer');
console.log("Polled: ", queue.poll());
console.log("Polled: ", queue.poll());
console.log("Polled: ", queue.poll());
console.log("Polled: ", queue.poll());
console.log("Polled: ", queue.poll());
queue.add(7);
queue.add(3);
console.log("Polled: ", queue.poll());
queue.add(2);
queue.add(2);
console.log("Polled: ", queue.poll());
console.log("Polled: ", queue.poll());
console.log("Polled: ", queue.poll());
console.log("Polled: ", queue.poll());
console.timeEnd('Timer');

////////////////////////////////////////////////////////////////////////////////
console.log("MaxQueue using sort");
let queueMax = new MaxQueue(compareMin);
console.time('Timer');
console.log("Polled: ", queueMax.poll());
console.log("Polled: ", queueMax.poll());
console.log("Polled: ", queueMax.poll());
console.log("Polled: ", queueMax.poll());
console.log("Polled: ", queueMax.poll());
queueMax.add(7);
queueMax.add(3);
console.log("Polled: ", queueMax.poll());
queueMax.add(2);
queueMax.add(2);
console.log("Polled: ", queueMax.poll());
console.log("Polled: ", queueMax.poll());
console.log("Polled: ", queueMax.poll());
console.log("Polled: ", queueMax.poll());
console.timeEnd('Timer');


// Test with hundreds of items
let array = [];
for (let i = 1000; i > 0; i--){
    array.push(Math.floor(Math.random() * 100) + 1); // Number between 0 - 99;
}
array.sort(compareMin);
// console.log(array);

countSorts = 0;
console.time('Index table implementation');
queue.itable = array.slice(0);
let start = 1;
let counter = 0;
while(start){
    start = queue.poll();
    // counter++;
    // console.log(start);
}
console.timeEnd('Index table implementation');

console.log(countSorts);
countSorts = 0;

console.time('Sort implementation');
queueMax.itable = array.slice(0);
start = 1;
while(start){
    start = queueMax.poll();
    // counter++;
    // console.log(start);
}
console.timeEnd('Sort implementation');

console.log(countSorts);