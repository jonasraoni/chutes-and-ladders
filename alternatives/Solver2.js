'use strict';

module.exports = class Solver {
    constructor(width, height) {
        this.length = width * height + 1;
        this.visited = new Array(this.length);
        this.warp = new Map;
    }
    addWarp(start, end, isReverse) {
        if (isReverse)
            [start, end] = [end, start];
        this.warp.set(+start, +end);
    }
    solve() {
        const queue = [[0, 0]];
        do {
            const [node, depth] = queue.pop();
            if (node === this.length - 1)
                return depth;
            for (let i = node, l = Math.min(this.length, i + 7); ++i < l;) {
                const child = this.warp.get(i) || i;
                if (this.visited[child])
                    continue;
                queue.unshift([child, depth + 1]);
                this.visited[child] = true;
            }
        }
        while (queue.length);
        return -1;
    }
}