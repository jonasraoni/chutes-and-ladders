'use strict';

const
	Solver = require('./Solver'),
	{createInterface: lines} = require('readline'),
	{PerformanceObserver: Observer, performance: marker} = require('perf_hooks');


const obs = new Observer((items) => {
	const item = items.getEntries()[0]; 
	console.log(item.name, '=', item.duration);
	marker.clearMarks();
});
let
	unsolvable = 0,
	rollsSum = 0,
	solver = null,
	warps = 0;

obs.observe({entryTypes: ['measure']});
marker.mark('Start');

lines(process.stdin).on('line', line => {
	if (!solver) {
		const [width, height, w] = line.split(' ');
		if (w > 0) {
			warps = w;
			solver = new Solver(width, height);
		}
	} 
	else {
		const [type, bottom, top] = line.split(' ');
		solver.addWarp(bottom, top, type === 'C');
		if (!--warps) {
			const rolls = solver.solve();
			solver = null;
			if (~rolls)
				rollsSum += rolls;
			else
				++unsolvable;
		}
	}
})
.on('close', () => {
	marker.mark('End');
	marker.measure('Time elapsed', 'Start', 'End');
	console.log(`Unsolvable boards = ${unsolvable}\nSum of rolls = ${rollsSum}`);
});