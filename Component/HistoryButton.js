import {Pressable, StyleSheet, Text, View} from "react-native";
import { useContext } from "react";
import {AsyncStorageManager} from "../Utils/AsyncStorageManager";
import AppContext from "../Context/AppContext";
import AntDesign from '@expo/vector-icons/AntDesign';
import {HistoryButtonStyle} from "../Style/Component/HistoryButtonStyle";


export default function HistoryButton({id, value, callback}) {

    const { openUrl } = useContext(AppContext);

    const deleteHistoryElement = async () => {
        await AsyncStorageManager.removeFromArrayById('history', id)
            .then(() => {
                callback();
            })
            .catch(error => console.error(error));
    }

    return (
        <View style={HistoryButtonStyle.view}>
            <Pressable style={[HistoryButtonStyle.button, HistoryButtonStyle.button_content]} onPress={() => openUrl(value)} >
                <Text style={HistoryButtonStyle.text} adjustsFontSizeToFit={true} numberOfLines={3}>
                    {value}
                </Text>
            </Pressable>
            <Pressable style={[HistoryButtonStyle.button, HistoryButtonStyle.button_delete]} onPress={() => deleteHistoryElement()}>
                <Text>
                    <AntDesign name="delete" size={24} color="black" />
                </Text>
            </Pressable>
        </View>
    );
}