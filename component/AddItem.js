import { useState } from 'react';
import { Dialog, Portal, Button, TextInput } from 'react-native-paper';
import { Alert } from 'react-native';

export default function AddItem() {
    const [visible, setVisible] = useState(false);
    const [details, setDetails] = useState([]);
	const [detail, setDetail] = useState({
		item: "",
        category: "",
	    amount: "",
        price: "",
	});

    const handleOpen = () => {
		setVisible(true);
		setDetail({
            item: "",
            category: "",
		    amount: "",
            price: "",
		})
	};

	const handleClose = () => {
		setVisible(false);
	};

    const handleChange = (name, value) => {
		setDetail({...detail, [name]: value});
	}

    const handleSave = async () => {
        const { item, category, amount, price } = detail;
        if(!item || !category || !amount || !price){
            Alert.alert('Error', 'Please fill in all fields.')
            return;
        }
        else {
            setDetails([detail, ...details]);
            setVisible(false)
        }
    };

    return(
        <>
        <Button icon='plus' style={{width:'45%'}} mode="outlined" onPress={handleOpen} >Add Item</Button>
            <Portal>
                <Dialog
                    visible={visible}
                    onDismiss={handleClose}
                >
                    <Dialog.Title>New Item</Dialog.Title>
                    <Dialog.Content>
                        <TextInput 
                            label='Item' 
                            onChangeText={(value) => handleChange('item', value)}
                            value={detail.item}
                            style={{marginBottom: 10}}
                        /> 
                        <TextInput 
                            label='Category' 
                            onChangeText={(value) => handleChange('category', value)}
                            value={detail.category}
                            style={{marginBottom: 10}}
                        /> 
                        <TextInput 
                            label='Amount' 
                            onChangeText={(value) => handleChange('amount', value)}
                            value={detail.amount}
                            keyboardType="numeric"
                            style={{marginBottom: 10}}
                        /> 
                        <TextInput 
                            label='Price (for one item)' 
                            onChangeText={(value) => handleChange('price', value)}
                            value={detail.price}
                            keyboardType="numeric"
                            style={{marginBottom: 10}}
                        /> 
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button icon='close' style={{width:'30%'}}  onPress={handleClose} mode="outlined" >Cancel</Button>
                        <Button icon='plus' style={{width:'30%'}}  onPress={handleSave} mode="contained" details={details} >Add</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </>
    );
}