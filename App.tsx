/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
// import messaging from '@react-native-firebase/messaging';
import { PushSDKModule } from 'pushologies-notifications';
import React from 'react';

import {
  Button,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
const App = () => {
  const [result, setResult] = React.useState<String | String>();
  const [inputText, onChangeText] = React.useState<String | undefined>();
  const isDarkMode = useColorScheme() === 'dark';

  const getDeviceId = async () => {
    console.log('Get device Id');
    try {
      const deviceId = await PushSDKModule.getDeviceId();
      setResult(`Device Id: ${deviceId}`);
    } catch {
      setResult('Error fetching the device Id');
    }
  };

  const getCustomerId = async () => {
    console.log('Get customer Id');
    try {
      const customerId = await PushSDKModule.getCustomerId();
      setResult(`Customer Id: ${customerId}`);
    } catch {
      setResult('Error fetching the customer Id');
    }
  };

  const setCustomerId = async () => {
    console.log('Get customer Id');
    if (inputText == null || inputText.length === 0) {
      setResult('Customer id cannot be empty');
      return;
    }
    try {
      await PushSDKModule.setCustomerId(inputText);
      console.log(`Set Customer Id: ${inputText}`);
      setResult('Successfully set customerId');
    } catch {
      setResult('Error setting the customer Id');
    }
  };
  const subscribeTag = async () => {
    console.log('SubScribe tag');
    if (inputText == null || inputText.length === 0) {
      setResult('Tag cannot be empty ');
      return;
    }
    try {
      await PushSDKModule.subscribeTag(inputText);
      setResult('Tag subscribed successfully');
    } catch {
      setResult('Error subscribing the tag');
    }
  };

  const unsubscribeTag = async () => {
    console.log('UnsubScribe tag');
    if (inputText == null || inputText.length === 0) {
      setResult('Tag cannot be empty');
      return;
    }
    try {
      await PushSDKModule.unsubscribeTag(inputText);
      setResult('Tag unsubscribed successfully');
    } catch {
      setResult('Error unsubscribing the tag');
    }
  };

  const updatePersonalisationVariable = async () => {
    console.log('Update Personalisation');
    try {
      const success = await PushSDKModule.updatePersonalisationVariable(
        "key",
        "value",
      );
      setResult(`Update Personalisation Success: ${success}`);
    } catch {
      setResult('Error Updating Personalisation');
    }
  };

  const getAllPersonalisation = async () => {
    console.log('Get All Personalisation');
    try {
      const personalisation = await PushSDKModule.getAllPersonalisation();
      setResult(`Personalisation: ${JSON.stringify(personalisation)}`);
    } catch {
      setResult('Error fetching the Personalisation');
    }
  };
  
  const requestAndroidPermissions = async () => {
    try {
      await requestNotificationPermission();
      await requestLocationPermissionAndroid();
    } catch (error) {
      setResult(`PushSDK is Permissions Error: ${error}`);
    }
  };

  const requestNotificationPermission = async () => {
    const notificationPerm = PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS;
    const granted = PermissionsAndroid.RESULTS.GRANTED;
    try {
      const grantedPerm =
        (await PermissionsAndroid.requestMultiple([notificationPerm]))[
          notificationPerm
        ] === granted;
      console.log(`Notification Permisson: ${grantedPerm}\n`);
      return grantedPerm;
    } catch (err) {
      setResult('Error');
      console.warn(err);
    }
    return false;
  };


  const requestLocationPermissionAndroid = async () => {
    const finePerm = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
    const bckgPerm = PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION;
    const granted = PermissionsAndroid.RESULTS.GRANTED;
    try {
      const grantedFine =
        (await PermissionsAndroid.requestMultiple([finePerm]))[finePerm] ===
        granted;
      const grantedBckg =
        (await PermissionsAndroid.requestMultiple([bckgPerm]))[bckgPerm] ===
        granted;
      console.log(
        `Fine Location: ${grantedFine}\nBackground Location: ${grantedBckg}\n`,
      );
      return grantedFine && grantedBckg;
    } catch (err) {
      setResult('Error');
      console.warn(err);
    }
    return false;
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          {
            color: isDarkMode ? Colors.white : Colors.black,
            borderColor: isDarkMode ? Colors.white : Colors.black,
          },
        ]}
        onChangeText={onChangeText}
        value={inputText}
        placeholder="Enter the value"
      />
      <Button
        onPress={() => {
          requestAndroidPermissions();
        }}
        title="Request Android Permissions"
      />
      <View style={styles.space} />
      <Button
        onPress={() => {
          getDeviceId();
        }}
        title="Get Device Id"
      />
      <View style={styles.space} />

      <Button
        onPress={() => {
          getCustomerId();
        }}
        title="Get Customer Id"
      />
      <View style={styles.space} />

      <Button
        onPress={() => {
          setCustomerId();
        }}
        title="Set Customer Id"
      />
      <View style={styles.space} />

      <Button
        onPress={() => {
          subscribeTag();
        }}
        title="Subscribe Tag"
      />
      <View style={styles.space} />

      <Button
        onPress={() => {
          unsubscribeTag();
        }}
        title="Unsubscribe Tag"
      />
      <View style={styles.space} />
      <Button
        onPress={() => {
          updatePersonalisationVariable();
        }}
        title="Update Personalisation"
      />
            <View style={styles.space} />
       <Button
        onPress={() => {
          getAllPersonalisation();
        }}
        title="Get All Personalisation"
      />
      <View style={styles.space} />

      <View style={styles.space} />
      <Text
        style={[
          styles.rounded,
          styles.resultText,
          {
            borderColor: isDarkMode ? Colors.white : Colors.black,
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {`Result:\n${result}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rounded: {
    borderRadius: 10,
    borderColor: Colors.white,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  resultText: {
    padding: 5,
    width: '90%',
    minHeight: 100,
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  space: {
    height: 10,
  },
  input: {
    height: 40,
    width: '90%',
    margin: 12,
    borderWidth: 1,
    borderColor: Colors.white,
    padding: 10,
  },
});

export default App;
