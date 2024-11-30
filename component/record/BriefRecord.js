import { useSQLiteContext } from 'expo-sqlite';
import { Alert } from 'react-native';
import { DataTable, Button, IconButton } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function BriefRecord() {
  const [records, setRecords] = useState([]);
  const navigation = useNavigation();
  const db = useSQLiteContext();

  const categories = [
    { name: 'Housing', icon: 'home' },
    { name: 'Food', icon: 'food' },
    { name: 'Transportation', icon: 'car' },
    { name: 'Healthcare', icon: 'medical-bag' },
    { name: 'Education', icon: 'school' },
    { name: 'Entertainment', icon: 'theater' },
    { name: 'Savings and Investments', icon: 'piggy-bank' },
    { name: 'Personal Expenditure', icon: 'shopping' },
    { name: 'Other', icon: 'dots-horizontal-circle' },
];

  const updateList = async () => {
    try {
      const list = await db.getAllAsync(
        `SELECT briefRecord.id, date, shop, SUM(price) AS cost 
        FROM briefRecord INNER JOIN detailRecord 
        ON briefRecord.id = detailRecord.id 
        GROUP BY briefRecord.id`, 
    );
      setRecords(list);
    } catch (error) {
      console.error('Could not get records', error);
    }
  }

  const deleteRecord = async (id) => {
    Alert.alert(
      'Confirmation', 'Are you sure you want to delete this record?',
      [
        { text: 'Cancel', style: 'cancel' }, 
        { text: 'OK', onPress: async () =>{
          try {
            await db.runAsync('DELETE FROM briefRecord WHERE id=?', id);
            await db.runAsync('DELETE FROM detailRecord WHERE id=?', id);
            await updateList();
          }
          catch (error) {
            console.error('Could not delete record', error);
          }
        }}
      ]
    )  
  }

  const navigateToDetailRecord = (id, date, shop) => {
    navigation.navigate('Detail Record', { id, date, shop, categories });
  }

  const navigateToAddRecord = () => {
    navigation.navigate('New Record', { db, categories, updateList });
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
            <DataTable.Title style={{flex:1.5}}>Date</DataTable.Title>
            <DataTable.Title style={{flex:2}}>Provider</DataTable.Title>
            <DataTable.Title style={{flex:0.7}}>Cost</DataTable.Title>
            <DataTable.Title style={{flex:0.5}}>More</DataTable.Title>
            <DataTable.Title style={{flex:0.5}}>Delete</DataTable.Title>
          </DataTable.Header>

          { records.map(record => (
              <DataTable.Row key={record.id}>
                <DataTable.Cell style={{flex:1.5}}>{new Date(record.date).toLocaleDateString()}</DataTable.Cell>
                <DataTable.Cell style={{flex:2}}>{record.shop}</DataTable.Cell>
                <DataTable.Cell style={{flex:0.7}}>{record.cost}</DataTable.Cell>
                <DataTable.Cell style={{flex:0.5}}>
                  <IconButton icon='open-in-new' iconColor='#0000ff' onPress={() => navigateToDetailRecord(record.id, record.date, record.shop)}/>
                </DataTable.Cell>
                <DataTable.Cell style={{flex:0.5}}>
                  <IconButton icon='delete' iconColor='red' onPress={() => deleteRecord(record.id)}/>
                </DataTable.Cell>
              </DataTable.Row>
          ))}
        </DataTable>
    </>
  )
}