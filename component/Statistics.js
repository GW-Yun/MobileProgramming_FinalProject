import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { PieChart } from 'react-native-chart-kit';
import { useSQLiteContext } from 'expo-sqlite';
import { Picker } from '@react-native-picker/picker';

export default function Statistics() {
    const [data, setData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [totalExpenditure, setTotalExpenditure] = useState(0);
    const db = useSQLiteContext();

    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const years = Array.from({ length: 5 }, (_, i) => ({
        label: (new Date().getFullYear() - i).toString(),
        value: new Date().getFullYear() - i,
    }));
    const colorArray = [ "salmon", "orange", "wheat", "yellow", "lightgreen", "darkcyan", "cornflowerblue", "skyblue", "plum" ];

    const fetchExpenditureData = async () => {
        try{
            const result = await db.getAllAsync(
                `SELECT date, category, SUM(price) AS total 
                FROM briefRecord INNER JOIN detailRecord 
                ON briefRecord.id = detailRecord.id 
                WHERE date LIKE ?
                GROUP BY category`,
                [`${selectedYear}-${selectedMonth.toString().padStart(2, '0')}%`]
            );

            const fetchedData = result.map((item,index) => ({
                name: item.category,
                population: item.total,
                color: colorArray[index],
            }));
    
            setData(fetchedData);
            setTotalExpenditure(result.reduce((sum, record) => sum + record.total, 0));    
        } catch (error) {
            console.error('Could not get details', error);
        }
    };

    useEffect(() => {
        fetchExpenditureData();
    }, [selectedYear, selectedMonth]);

    return (
        <View>
            <View style={{
                borderWidth: 1,
                borderRadius: 20,
                marginBottom: 10,
                width:'90%',
                alignSelf:'center',
                marginTop: 20
            }}>
                <Picker
                    selectedValue={selectedYear}
                    onValueChange={(itemValue) => setSelectedYear(itemValue)}
                >
                    {years.map((year) => (
                        <Picker.Item key={year.value} label={year.label} value={year.value} />
                    ))}
                </Picker>
            </View>

            <View style={{
                borderWidth: 1,
                borderRadius: 20,
                marginBottom: 10,
                width:'90%',
                alignSelf:'center'
            }}>
                <Picker
                    selectedValue={selectedMonth}
                    onValueChange={(itemValue) => setSelectedMonth(itemValue)}
                >
                    {months.map((month) => (
                        <Picker.Item key={month} label={month} value={month} />
                    ))}
                </Picker>
            </View>

            <View style={{
                marginBottom: 10,
                width:'90%',
                alignSelf:'center'
            }}>
                <Button icon="refresh" mode="outlined" onPress={fetchExpenditureData}>Refresh</Button>
            </View>

            <PieChart
                data={data}
                width={400}
                height={270}
                chartConfig={{
                    backgroundColor: '#ffffff',
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: () => '#000',
                }}
                accessor={"population"}
                backgroundColor={"transparent"}
                paddingLeft={"3"}
                center={[20, 0]}
            />
            <View style={{ margin: 20 }}>
                {data.map((item) => (
                    <Text key={item.name}>
                        {item.name}: ${item.population}
                    </Text>
                ))}
                <Text style={{ marginTop: 20 }}>Total Expenditure: ${totalExpenditure}</Text>
            </View>
        </View>
    );
}