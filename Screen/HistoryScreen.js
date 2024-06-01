
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {AsyncStorageManager} from "../Utils/AsyncStorageManager";
import {useEffect, useState} from "react";
import HistoryButton from "../Component/HistoryButton";


export default function HistoryScreen({navigation}) {

    const [history, setHistory] = useState([]);
    const [needUpdate, setNeedUpdate] = useState(false);

    const update = () => {
        setNeedUpdate(!update);
    }

    const getHistory = async () => {
        const value = await AsyncStorageManager.getItem('history');
        if (value !== null) {
            setHistory(value);
        }
    }

    useEffect(() => {
        getHistory();
    }, [needUpdate]);

    return (
        <ScrollView style={{paddingTop: 30, backgroundColor: '#EAE0CC', height: '100%' }}>
            { history.length === 0 && <Text>Aucun historique</Text>}
            { history.length > 0 && history.map((h, i) => <HistoryButton key={i} value={h} callback={update}/>)}
            <View style={{height: 50}}></View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    main_title: {
        fontSize: 30,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10
    },
    button: {
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor:"#87A878",
        height:40,
        minWidth:120,
        padding: 10,
        margin: 10,
    },
    button_open: {
        backgroundColor: '#DBF9B8'
    },
    button_camera: {
        position: "absolute",
        width: 40,
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: "#FFFFFF",
        opacity: .7,
        padding: 5,
        margin: 5,
        bottom: 0,
        right: 0,
    },
    image_camera: {
        aspectRatio: 1,
        height: undefined,
        width: '100%'
    },
});