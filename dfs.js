// Depth First Search (DFS)
// A traversal algorithm
// Time complexity (V+E)

class node {
    constructor(index){
        this.n = [];     // neighbors
        this.v = false;  // visited
        this.i = index;  // index
    }
}

const n0 = new node(0);
const n1 = new node(1);
const n2 = new node(2);
const n3 = new node(3);
const n4 = new node(4);
const n5 = new node(5);
const n6 = new node(6);
const n7 = new node(7);
const n8 = new node(8);
const n9 = new node(9);
const n10 = new node(10);
const n11 = new node(11);
const n12 = new node(12);
const g = new node("s");   // Main Graph

// Adjacency list
n0.n  = [n1,n9];
n1.n  = [n0, n8];
n2.n  = [n3];
n3.n  = [n2,n4,n5,n7];
n4.n  = [n3];
n5.n  = [n3,n6];
n6.n  = [n7,n5];
n7.n  = [n8,n3,n6,n11,n10];
n8.n  = [n1,n7,n9];
n9.n  = [n0,n8];
n10.n = [n7,n11];
n11.n = [n10,n7];
n12.n = [];
g.n   = [n0, n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12];


function dfs(graph){
    for( node of graph.n){
        if(!node.v){
            node.v = true;
            console.log(graph.i + "->" + node.i);
            dfs(node);
        };
    };
}

dfs(g);