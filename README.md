# Chutes and Ladders 
View the whole [problem statement](chutes-and-ladders.md).

# Running
> Tested in Node 10.9.0

```node chutes-and-ladders.js < chutes_and_ladders.txt```

# Approach
- I started out by writing all the information I had on a paper
- Played the game available in the photo and reasoned a bit about the problems (the biggest ladder is not always the best option, impossible paths, N possible perfect solutions, ...)
- Built the interface, the code to check the first test case (as it represents the provided photo it was a free cookie) and to read the input file
- Got back to reasoning and decided there's no perfect solution without trying different combinations. Recursion, dynamic programming came to my mind... But the game is made of paths, which reminded me of graphs
- I considered Dijkstra (due to the well defined lengths), but as there's a dice limiting the movements, I thought it would be easier to consider each position as a node...

# Implementations
### [Solver1.js](alternatives/Solver1.js)
The was my first atempt, I researched on Wikipedia and found a simple algorithm (breadth first search) that fit greatly, I got the implementation from there in Python and adapted to my case, it was executing in ~600msec

### [Solver2.js](alternatives/Solver3.js)
I brushed the code a bit and got it to down to ~340msec

### [Solver3.js](alternatives/Solver3.js)
I modified how the algorithm works by transforming the long queue into a kind of consumer/producer, it reduced the time to ~240msec

### Final [Solver.js](Solver.js)
In my last try, I removed unnecessary reevaluations by adding just the last empty square to the queue, joined the ladders/chutes together with the visit status into a single array and also added some comments to the code, the time went down to 180msec.
I still got some ideas to try out, but it will stay for another day :)