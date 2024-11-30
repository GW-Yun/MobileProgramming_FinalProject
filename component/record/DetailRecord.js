import { useSQLiteContext } from 'expo-sqlite';
import { DataTable, Icon, Text, PaperProvider } from 'react-native-paper';
import { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import CategoryList from './CategoryList';

export default function DetailRecord() {
    const [details, setDetails] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showCategories, setShowCategories] = useState(false);
    const db = useSQLiteContext();
    const route = useRoute(); // Use useRoute to get navigation params
    const { id, date, shop, categories } = route.params;

    const fetchDetails = async (briefId) => {
        try {
            const list = await db.getAllAsync('SELECT * FROM detailRecord WHERE id = ?', [briefId]);
            setDetails(list);
            const price = await db.getAllAsync('SELECT SUM(price) AS total FROM detailRecord WHERE id = ?', [briefId]);
            setTotalPrice(price[0].total);
        } catch (error) {
            console.error('Could not get details', error);
        }
    };

    const getCategoryIcon = (categoryName) => {
        const category = categories.find(cat => cat.name === categoryName);
        return category ? category.icon : 'help-circle';
    };

    useEffect(() => {
        fetchDetails(id);
    }, [id]);

    return (
        <PaperProvider>
            <Text variant="titleMedium" style={{padding:5}}>Date: {new Date(date).toLocaleDateString()}</Text>
            <Text variant="titleMedium" style={{padding:5}}>Provider: {shop}</Text>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Item</DataTable.Title>
                    <DataTable.Title style={{alignItems: 'flex-end'}}>
                        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => setShowCategories(true)}>
                            <Text style={{color: 'grey', fontSize:12}}>Category </Text>
                            <Icon size={16} source="information-outline" color="grey"/>
                        </TouchableOpacity>
                    </DataTable.Title>
                    <DataTable.Title>Amount</DataTable.Title>
                    <DataTable.Title>Price</DataTable.Title>
                    <DataTable.Title>Promotion</DataTable.Title>
                </DataTable.Header>

                {details.map(detail => (
                    <DataTable.Row key={detail.id+detail.item}>
                        <DataTable.Cell>{detail.item}</DataTable.Cell>
                        <DataTable.Cell>
                            <Icon source={getCategoryIcon(detail.category)} size={20} />
                        </DataTable.Cell>
                        <DataTable.Cell>{detail.amount}</DataTable.Cell>
                        <DataTable.Cell>{detail.price}</DataTable.Cell>
                        <DataTable.Cell>
                            { detail.promotion=='true'? (
                                <Icon source="check"/>
                            ) : (
                                <Icon source="close"/>
                            )}
                        </DataTable.Cell>
                    </DataTable.Row>
                ))}
            </DataTable>
            <Text style={{alignSelf: 'center'}}> Total Price: ${totalPrice} </Text>

            <CategoryList visible={showCategories} onClose={() => setShowCategories(false)} categories={categories}/>
        </PaperProvider>
    );
}