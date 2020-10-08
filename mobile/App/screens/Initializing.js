import React from 'react';

import { hasAuthToken } from 'review/App/util/api';
export default class Initializing extends React.Component {
  componentDidMount() {  
    hasAuthToken()
      .then(hasToken => {
        // if they have a token
        if (hasToken) this.props.navigation.navigate('Information');
        //else
        this.props.navigation.navigate('Auth');
      })
      .catch(e => {
        console.log('error initializing', e);
      });

  }

  render() {
    return null;
  }
}