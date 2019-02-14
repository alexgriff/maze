import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';

class Cell extends Component {
  render() {
    const {
      origin,
      destination,
      index,
      handleCellClick,
      walls,
      inPath,
      inQueue
    } = this.props;

    return (
      <span
        onClick={() => handleCellClick(index)}
        className={`cell
          ${walls}
          ${origin === index ? 'origin' : null}
          ${destination === index ? 'destination' : null}
          ${inQueue ? 'queue' : null}
          ${inPath ? 'path' : null}`}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  origin: state.cellSelection.origin,
  destination: state.cellSelection.destination,
  inPath: !!state.path.found[ownProps.index],
  inQueue:
    state.path.inQueue[ownProps.index] && !state.path.found[ownProps.index]
});

export default connect(mapStateToProps, actions)(Cell);
