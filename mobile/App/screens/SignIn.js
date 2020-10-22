import React from "react";
import { ScrollView, View, StyleSheet, Text, Platform, AsyncStorage } from "react-native";

import { TextField, ErrorText } from "../components/Form";
import { Button } from "../components/Button";
import { reviewApi, saveAuthToken } from 'review/App/util/api';
import * as Google from 'expo-google-app-auth';

const styles = StyleSheet.create({
  textBlock: {
    marginTop: 20
  },
  text: {
    fontSize: 18,
    color: "#969696",
    textAlign: "center",
    marginBottom: 2
  },
});

const isAndroid = () => Platform.OS === 'android',
  androidID = '308218911119-459l4op4o0l10014s3lkn00tibci2r65.apps.googleusercontent.com',
  iosID = '308218911119-q20q6rt2lcllrvs3rt9ooq0v1ok024qj.apps.googleusercontent.com';

const googleAuthConfig = {
  clientId: isAndroid() ? androidID : iosID,
  scopes: ['profile', 'email'],
}

 const initialState = {
    email: "",
    password: "",
    error: "",
    accessToken: "",
  };

export default class SignIn extends React.Component {
 
  state = initialState;

  signInWithGoogle = async () => {
    Google.logInAsync(googleAuthConfig)
      .then(async result => {
        console.log('Result', result);
        if (result.type === 'success') {
          // Get the email, save it to the database
          this.setState({ accessToken: result.accessToken });
          reviewApi(`/google-sign-in?id=${result.user.id}`, {
            method: 'GET',
          })
          .then(res => {
            console.log("at reviewAPI", res);
            this.setState({ email: res.email });
          })
          .finally(() => {
            // Success!
            console.log("Successful login!");
            this.props.navigation.navigate("Information");
          })
          .catch(e => {
            console.log('Something is wrong with the API call:', e);
          });
        } else {
          console.log(`Google.logInAsync: login was unsuccessful`);
        }
      })
      .catch(e => {
        console.log(`Google.logInAsync error: ${err}`);
      })
  };

  checkUserExists = (result) => {
    reviewApi('/google-sign-in', {
      method: 'POST',
      body: JSON.stringify({

      })
    })
  };

  signOutWithGoogle = async () => {
    Google.logOutAsync({
      ...googleAuthConfig,
      accessToken: accessToken
    })
    .finally(() => {
      this.setState(initialState);
    })
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
        <View style={styles.textBlock}>
          <Text style={styles.text}>Already have a Google Account?</Text>
          <Button text="Sign in with Google" onPress={this.signInWithGoogle} />
        </View>
      </ScrollView>
    );
  }
}
