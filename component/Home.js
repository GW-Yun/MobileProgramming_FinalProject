import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function Home({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <FontAwesome5 name="dollar-sign" size={50} color="mediumpurple" />           
                <Text style={{ fontSize: 36, margin: 30, color: 'mediumpurple', fontWeight: 'bold' }}>Money Map</Text>
                <FontAwesome5 name="coins" size={50} color="mediumpurple" />
            </View>
            
            <TouchableOpacity style={styles.touchableOpacity} onPress={() => navigation.navigate('Record', { screen: 'Records' })}>
                <FontAwesome5 name="history" size={50} color= "beige" />
                <Text style={{color: 'white'}}>Past Records</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchableOpacity} onPress={() => navigation.navigate('Record', { screen: 'Price Searching' })}>
                <FontAwesome5 name="search-dollar" size={50} color= "beige" />
                <Text style={{color: 'white'}}>Price Searching</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchableOpacity} onPress={() => navigation.navigate('Record', { screen: 'Statistics' })}>
                <FontAwesome5 name="chart-pie" size={50} color= "beige" />
                <Text style={{color: 'white'}}>Statistics</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    touchableOpacity: {
        justifyContent: 'center', 
        alignItems: 'center', 
        margin: 20, 
        width: "80%", 
        height: "15%", 
        backgroundColor: "mediumpurple", 
        borderRadius: 15
    },
})