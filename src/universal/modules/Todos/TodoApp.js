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

import React, {PropTypes, Component} from 'react';
import Relay from 'react-relay';

import AddTodoMutation from './mutations/AddTodoMutation';
import TodoListFooter from './TodoListFooter';
import TodoTextInput from './TodoTextInput';

class TodoApp extends Component {
  static contextTypes = {
    relay: Relay.PropTypes.Environment
  }

  handleTextInputSave = (text) => {
    this.context.relay.commitUpdate(
      new AddTodoMutation({text, viewer: this.props.viewer})
    );
  };
  render() {
    const hasTodos = this.props.viewer.totalCount > 0;
    return (
      <div>
        <section className="todoapp">
          <header className="header">
            <h1>
              todos
            </h1>
            <TodoTextInput
              autoFocus
              className="new-todo"
              onSave={this.handleTextInputSave}
              placeholder="What needs to be done?"
            />
          </header>

          {this.props.children}

          {hasTodos &&
            <TodoListFooter
              todos={this.props.viewer.todos}
              viewer={this.props.viewer}
            />
          }
        </section>
        <footer className="info">
          <p>
            Double-click to edit a todo
          </p>
          <p>
            Created by the <a href="https://facebook.github.io/relay/">
              Relay team
            </a>
          </p>
          <p>
            Part of <a href="http://todomvc.com">TodoMVC</a>
          </p>
        </footer>
      </div>
    );
  }
}

TodoApp.propTypes = {
  viewer: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired
};

export default Relay.createContainer(TodoApp, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        totalCount,
        ${AddTodoMutation.getFragment('viewer')},
        ${TodoListFooter.getFragment('viewer')},
      }
    `
  }
});