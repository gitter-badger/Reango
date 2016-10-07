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

const {PropTypes} = React;

const ENTER_KEY_CODE = 13;
const ESC_KEY_CODE = 27;

export default class TodoTextInput extends React.Component {
  static defaultProps = {
    commitOnBlur: false
  };
  static propTypes = {
    className: PropTypes.string,
    commitOnBlur: PropTypes.bool.isRequired,
    initialValue: PropTypes.string,
    onCancel: PropTypes.func,
    onDelete: PropTypes.func,
    onSave: PropTypes.func.isRequired,
    placeholder: PropTypes.string
  };
  state = {
    isEditing: false,
    text: this.props.initialValue || ''
  };

  componentDidMount() {
    this.todoTextInput.focus();
  }

  commitChanges = () => {
    const newText = this.state.text.trim();
    if (this.props.onDelete && newText === '') {
      this.props.onDelete();
    } else if (this.props.onCancel && newText === this.props.initialValue) {
      this.props.onCancel();
    } else if (newText !== '') {
      this.props.onSave(newText);
      this.setState({text: ''});
    }
  };
  handleBlur = () => {
    if (this.props.commitOnBlur) {
      this.commitChanges();
    }
  };
  handleChange = (e) => {
    this.setState({text: e.target.value});
  };
  handleKeyDown = (e) => {
    if (this.props.onCancel && e.keyCode === ESC_KEY_CODE) {
      this.props.onCancel();
    } else if (e.keyCode === ENTER_KEY_CODE) {
      this.commitChanges();
    }
  };

  render() {
    return (
      <input
        className={this.props.className}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        placeholder={this.props.placeholder}
        value={this.state.text}
        ref={ref => this.todoTextInput = ref}
      />
    );
  }
}
