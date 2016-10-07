import React, {Component, PropTypes} from 'react';
import Relay from 'react-relay';

const Auth = (props, context) =>
  <div>
    <h3>{'Sign up'}</h3>
    <form  >

      <input
        type="text"
      />

      <input
        type="password"
      />

      <div >
        <button
          label={'Sign up'}
          type="submit"

        />

      </div>
    </form>
  </div>;




export default Relay.createContainer(Auth, {
  fragments: {
    viewer: () => Relay.QL`
        fragment on User {
            totalCount
        }
    `
  }
});