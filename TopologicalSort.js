// Code base on https://www.youtube.com/watch?reload=9&v=eL-KzMXSXXI
//
// Topological ordering of a directed graph is a linear ordering of its
// vertices such that for every directed edge uv from vertex u to vertex v,
// u comes before v in the ordering.
//
// Top sort is an algorithm used to achieve this sorting. Top sort is not able
// to sort any list that has a cyclic dependency. In order words a Direct 
// Acyclic Graph (DAG).
//
// You can use Tarjan's strongly connected component algorithm to find cycles.
//
// With rooted trees you can created a topological sorting by simply starting
// from the leaf nodes.
//
// Use DFS then add it to the end of the sorted list


class node {
    constructor(index){
        this.c = [];
        this.v = 0;
        this.i = index;
    }
}

const a = new node("a");
const b = new node("b");
const c = new node("c");
const d = new node("d");
const e = new node("e");
const f = new node("f");
const g = new node("g");
const h = new node("h");
const i = new node("i");
const j = new node("j");
const k = new node("k");
const l = new node("l");
const m = new node("m");
const graph = new node("start");

// Adjacency list
a.c     = [d];
b.c     = [d];
c.c     = [a,b];
d.c     = [h,g];
e.c     = [a,d,f];
f.c     = [k,j];
g.c     = [i];
h.c     = [j,i];
i.c     = [l];
j.c     = [m,l];
k.c     = [j];
l.c     = [];
m.c     = [];
graph.c = [a,b,c,d,e,f,g,h,i,j,k,l,m];

// Topological sort is based on the DFS algorithm
var ordering = [];
function topologicalSort(graph){
    for( node of graph.c){
        if(!node.v){
            node.v = true;
            topologicalSort(node);
        };
    };
    ordering.push(graph);
}


topologicalSort(graph);
for (node of ordering){
    console.log(node.i);
}