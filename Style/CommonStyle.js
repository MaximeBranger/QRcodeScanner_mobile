import {StyleSheet} from "react-native";
import Colors from "../Utils/Colors";

export const CommonStyle = StyleSheet.create({
    page: {
        paddingTop: 60,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        backgroundColor: Colors.background,
        height: '100%'
    },
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
        backgroundColor: Colors.primary,
        height:40,
        minWidth:120,
        padding: 10,
        margin: 10,
    },
    button_open: {
        backgroundColor: Colors.secondary
    },
});