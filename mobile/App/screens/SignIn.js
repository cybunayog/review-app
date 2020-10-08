import React from "react";
import { ScrollView } from "react-native";

import { TextField, ErrorText } from "../components/Form";
import { Button } from "../components/Button";
import { reviewApi, saveAuthToken } from 'review/App/util/api';

export default class SignIn extends React.Component {
  state = {
    email: "",
    password: "",
    error: ""
  };

  handleSubmit = () => {
    this.setState({ error: "" });
    reviewApi('/sign-in', {
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      }),
    })
      .then(res => {
        // save token to AsyncStorage
        console.log('response', res);
        return saveAuthToken(res.result.token);
      })
      .then(() => {
        // Success!
        console.log("Successful login!");
        this.props.navigation.navigate("Information");
      })
      .catch(e => {
        this.setState({ error: e.message })
      });
  };

  render() {
    return (
      <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
        <TextField
          label="Email"
          placeholder="john.doe@example.com"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          autoCapitalize="none"
        />
        <TextField
          label="Password"
          secureTextEntry
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          autoCapitalize="none"
        />
        <ErrorText text={this.state.error} />
        <Button text="Submit" onPress={this.handleSubmit} />
      </ScrollView>
    );
  }
}
