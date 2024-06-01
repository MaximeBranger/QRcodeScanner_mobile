import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ScanScreen from "./Screen/ScanScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HistoryScreen from "./Screen/HistoryScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen name="Scan" component={ScanScreen} options={{ headerShown: false }} />
              <Stack.Screen name="History" component={HistoryScreen} options={{ headerStyle: { backgroundColor: '#87A878' } } } />
          </Stack.Navigator>
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
