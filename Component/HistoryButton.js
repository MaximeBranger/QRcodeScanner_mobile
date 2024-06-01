import {Linking, Pressable, StyleSheet, Text, View} from "react-native";
import {AsyncStorageManager} from "../Utils/AsyncStorageManager";

export default function HistoryButton({value, callback}) {

    const openUrl = () => {
        Linking.openURL(value)
            .catch((err) => console.error('An error occurred', err));
    }

    const deleteHistoryElement = async (value) => {
        await AsyncStorageManager.removeFromArray('history', value)
            .then(() => {
                console.log('removed')
                callback();
            })
            .catch(error => console.error(error));
    }

    return (
        <View style={styles.view}>
            <Pressable style={styles.button} onPress={() => openUrl()} >
                <Text style={styles.text}>{value}</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.button_delete]} onPress={() => deleteHistoryElement()}>
                <Text>X</Text>
            </Pressable>
        </View>
    );

}


const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        flex: 1,
    },
    button: {
        flex: 9,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15,
        height: 'auto',
        padding: 0,
        backgroundColor: '#87A878',
        borderRadius: 10,
        marginVertical: 7,
        minHeight: 60
    },
    button_delete: {
        flex: 1,
        width: 25,
        backgroundColor: '#DBF9B8'
    },
    text: {
        fontSize: 16,
        margin: 0,
        padding: 0,
        color: '#000000',
        height: 'auto',
    },
});