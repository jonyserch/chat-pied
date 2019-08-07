import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMessage } from '../actions/index';
import MessageBody from './message-body';

export class Messages extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      isLoaded: false,
      user: 'jony',
    };
  }
  componentDidMount() {
    this.props.getMessage('3a3a3a3a3a');
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.messages !== this.state.messages) {
      this.setState({
        messages: nextProps.messages,
        isLoaded: true,
      });
    }
  }

  render() {
    const messages = this.state.messages;
    if (!this.state.isLoaded) {
      return <div>Loading...</div>;
    }
    return (
      <div className="message-list">
        {messages.messages.map(msj => (
          <MessageBody
            owner={msj.owner}
            user={this.state.user}
            chat_identifier={msj.chat_identifier}
            key={msj.create_date}
            body={msj.body}
            create_date={msj.create_date}
          />
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
  };
}
export default connect(
  mapStateToProps,
  { getMessage },
)(Messages);
