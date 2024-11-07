import { useSQLiteContext } from 'expo-sqlite';
import { Alert } from 'react-native';
import { DataTable, Text, Button } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function BriefRecordList() {
  const [records, setRecords] = useState([]);
  const navigation = useNavigation();
  const db = useSQLiteContext();


  const updateList = async () => {
    try {
      const list = await db.getAllAsync('SELECT * from briefRecord');
      setRecords(list);
    } catch (error) {
      console.error('Could not get items', error);
    }
  }

  const deleteItem = async (id) => {
    Alert.alert(
      'Confirmation', 'Are you sure you want to delete this record?',
      [
        { text: 'Cancel', style: 'cancel' }, 
        { text: 'OK', onPress: async () =>{
          try {
            await db.runAsync('DELETE FROM briefRecord WHERE id=?', id);
            await updateList();
          }
          catch (error) {
            console.error('Could not delete item', error);
          }
        }}
      ]
    )  
  }

  const navigateToAddRecord = () => {
    navigation.navigate('New Record', { db, updateList });
  }

  useEffect(() => { updateList() }, []);

  return(
    <>
        <Button 
            icon='plus' 
            mode='contained' 
            onPress={navigateToAddRecord}
        >
            New Record
        </Button>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>ID</DataTable.Title>
            <DataTable.Title>Date</DataTable.Title>
            <DataTable.Title>Shop</DataTable.Title>
            <DataTable.Title>More</DataTable.Title>
            <DataTable.Title>Delete</DataTable.Title>
          </DataTable.Header>

          {
            records.map(item => (
              <DataTable.Row key={item.id.toString()}>
                <DataTable.Cell>{item.id}</DataTable.Cell>
                <DataTable.Cell>{new Date(item.date).toLocaleDateString()}</DataTable.Cell>
                <DataTable.Cell>{item.shop}</DataTable.Cell>
                <DataTable.Cell>
                  <Button icon='open-in-new' style={{ color: '#0000ff' }} />
                </DataTable.Cell>
                <DataTable.Cell>
                  <Button icon='delete' style={{ color: 'red' }} onPress={() => deleteItem(item.id)}/>
                </DataTable.Cell>
              </DataTable.Row>
            ))
          }
        </DataTable>
        <Text>Current timestamp: {new Date().getTime()}</Text>
    </>
  )
}