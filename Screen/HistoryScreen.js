
import {Text, ActivityIndicator, FlatList, View} from 'react-native';
import {AsyncStorageManager} from "../Utils/AsyncStorageManager";
import {useEffect, useState, useContext } from "react";
import HistoryButton from "../Component/HistoryButton";
import Colors from "../Utils/Colors";
import {HistoryStyle} from "../Style/HistoryStyle";
import {CommonStyle} from "../Style/CommonStyle";


export default function HistoryScreen({navigation}) {

    const [history, setHistory] = useState([]);
    const [needUpdate, setNeedUpdate] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);

    const update = () => {
        setNeedUpdate(!needUpdate);
    }

    const getHistory = async () => {
        setIsLoading(true);
        const value = await AsyncStorageManager.getItem('history');
        if (value !== null) {
            setHistory(value.slice(0, page * 10));
        } else {
            setHistory([]);
        }
        setIsLoading(false);
    }

    const renderItem = ({ item, index }) => (
        <HistoryButton id={index} value={item} callback={update}/>
    );

    const renderFooter = () => {
        if (!isLoading) return null;
        return <ActivityIndicator size="large" color={Colors.primary} />;
    };

    useEffect(() => {
        getHistory();
    }, [needUpdate]);

    if (history.length === 0) {
        return (
            <View style={CommonStyle.page}>
                <Text>Aucune donnée à afficher</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={history}
            renderItem={ renderItem }
            keyExtractor={(item, index) => index.toString()}
            onEndReached={() => {
                getHistory();
                setPage(page + 1);
            }}
            onEndReachedThreshold={0.1} // Trigger fetchData when 10% from the bottom
            ListFooterComponent={renderFooter}
            style={ HistoryStyle.flatlist}
        />

    );
}