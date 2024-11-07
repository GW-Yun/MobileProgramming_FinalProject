import { DataTable } from 'react-native-paper';
export default function AddingItemList(props) {

    return(
        <DataTable>
            <DataTable.Header>
                <DataTable.Title>Item</DataTable.Title>
                <DataTable.Title>Category</DataTable.Title>
                <DataTable.Title>Amount</DataTable.Title>
                <DataTable.Title>Price</DataTable.Title>
                <DataTable.Title>Edit</DataTable.Title>
            </DataTable.Header>
                
            {
                props.details.map(details => (
                    <DataTable.Row key={details.toString()}>
                        <DataTable.Cell>{details.item}</DataTable.Cell>
                        <DataTable.Cell>{details.category}</DataTable.Cell>
                        <DataTable.Cell>{details.amount}</DataTable.Cell>
                        <DataTable.Cell>{details.price}</DataTable.Cell>
                        <DataTable.Cell>
                            <Button icon='edit' />
                        </DataTable.Cell>
                    </DataTable.Row>
                ))
            }
        </DataTable>
    )
}