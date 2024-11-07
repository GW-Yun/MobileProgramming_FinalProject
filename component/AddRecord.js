import { useState } from 'react';
import { Button, TextInput, PaperProvider } from 'react-native-paper';
import { Alert, View } from 'react-native';
import { DatePickerInput, id } from 'react-native-paper-dates';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { en, registerTranslation } from 'react-native-paper-dates';
import AddItem from './AddItem';

registerTranslation('en', en);

export default function AddRecord() {
    const route = useRoute();
    const { db, updateList } = route.params;
    const navigation = useNavigation();

	const [brief, setBrief] = useState({
		date: null,
        shop: "",
	});

    const handleChange = (name, value) => {
		setBrief({...brief, [name]: value});
	}

    const handleSave = async () => {
        const { date, shop } = brief;
        if(!date || !shop){
            Alert.alert('Error', 'Please fill in both fields.')
            return;
        }
        try {
          const id = Date.now();
          await db.runAsync('INSERT INTO briefRecord VALUES (?, ?, ?)', id, date.toISOString(), shop);
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
                label='Shop' 
                onChangeText={(value) => handleChange('shop', value)}
                value={brief.shop}
                /> 
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <AddItem />
                <Button icon='content-save' style={{width:'45%'}} onPress={handleSave} mode="contained" >Save</Button>
            </View>
        </PaperProvider>
    );
}