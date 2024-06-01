import {Button, Linking, StyleSheet} from 'react-native';
import { useState } from 'react';
import ScanScreen from "./Screen/ScanScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppContext from "./Context/AppContext";
import HistoryScreen from "./Screen/HistoryScreen";
import {Snackbar} from "@react-native-material/core";
import * as Clipboard from "expo-clipboard";

const Stack = createStackNavigator();

export default function App() {

    const [snackbarVisible, setSnackbarVisible] = useState(false);

    const openUrl = async (value) => {
        if (/.*:\/\/.*/g.test(value)) {
            Linking.openURL(value)
                .catch((err) => console.error('An error occurred', err));
        } else {
            await Clipboard.setStringAsync(value);
            showSnackbar();
        }
    }

    const showSnackbar = () => {
        setSnackbarVisible(true);

        setTimeout(() => {
            setSnackbarVisible(false);
        }, 3000);
    }

    return (
      <NavigationContainer>
          <AppContext.Provider value={{ openUrl, showSnackbar }}>
              <Stack.Navigator>
                  <Stack.Screen name="Scan" component={ScanScreen} options={{ headerShown: false }} />
                  <Stack.Screen name="History" component={HistoryScreen} options={{ headerStyle: { backgroundColor: '#87A878' } } } />
              </Stack.Navigator>

              { snackbarVisible &&
                  <Snackbar
                      message="Texte copié !"
                      action={<Button variant="text" title="Fermer" color="#BB86FC" onPress={() => setSnackbarVisible(false)} />}
                      style={{ position: "absolute", start: 16, end: 16, bottom: 16 }}
                  />
              }
          </AppContext.Provider>
      </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
