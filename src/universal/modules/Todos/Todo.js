/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only.  Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import React from 'react';
import Relay from 'react-relay';
import classnames from 'classnames';

import ChangeTodoStatusMutation from './mutations/ChangeTodoStatusMutation';
import RemoveTodoMutation from './mutations/RemoveTodoMutation';
import RenameTodoMutation from './mutations/RenameTodoMutation';
import TodoTextInput from './TodoTextInput';

class Todo extends React.Component {
  static contextTypes = {
    relay: Relay.PropTypes.Environment
  };
  state = {
    isEditing: false
  };
  setEditMode = (shouldEdit) => {
    this.setState({isEditing: shouldEdit});
  };
  removeTodo() {
    this.context.relay.commitUpdate(
      new RemoveTodoMutation({todo: this.props.todo, viewer: this.props.viewer})
    );
  }
  handleTextInputSave = (text) => {
    this.setEditMode(false);
    this.context.relay.commitUpdate(
      new RenameTodoMutation({todo: this.props.todo, text})
    );
  };
  handleTextInputDelete = () => {
    this.setEditMode(false);
    this.removeTodo();
  };
  handleTextInputCancel = () => {
    this.setEditMode(false);
  };
  handleLabelDoubleClick = () => {
    this.setEditMode(true);
  };
  handleDestroyClick = () => {
    this.removeTodo();
  };
  handleCompleteChange = (e) => {
    const complete = e.target.checked;
    this.context.relay.commitUpdate(
      new ChangeTodoStatusMutation({
        complete,
        todo: this.props.todo,
        viewer: this.props.viewer
      })
    );
  };
  renderTextInput() {
    return (
      <TodoTextInput
        className="edit"
        commitOnBlur
        initialValue={this.props.todo.text}
        onCancel={this.handleTextInputCancel}
        onDelete={this.handleTextInputDelete}
        onSave={this.handleTextInputSave}
      />
    );
  }
  render() {
    return (
      <li
        className={classnames({
          completed: this.props.todo.complete,
          editing: this.state.isEditing
        })}
      >
        <div className="view">
          <input
            checked={this.props.todo.complete}
            className="toggle"
            onChange={this.handleCompleteChange}
            type="checkbox"
          />
          <label onDoubleClick={this.handleLabelDoubleClick}>
            {this.props.todo.text}
          </label>
          <button
            className="destroy"
            onClick={this.handleDestroyClick}
          />
        </div>
        {this.state.isEditing && this.renderTextInput()}
      </li>
    );
  }
}

Todo.propTypes = {
  viewer: React.PropTypes.object.isRequired,
  todo: React.PropTypes.object.isRequired
};

export default Relay.createContainer(Todo, {
  fragments: {
    todo: () => Relay.QL`
      fragment on Todo {
        complete,
        id,
        text,
        ${ChangeTodoStatusMutation.getFragment('todo')},
        ${RemoveTodoMutation.getFragment('todo')},
        ${RenameTodoMutation.getFragment('todo')},
      }
    `,
    viewer: () => Relay.QL`
      fragment on User {
        ${ChangeTodoStatusMutation.getFragment('viewer')},
        ${RemoveTodoMutation.getFragment('viewer')},
      }
    `
  }
});
