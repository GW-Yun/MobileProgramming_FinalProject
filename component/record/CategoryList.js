import { View, Text, FlatList } from 'react-native';
import { Dialog, Portal, Icon, Button } from 'react-native-paper';

export default function CategoryList({ visible, onClose, categories }){
    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onClose}>
                <Dialog.Title>Category List</Dialog.Title>
                <Dialog.Content>
                    <FlatList
                        data={categories}
                        keyExtractor={item => item.name}
                        renderItem={({item})=>(
                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                                <Icon source={item.icon} size={20} />
                                <Text style={{ marginLeft: 10 }}>{item.name}</Text>
                            </View>
                        )}
                    />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={onClose}>Close</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};