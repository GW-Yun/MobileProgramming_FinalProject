import { useSQLiteContext } from 'expo-sqlite';
import { useState } from 'react';
import { Alert } from 'react-native';
import { DataTable, Searchbar, Icon } from 'react-native-paper';

export default function SearchItem() {
    const [keyword, setKeyword] = useState('');
    const [results, setResults] = useState([]);
    const db = useSQLiteContext();

    const fetchItem = async (keyword) => {
        try {
            const list = await db.getAllAsync(
                `SELECT date, shop, item, price, amount, promotion 
                FROM briefRecord INNER JOIN detailRecord 
                ON briefRecord.id = detailRecord.id 
                WHERE item LIKE ?`, 
                [`%${keyword}%`]
            );
            setResults(list);
        } catch (error) {
            console.error('Could not get details', error);
        }
    };

    const handleSearch = () => {
        if (keyword) {
            fetchItem(keyword);
            setKeyword('');
        } else {
            Alert.alert('Error', 'Type something first.')
            return;
        }
    };

    return(
        <>
            <Searchbar
                placeholder="Search"
                onChangeText={setKeyword}
                value={keyword}
                onIconPress={handleSearch}
            />

            <DataTable>
                <DataTable.Header>
                    <DataTable.Title style={{flex:0.9}}>Date</DataTable.Title>
                    <DataTable.Title style={{flex:1}}>Provider</DataTable.Title>
                    <DataTable.Title style={{flex:1}}>Item</DataTable.Title>
                    <DataTable.Title style={{flex:0.6}}>Cost/Unit</DataTable.Title>
                    <DataTable.Title style={{flex:0.6}}>Promotion</DataTable.Title>
                </DataTable.Header>

                { results.map(record => (
                    <DataTable.Row key={record.date+record.shop}>
                        <DataTable.Cell style={{flex:0.9}}>{new Date(record.date).toLocaleDateString()}</DataTable.Cell>
                        <DataTable.Cell style={{flex:1}}>{record.shop}</DataTable.Cell>
                        <DataTable.Cell style={{flex:1}}>{record.item}</DataTable.Cell>
                        <DataTable.Cell style={{justifyContent: 'center', flex:0.6}}>{record.price/record.amount}</DataTable.Cell>
                        <DataTable.Cell style={{justifyContent: 'center', flex:0.6}}>
                            { record.promotion=='true'? (
                                <Icon source="check"/>
                            ) : (
                                <Icon source="close"/>
                            )}
                        </DataTable.Cell>
                    </DataTable.Row>
                ))}
            </DataTable>
        </>
    )
}