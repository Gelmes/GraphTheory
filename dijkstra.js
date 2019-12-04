

class MinQueue{
    constructor(compareFunction){
        this.itable = [];               // Index table
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

class edge{
    constructor(source, destination, cost){
        this.source = source;  // Node
        this.destination = destination;  // Node
        this.cost = cost;     // Cost
    }
}

class node {
    constructor(index){
        this.edges = [];        // edges
        this.index = index;     // index
    }
}

class nodeDj extends node{
    constructor(index){
        super(index);
        this.visited = false;
        this.costTo = -1;       // -1 will be treated as +Infinity
        this.prev = null;       // Previous node of shortest path up to this node
    }
}

// Compares edges to determine witch one has a smaller cost
function compareEdges(a,b){
    if(a != null && b != null){
        if(b.costTo == -1){
            return true;
        } else if(a.costTo == -1){
            return false;
        } else{
            return a.costTo > b.costTo;
        }
    } else {
        return false;
    }
}

let n0 = new nodeDj(0);
let n1 = new nodeDj(1);
let n2 = new nodeDj(2);
let n3 = new nodeDj(3);
let n4 = new nodeDj(4);

let e0to1 = new edge(n0,n1,4);
let e0to2 = new edge(n0,n2,1);
let e1to3 = new edge(n1,n3,1);
let e2to1 = new edge(n2,n1,2);
let e2to3 = new edge(n2,n3,5);
let e3to4 = new edge(n3,n4,3);

n0.edges = [e0to1, e0to2];
n1.edges = [e1to3];
n2.edges = [e2to1, e2to3];
n3.edges = [e3to4];

let queue = new MinQueue(compareEdges);

queue.add(n0); // add the start node
n0.costTo = 0; // Cost to visit the first node is zero

function dijkstra(){
    // Visit all edges and update all nodes with the shortest path to that node
    
    let node = queue.poll();
    while(node != null){
        for(let i = 0; i < node.edges.length; i++){
            let edge = node.edges[i];
            let childNode = edge.destination;
            let costToChild= (node.costTo + edge.cost);
            if((childNode.costTo == -1) || (childNode.costTo > costToChild)){
                    childNode.costTo = costToChild;
                    childNode.prev   = node;
            }
            queue.add(childNode);
            console.log("Node: ", childNode.index, childNode.costTo);
        }
        
        node = queue.poll();
    }

    // Render shortest path (we will work backwards to get the shortest path)
    let shortestPath = [];
    let prevNode = n4; // End node
    while(prevNode != null){ // While we have not reached the start node
        shortestPath.push(prevNode);
        prevNode = prevNode.prev;
    }
    shortestPath.reverse();
    return shortestPath;
}


console.log("==========================");
console.log("Traversing through graph");
let shortestPath = dijkstra();

// Get ready to print the shortest distances
var nodeList = [n0, n1, n2, n3];
console.log("==========================");
console.log("Shortest distances to node");
for(let i = 0; i < nodeList.length; i++){
    console.log("Node ", i, ":", nodeList[i].costTo );
}
console.log("==========================");
console.log("Shortest path");
let strResult = "";
for(let i = 0; i < shortestPath.length; i++){
    strResult += " -> " + shortestPath[i].index;
}
console.log(strResult);
