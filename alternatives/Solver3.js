'use strict';

module.exports = class Solver {
	constructor(width, height) {
		this.length = width * height;
		this.visited = new Array(this.length);
		this.warp = new Map;
	}
	addWarp(start, end, isReverse) {
		if (isReverse)
			[start, end] = [end, start];
		this.warp.set(+start, +end);
	}
	solve() {
		for (let current = [0], next = [], depth = 1; current.length; ++depth) {
			for (let node; (node = current.pop()) !== undefined;) {
				for (let i = node, l = Math.min(this.length, i + 6); i++ < l;) {
					const child = this.warp.get(i) || i;
					if (child === this.length)
						return depth;
					if (this.visited[child])
						continue;
					next.push(child);
					this.visited[child] = true;
				}
			}
			[current, next] = [next, current];
		}
		return -1;
	}
}