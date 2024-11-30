import { useState } from 'react';
import { Dialog, Portal, Button, TextInput, Text, SegmentedButtons } from 'react-native-paper';
import { Alert, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AddingItemList from './AddingItemList';

export default function AddItem(props) {
    const [totalPrice, setTotalPrice] = useState(0);
    const [visible, setVisible] = useState(false);
	const [detail, setDetail] = useState({
		item: "",
        category: "",
	    amount: 0,
        price: 0,
        promotion: false
	});
    const [editIndex, setEditIndex] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const handleOpen = () => {
		setVisible(true);
		setDetail({
            item: "",
            category: "",
		    amount: 0,
            price: 0,
            promotion: false
		});
        setIsEditing(false);
	};

	const handleClose = () => {
		setVisible(false);
	};

    const handleChange = (name, value) => {
		if (name === 'amount' || name === 'price') {
            value = value.replace(/[^0-9.]/g, '');
            const parts = value.split('.');
            if (parts.length > 2) {
                value = parts[0] + '.' + parts.slice(1).join('');
            }
        }   
        setDetail({ ...detail, [name]: value });
	}

    const handleSave = async () => {
        const { item, category, amount, price, promotion } = detail;
        if(!item || !category || amount<=0 || price<=0 || !promotion){
            Alert.alert('Error', 'Please fill in all fields correctly.')
            return;
        }
        if (isEditing) {
            const oldItem = props.details[editIndex];
            setTotalPrice(prevTotal => prevTotal - parseFloat(oldItem.price) + parseFloat(price));

            const updatedDetails = [...props.details];
            updatedDetails[editIndex] = detail;
            props.setDetails(updatedDetails);
        } else {
            setTotalPrice(prevTotal => prevTotal + parseFloat(price));
            props.setDetails([...props.details, detail]);
        }
            setVisible(false);
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setDetail(props.details[index]);
        setIsEditing(true);
        setVisible(true);
    };

    const handleDelete = (row) => {
        const deleteItem = props.details[row];
        props.setDetails(props.details.filter((_, index) => row != index));
        setTotalPrice(prevTotal => prevTotal - parseFloat(deleteItem.price));
    }

    return(
        <View>
            <Button icon='plus' style={{width:'45%', alignSelf:'flex-end', margin:5 }} mode="outlined" onPress={handleOpen} >Add Item</Button>
            <Portal>
                <Dialog visible={visible} onDismiss={handleClose}>
                    <Dialog.Title>{isEditing ? "Edit Item" : "New Item"}</Dialog.Title>
                    <Dialog.Content>
                        <TextInput 
                            label='Item' 
                            onChangeText={(value) => handleChange('item', value)}
                            value={detail.item}
                            style={{marginBottom: 10}}
                        /> 

                        <Text>Category</Text>
                        <Picker
                            selectedValue={detail.category}
                            style={{ height: 60, width: '100%' }}
                            onValueChange={(value) => handleChange('category', value)}
                        >
                            <Picker.Item label="Select a category" value="" />
                            <Picker.Item label="Housing" value="Housing" />
                            <Picker.Item label="Food" value="Food" />
                            <Picker.Item label="Transportation" value="Transportation" />
                            <Picker.Item label="Healthcare" value="Healthcare" />
                            <Picker.Item label="Education" value="Education" />
                            <Picker.Item label="Entertainment" value="Entertainment" />
                            <Picker.Item label="Savings and Investments" value="Savings and Investments" />
                            <Picker.Item label="Personal Expenditure" value="Personal Expenditure" />
                            <Picker.Item label="Other" value="Other" />
                        </Picker>

                        <TextInput 
                            label='Amount' 
                            onChangeText={(value) => handleChange('amount', value)}
                            value={detail.amount}
                            keyboardType="numeric"
                            style={{marginBottom: 10}}
                        /> 
                        <TextInput 
                            label='Price for item(s)' 
                            onChangeText={(value) => handleChange('price', value)}
                            value={detail.price}
                            keyboardType="numeric"
                            style={{marginBottom: 10}}
                        /> 
                        <Text>Promotion</Text>
                        <SegmentedButtons
                            value={detail.promotion}
                            onValueChange={(value) => handleChange('promotion', value)}
                            buttons={[
                            { value: "true", label: 'Yes' },
                            { value: "false", label: 'No' },
                            ]}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button icon='close' style={{width:'30%'}}  onPress={handleClose} mode="outlined" >Cancel</Button>
                        { isEditing? (
                            <Button icon='content-save' style={{width:'30%'}}  onPress={handleSave} mode="contained">Save</Button>
                            ) : (
                            <Button icon='plus' style={{width:'30%'}}  onPress={handleSave} mode="contained">Add</Button>
                        )}  
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <AddingItemList details={props.details} handleDelete={handleDelete} handleEdit={handleEdit} categories={props.categories} />
            <Text style={{alignSelf: 'center'}}> Total Price: ${totalPrice.toFixed(2)} </Text>
        </View>
    );
}