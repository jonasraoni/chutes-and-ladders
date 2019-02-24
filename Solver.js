'use strict';

module.exports = class Solver {
	constructor(width, height) {
		this.length = width * height;
		this.board = new Array(this.length);
	}
	addWarp(start, end, isReverse) {
		if (isReverse)
			[start, end] = [end, start];
		this.board[+start] = +end;
	}
	solve() {
		//current = the nodes in the current depth of the graph
		//next = the nodes that must be checked for the next depth of the graph
		//depth = the current depth 
		for (let current = [0], next = [], depth = 1; current.length; ++depth) {
			for (let node; (node = current.pop()) !== undefined;) {
				//will point to the last empty square on the current depth, the others don't need to be reevaluated
				let lastEmptySquare = 0;
				//evaluates the next squares under reach 
				for (let i = node, l = Math.min(this.length, i + 6); i++ < l;) {
					//checks if it has a warp and follows it
					const child = this.board[i] || i;
					//if the end was reached, returns the depth
					if (child === this.length)
						return depth;
					//if the square was already visited (-1), skip it
					if (!~child)
						continue;
					//only squares with warps + the last empty square should be evaluated for the next depth 
					if(child !== i)
						next.push(child);
					else
						lastEmptySquare = Math.max(child, lastEmptySquare);
					//mark it as visited
					this.board[i] = -1;
				}
				//if there's at least one empty square, adds it to the next depth
				if(lastEmptySquare)
					next.push(lastEmptySquare);
			}
			//consumer/producer exchange
			[current, next] = [next, current];
		}
		return -1;
	}
}