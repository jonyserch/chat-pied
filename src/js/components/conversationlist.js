import React, { Component } from 'react';
import { Button, ListGroup, Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import { getConversation, getMessage } from '../actions/index';

class ConversationList extends Component {
  constructor() {
    super();
    this.state = {
      conversations: {},
      isLoaded: false,
      user: 'jony',
    };
    this.handleSelect = this.handleSelect.bind(this);
  }
  componentDidMount() {
    this.props.getConversation('jony');
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.conversation !== this.state.conversations) {
      this.setState({
        conversations: nextProps.conversation,
        isLoaded: true,
      });
    }
  }
  handleSelect(event) {
    const value = event.target.value;
    this.props.getMessage(value);
  }
  render() {
    const conversation = this.state.conversations;
    if (!this.state.isLoaded) {
      return (
        <div>
          <Spinner color="secondary" />
        </div>
      );
    }
    return (
      <div>
        <ListGroup>
          {conversation.map(msj => (
            <Button
              key={msj.chat_identifier}
              color="secondary"
              outline
              size="sm"
              value={msj.chat_identifier}
              onClick={this.handleSelect}
            >
              {msj.users[1]}{' '}
            </Button>
          ))}
        </ListGroup>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    conversation: state.conversation,
  };
}
const mapDispatchToProps = {
  getMessage,
  getConversation,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConversationList);
