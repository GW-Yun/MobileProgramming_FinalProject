import { DataTable, IconButton, Icon, Text } from 'react-native-paper';
import { TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native';
import { useState } from 'react';
import CategoryList from './CategoryList';

export default function AddingItemList(props) {
    const [showCategories, setShowCategories] = useState(false);
    const getCategoryIcon = (categoryName) => {
        const category = props.categories.find(cat => cat.name === categoryName);
        return category ? category.icon : 'help-circle';
    };

    return(
        <>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title style={{justifyContent: 'center', flex: 0.7}}>Item</DataTable.Title>
                    <DataTable.Title style={{alignItems: 'flex-end', flex: 0.8}}>
                        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => setShowCategories(true)}>
                            <Text style={{color: 'grey', fontSize:12}}>Category</Text>
                            <Icon size={12} source="information-outline" color="grey"/>
                        </TouchableOpacity>
                    </DataTable.Title>
                    <DataTable.Title style={{flex: 0.7}}>Amount</DataTable.Title>
                    <DataTable.Title style={{flex: 0.5}}>Price</DataTable.Title>
                    <DataTable.Title style={{flex: 0.7}}>Promotion</DataTable.Title>
                    <DataTable.Title style={{flex: 0.7}}>Actions</DataTable.Title>
                </DataTable.Header>

                <FlatList
                    style={{height:400}} 
                    data={props.details}
                    keyExtractor={index => index.toString()}
                    renderItem={({ item, index }) => (  
                        <DataTable.Row key={index}>
                            <DataTable.Cell style={{justifyContent: 'center', flex: 0.7}}>{item.item}</DataTable.Cell>
                            <DataTable.Cell style={{justifyContent: 'center', flex: 0.8}}>
                                <Icon source={getCategoryIcon(item.category)} size={20} />
                            </DataTable.Cell>
                            <DataTable.Cell style={{justifyContent: 'center', flex: 0.7}}>{item.amount}</DataTable.Cell>
                            <DataTable.Cell style={{justifyContent: 'center', flex: 0.5}}>{item.price}</DataTable.Cell>
                            <DataTable.Cell style={{justifyContent: 'center', flex: 0.7}}>
                                { item.promotion=='true'? (
                                    <Icon source="check"/>
                                ) : (
                                    <Icon source="close"/>
                                )}
                            </DataTable.Cell>
                            <DataTable.Cell style={{justifyContent: 'center', flex: 0.7}}>
                                <View style={{flexDirection: 'row'}}>
                                    <IconButton icon='square-edit-outline' size={16} onPress={() => props.handleEdit(index)} />
                                    <IconButton icon='delete' iconColor= 'red' size={16} onPress={() => props.handleDelete(index)} />
                                </View>
                            </DataTable.Cell>
                        </DataTable.Row>
                    )}
                />
            </DataTable>
            <CategoryList visible={showCategories} onClose={() => setShowCategories(false)} categories={props.categories}/>
        </>
    )
}