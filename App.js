import Home from './component/Home';
import BriefRecord from './component/record/BriefRecord';
import AddRecord from './component/record/AddRecord';
import DetailRecord from './component/record/DetailRecord';
import SearchItem from './component/SearchItem';
import Statistics from './component/Statistics';
import { StatusBar } from 'expo-status-bar';
import { SQLiteProvider } from 'expo-sqlite';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome from '@expo/vector-icons/FontAwesome';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const initialize = async (db) => {
  db.execAsync(`
    CREATE TABLE IF NOT EXISTS briefRecord (id INT, date TEXT, shop TEXT);
    CREATE TABLE IF NOT EXISTS detailRecord (id INT, item TEXT, category TEXT, amount INT, price NUM, promotion Boolean);
  `);
};

function Navigator(){
  return(
    <Stack.Navigator initialRouteName="Records">
      <Stack.Screen name="Records" component={BriefRecord} />
      <Stack.Screen name="Detail Record" component={DetailRecord} />
      <Stack.Screen name="New Record" component={AddRecord} />
      <Stack.Screen name="Price Searching" component={SearchItem} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <SQLiteProvider
        databaseName='briefRecorddb.db'
        onInit={initialize}
        onError={error => console.error('Could not open database', error)}
    >
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => { 
              if (route.name === 'Record') {
                return <FontAwesome name="history" size={size} color={color} />;
              }
              if (route.name === 'Home') {
                return <FontAwesome name="home" size={size} color={color} />;
              }
              if (route.name === 'Statistics') {
                return <FontAwesome name="pie-chart" size={size} color={color} />;
              }
            },
          })}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Record" component={Navigator} />
          <Tab.Screen name="Statistics" component={Statistics} />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </SQLiteProvider>
  );
}