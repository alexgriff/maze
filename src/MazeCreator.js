import React, { Component } from 'react';
import Maze from './Maze';
import { connect } from 'react-redux';

class MazeCreator extends Component {
  generateCSSList = spanningTree => {
    const newWalls = [...new Array(spanningTree.length + 1)].map(
      node => 'top right bottom left'
    );

    spanningTree.forEach(edge => {
      const opposites = {
        bottom: 'top',
        right: 'left'
      };

      newWalls[edge.start] = newWalls[edge.start].replace(edge.type, '');
      newWalls[edge.end] = newWalls[edge.end].replace(opposites[edge.type], '');
    });
    return newWalls;
  };

  generateNodesList = data => {
    return data.reduce((accum, node) => {
      if (!accum[node.start]) {
        accum[node.start] = [];
      }
      accum[node.start].push(node.end);
      return accum;
    }, {});
  };

  render() {
    const { maze } = this.props;
    return (
      <Maze
        nodesList={this.generateNodesList(maze.tree)}
        wallsList={this.generateCSSList(maze.tree)}
      />
    );
  }
}

const mapStateToProps = state => ({
  maze: state.maze
});

export default connect(mapStateToProps)(MazeCreator);
