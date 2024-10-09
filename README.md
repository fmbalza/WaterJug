# Water Jug Challenge

## Project Description

The Water Jug Challenge is a classic problem in computational thinking and algorithm design. The goal is to measure a specific amount of water using two jugs of different capacities. This project implements a solution to this challenge, allowing users to input the capacities of the jugs and the desired amount of water they wish to measure.

## How the Game Works

In the Water Jug Challenge, you have two jugs with different capacities (let's call them Jug X and Jug Y) and you want to measure a specific amount of water (let's call it Z). You can perform the following operations:

1. Fill either jug completely.
2. Empty either jug.
3. Pour water from one jug to the other until one jug is either full or the other is empty.

The challenge is to find a sequence of these operations that results in one jug containing exactly Z units of water.

## Technologies Used

- **React**: The main library used to build the user interface.
- **JavaScript**: The programming language used to implement the logic.
#### Explanation of Logic

1. **Visited States**: A Set is used to keep track of the states that have already been explored to prevent cycles.
2. **Queue for BFS**: A queue is initialized with the starting state (0, 0) representing both jugs being empty.
3. **Breadth-First Search (BFS)**: The algorithm uses BFS to explore all possible states (combinations of water levels in both jugs).
   - For each state, it checks if either jug contains the desired amount of water (`z`). If found, it returns the steps taken to reach that solution.
   - It defines all possible actions (fill, empty, transfer) and generates new states accordingly.
   - Each new state is checked against the visited states to avoid redundant processing.
4. **Return Value**: If no solution is reached after exploring all possibilities, the function returns an empty array.

## Installation

To install and run the project on your local machine, follow these steps:

1. Clone the repository:
git clone https://github.com/your_username/WaterJugChallenge.git

2. Navigate to the project directory:
   cd ./waterjug
3. Install the dependencies:
npm i
4.  Start the project:
   npm run dev



