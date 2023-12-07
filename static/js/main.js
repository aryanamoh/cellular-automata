const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const resolution = 10;
    const rows = canvas.height / resolution;
    const cols = canvas.width / resolution;

    // Function to create a 2D array to represent the grid
    function createGrid() {
      return new Array(cols).fill(null)
        .map(() => new Array(rows).fill(null)
          .map(() => Math.floor(Math.random() * 2)));
    }

    // Function to draw the current state of the grid on the canvas
    function drawGrid(grid) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * resolution;
          const y = j * resolution;

          if (grid[i][j] === 1) {
            ctx.fillRect(x, y, resolution, resolution);
          }
        }
      }
    }

    // Function to update the grid based on the rules of the Game of Life
    function updateGrid(grid) {
      const newGrid = grid.map(row => [...row]);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const neighbors = countNeighbors(grid, i, j);
          const currentCell = grid[i][j];

          // Apply rules of the Game of Life
          if (currentCell === 1 && (neighbors < 2 || neighbors > 3)) {
            newGrid[i][j] = 0; // Cell dies
          } else if (currentCell === 0 && neighbors === 3) {
            newGrid[i][j] = 1; // Cell becomes alive
          }
        }
      }

      return newGrid;
    }

    // Function to count the number of live neighbors for a given cell
    function countNeighbors(grid, x, y) {
      let sum = 0;

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const col = (x + i + cols) % cols;
          const row = (y + j + rows) % rows;
          sum += grid[col][row];
        }
      }

      // Subtract the value of the current cell as it was added in the loop
      sum -= grid[x][y];
      return sum;
    }

    // Initialize the grid and start the animation loop
    let grid = createGrid();
    setInterval(() => {
      drawGrid(grid);
      grid = updateGrid(grid);
    }, 100); // Adjust the interval to control the speed of the simulation