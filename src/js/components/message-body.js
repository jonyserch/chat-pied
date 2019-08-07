import React, { Component } from 'react';
import { Value } from 'slate';
import { css } from 'emotion';
import { Editor } from 'slate-react';
import { Card, Badge, CardHeader, CardBody } from 'reactstrap';

class MessageBody extends Component {
  onClickEmoji = (e, code) => {
    e.preventDefault();

    this.editor
      .insertInline({ type: 'emoji', data: { code } })
      .moveToStartOfNextText()
      .focus();
  };
  schema = {
    inlines: {
      emoji: {
        isVoid: true,
      },
    },
  };
  ref = editor => {
    this.editor = editor;
  };
  renderBlock = (props, editor, next) => {
    const { attributes, children, node } = props;

    switch (node.type) {
      case 'paragraph':
        return <p {...attributes}>{children}</p>;
      default:
        return next();
    }
  };
  renderInline = (props, editor, next) => {
    const { attributes, node, isFocused } = props;

    switch (node.type) {
      case 'emoji':
        return (
          <span
            {...attributes}
            contentEditable={false}
            onDrop={e => e.preventDefault()}
            className={css`
              outline: ${isFocused ? '2px solid blue' : 'none'};
            `}
          >
            {node.data.get('code')}
          </span>
        );
      default:
        return next();
    }
  };
  render() {
    return (
      <Card
        className={`${
          this.props.owner === this.props.user ? 'text-right ' : 'text-left'
        }  p-5 `}
      >
        <CardHeader>
          <Editor
            defaultValue={Value.fromJSON(this.props.body)}
            schema={this.schema}
            ref={this.ref}
            renderBlock={this.renderBlock}
            renderInline={this.renderInline}
            readOnly
          />
        </CardHeader>
        <CardBody>
          <Badge className="float-right" color="info">
            {this.props.create_date}
          </Badge>
        </CardBody>
      </Card>
    );
  }
}
export default MessageBody;
