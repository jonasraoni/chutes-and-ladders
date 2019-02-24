'use strict';

module.exports = class Solver {
	constructor(width, height) {
		this.board = new Array(width * height + 1);
	}
	addWarp(start, end, isReverse) {
		if (isReverse)
			[start, end] = [end, start];
		this.board[+start] = +end;
	}
	solve() {
		let
			queue = [0],
			visited = new Set,
			path = new Map;
		path.set(0, null);
		do {
			let current = queue.pop();
			if (current === this.board.length - 1) {
				for (var i = 0; (current = path.get(current)) !== null && current !== undefined; ++i);
				return i;
			}
			for (let i = current, l = Math.min(this.board.length, i + 7); ++i < l;) {
				const child = this.board[i] || i;
				if (!visited.has(child) && child != current && !~queue.indexOf(child)) {
					path.set(child, current);
					queue.unshift(child);
				}
			}
			visited.add(current);
		}
		while (queue.length);
		return -1;
	}
}