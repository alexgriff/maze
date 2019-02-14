import React, { Component } from 'react';
import MazeCreator from './MazeCreator';
import { connect } from 'react-redux';
import * as actions from './actions';

class App extends Component {
  componentDidMount() {
    this.props.createNewMaze(this.props.selected);
  }

  handleCalculateRouteClick = () => {
    const { calculateRoute, origin, destination, maze } = this.props;
    calculateRoute(origin, destination, maze.tree);
  };

  handleGenerateClick = () => {
    this.props.createNewMaze(this.props.selected);
  };

  handleSelect = e => {
    const size = e.target.value;
    this.props.selectSize(size);
  };

  render() {
    const { selected, disabled } = this.props;
    return (
      <div className="App">
        <div className="main outer">
          <MazeCreator />

          <div className="field">
            <select
              value={selected}
              onChange={this.handleSelect}
              className="input"
            >
              <option value="small">small</option>
              <option value="medium">medium</option>
              <option value="large">large</option>
            </select>
            <input
              type="button"
              onClick={this.handleGenerateClick}
              className="input btn"
              value="Generate Maze"
            />
          </div>

          <div className="field">
            <select disabled={disabled} className="input">
              <option value="small">Dijkstra's algorithm</option>
              <option value="medium">A * Search</option>
            </select>
            <input
              disabled={disabled}
              onClick={this.handleCalculateRouteClick}
              type="button"
              className="input btn"
              value="Calculate Route"
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selected: state.sizeSelection,
  disabled: !(
    typeof state.cellSelection.origin === 'number' &&
    typeof state.cellSelection.destination === 'number'
  ),
  origin: state.cellSelection.origin,
  destination: state.cellSelection.destination,
  maze: state.maze
});
export default connect(mapStateToProps, actions)(App);
