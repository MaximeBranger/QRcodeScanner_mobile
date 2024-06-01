import {StyleSheet} from "react-native";

export const HistoryButtonStyle = StyleSheet.create({
    view: {
        flexDirection: 'row',
        gap: 10,
        marginHorizontal: 10,
        marginVertical: 10
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        minHeight: 60,
        height: 'auto',
    },
    button_content: {
        backgroundColor: '#87A878',
        flex: 9,
        padding: 5,
    },
    button_delete: {
        flex: 1,
        backgroundColor: '#DBF9B8',
        borderRadius: 10,
        padding: 0
    },
    text: {
        // fontSize: 16,
        margin: 0,
        padding: 0,
        color: '#000000',
        height: 'auto',
        fontFamily: 'monospace',
    },
});