import BriefRecord from './component/BriefRecord';
import AddRecord from './component/AddRecord';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Navigator(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Records" component={BriefRecord} />
      <Stack.Screen name="New Record" component={AddRecord} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({  // Navigator can be customized using screenOptions
          tabBarIcon: ({ color, size }) => { 
            if (route.name === 'Money Spent') {
              return <FontAwesome name="history" size={size} color={color} />;
            }
          },
        })}
      >
        <Tab.Screen name="Money Spent" component={Navigator} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}