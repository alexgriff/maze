import React, { Component } from 'react';
import Cell from './Cell';
import { connect } from 'react-redux';

class Maze extends Component {
  render() {
    const cells = this.props.wallsList.map((cell, index) => {
      return (
        <Cell key={index} index={index} walls={this.props.wallsList[index]} />
      );
    });
    return <div className={`main maze ${this.props.mazeSize}`}>{cells}</div>;
  }
}

const mapStateToProps = state => ({
  mazeSize: state.maze.size
});

export default connect(mapStateToProps)(Maze);
