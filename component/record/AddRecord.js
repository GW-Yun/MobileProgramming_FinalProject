import { useState } from 'react';
import { Button, TextInput, PaperProvider } from 'react-native-paper';
import { Alert, View } from 'react-native';
import { DatePickerInput } from 'react-native-paper-dates';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { en, registerTranslation } from 'react-native-paper-dates';
import AddItem from './AddItem';

registerTranslation('en', en);

export default function AddRecord() {
    const route = useRoute();
    const { db, categories, updateList } = route.params;
    const navigation = useNavigation();

	const [brief, setBrief] = useState({
		date: null,
        shop: "",
	});
    const [details, setDetails] = useState([]);

    const handleChange = (name, value) => {
		setBrief({...brief, [name]: value});
	}

    const handleSave = async () => {
        const { date, shop } = brief;
        if(!date || !shop){
            Alert.alert('Error', 'Please fill in both fields.')
            return;
        }
        if(details.length < 1){
            Alert.alert('Error', 'At least one item in the record.')
            return;
        }
        try {
            const id = Date.now();
            await db.runAsync('INSERT INTO briefRecord VALUES (?, ?, ?)', id, date.toISOString().split('T')[0], shop);
            for (const detail of details) {
                await db.runAsync('INSERT INTO detailRecord VALUES (?, ?, ?, ?, ?, ?)', id, detail.item, detail.category, detail.amount, parseFloat(detail.price), detail.promotion);
            }
            await updateList();
            navigation.navigate('Records', 'Record added.')
        } catch (error) {
          console.error('Could not add item', error);
        }
    };

    return(
        <PaperProvider>
            <View style={{ height: 110, padding: 10, marginTop: 10 }} >
                <DatePickerInput
                    locale='en'
                    label='Date' 
                    onChange={(value) => handleChange('date', value)}
                    value={brief.date}
                    inputMode="start"
                /> 
                <TextInput 
                label='Provider' 
                onChangeText={(value) => handleChange('shop', value)}
                value={brief.shop}
                /> 
            </View>
            <View>
                <Button 
                    icon='content-save' 
                    style={{width:'45%', alignSelf:'flex-end', margin:5 }} 
                    onPress={handleSave} 
                    mode="contained" 
                >
                    Save
                </Button>
                <AddItem setDetails={setDetails} details={details} categories={categories} />
            </View>
        </PaperProvider>
    );
}