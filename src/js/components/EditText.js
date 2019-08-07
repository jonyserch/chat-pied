import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button as Boton, Input } from 'reactstrap';
import { updateMessage } from '../actions/index';
import { Button, Icon, Toolbar } from '../assets/components';

const emojis = [
  '😃',
  '😬',
  '😂',
  '😅',
  '😆',
  '😍',
  '😱',
  '👋',
  '👏',
  '👍',
  '🙌',
  '👌',
  '🙏',
  '👻',
  '🍔',
  '🍑',
  '🔑',
];

class EditText extends Component {
  constructor() {
    super();
    this.state = {
      valor: '',
      user: '',
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleInputUser = this.handleInputUser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onClickEmoji = (e, code) => {
    e.preventDefault();

    this.setState({
      valor: this.state.valor + code,
    });
  };
  handleInput(e) {
    const { value } = e.target;
    this.setState({
      valor: value,
    });
  }
  handleInputUser(e) {
    const { value } = e.target;
    this.setState({
      user: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const hours = new Date().getHours();
    const min = new Date().getMinutes();
    const sec = new Date().getSeconds();
    const date = ` ${day}/${month}/${year}-${hours}:${min}:${sec}`;

    this.props.updateMessage(
      {
        owner: this.state.user,
        create_date: date,
        update_date: '',
        excludedViewers: [],
        body: {
          object: 'value',
          document: {
            object: 'document',
            nodes: [
              {
                object: 'block',
                type: 'paragraph',
                nodes: [
                  {
                    object: 'text',
                    text: this.state.valor,
                  },
                ],
              },
            ],
          },
        },
      },
      this.props.messages.chat_identifier,
    );
    this.setState({
      valor: '',
    });
  }

  render() {
    return (
      <div className="edit-text">
        <Toolbar>
          {emojis.map(emoji => (
            <Button onMouseDown={e => this.onClickEmoji(e, emoji)} key={emoji}>
              <Icon>{emoji}</Icon>
            </Button>
          ))}
        </Toolbar>
        <form onSubmit={this.handleSubmit}>
          <Input
            placeholder="Escribe algo"
            type="text"
            name="Buscar"
            onChange={this.handleInput}
            value={this.state.valor}
          />

          <Boton
            size="lg"
            block
            color="primary"
            type="submit"
            value="Enviar"
            outline
          >
            Enviar
          </Boton>
        </form>

        <Input
          placeholder="Nombre del usuario"
          type="text"
          name="Buscar"
          onChange={this.handleInputUser}
          value={this.state.user}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
  };
}

const mapDispatchToProps = {
  updateMessage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditText);
