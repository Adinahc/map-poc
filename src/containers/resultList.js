import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

class ResultList extends Component {
  renderListItem(agent) {
    var className = this.props.selectLocation === agent.LocationAddress ? 'resultItem selected' : 'resultItem';   
    return (
      <div key={agent.LocationAddress} className={className}>
        {agent.LocationName}<br />
        {agent.LocationAddress}<br />
        {agent.LocationCity}, {agent.LocationState}
      </div>
    );
  }

  renderList() {
    return _.map(this.props.agents, this.renderListItem.bind(this));
  }

  render() {
    return (
        <div className="resultList">
            {this.renderList()}
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    agents: state.results,
    selectLocation: state.selectLocation
  };
}

export default connect(mapStateToProps)(ResultList);
