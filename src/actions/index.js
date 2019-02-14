const SIZES = {
  small: 10,
  medium: 25,
  large: 50
};

export const selectSize = size => {
  return { type: 'SELECT_SIZE', size };
};

export const createNewMaze = size => {
  return {
    type: 'NEW_MAZE',
    size,
    tree: generateMaze(size)
  };
};

export const handleCellClick = index => {
  return { type: 'SELECT_CELL', index: index };
};

export const calculateRoute = (origin, destination, tree) => {
  return dispatch => {
    const solution = shortestPath(
      origin.toString(),
      destination.toString(),
      generateNodesList(tree),
      dispatch
    );
  };
};

// =======================
const generateMaze = size => {
  const dimension = SIZES[size];
  const edges = makeAllEdges(dimension);
  return makeTree(edges, dimension);
};

const makeAllEdges = numRows => {
  const edges = [];

  const calculateIndex = (x, y) => {
    return y * numRows + x;
  };

  const edge = (start, end, type) => {
    const priority = Math.floor(Math.random() * 100);

    return {
      start: start.toString(),
      end: end.toString(),
      priority,
      type
    };
  };

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numRows - 1; j++) {
      edges.push(
        edge(calculateIndex(i, j), calculateIndex(i, j + 1), 'bottom')
      );
      edges.push(edge(calculateIndex(j, i), calculateIndex(j + 1, i), 'right'));
    }
  }
  return edges.sort((a, b) => a.priority - b.priority);
};

const makeTree = (edges, dimension) => {
  const unionFindArray = size => {
    return [...new Array(size)].map((node, i) => i);
  };

  const find = (a, b, id) => {
    return root(a, id) === root(b, id);
  };

  const root = (i, id) => {
    while (i !== id[i]) {
      id[i] = id[id[i]];
      i = id[i];
    }
    return i;
  };

  const unite = (a, b, id, size) => {
    let i = root(a, id);
    let j = root(b, id);

    if (size[i] < size[j]) {
      id[i] = j;
      size[j] += size[i];
    } else {
      id[j] = i;
      size[i] += size[j];
    }
  };

  const id = unionFindArray(dimension * dimension);
  const size = id.map(node => 1);
  const spanningTree = [];

  if (dimension) {
    while (spanningTree.length !== dimension * dimension - 1) {
      const edge = edges.shift();

      if (!find(edge.start, edge.end, id)) {
        spanningTree.push(edge);
        unite(edge.start, edge.end, id, size);
      }
    }
  }

  return spanningTree;
};

// ============
const generateNodesList = data => {
  return data.reduce((accum, node) => {
    if (!accum[node.start]) accum[node.start] = [];
    if (!accum[node.end]) accum[node.end] = [];

    accum[node.start].push(node.end);
    accum[node.end].push(node.start);

    return accum;
  }, {});
};

const shortestPath = (orig, dest, graph, dispatch) => {
  const queue = [];
  const processed = {};
  let prev = orig;
  queue.push(orig);

  const interval = setInterval(() => {
    if (queue.length) {
      const current = queue.shift();
      dispatch({ type: 'FOUND_CELL', cell: current });
      processed[current] = prev;

      if (current === dest) {
        console.log(processed);
        clearInterval(interval);
        return;
      }

      graph[current].forEach(cell => {
        if (!processed[cell]) {
          dispatch({ type: 'CELL_IN_QUEUE', cell });
          queue.push(cell);
        }
      });
      prev = current;
    } else {
      clearInterval(interval);
    }
  }, 0);

  // return processed;
};
