import {StyleSheet} from "react-native";
import Colors from "../Utils/Colors";

export const ScanStyle = StyleSheet.create({
    camera: {
        alignSelf: 'center',
        width: '70%',
        borderRadius: 10,
        aspectRatio: 2 / 3
    },
    button_camera: {
        position: "absolute",
        width: 40,
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: Colors.white,
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
    scan_result: {
        alignItems:'center',
        justifyContent:'center'
    },
    scan_result_view: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    scan_result_text: {
        backgroundColor: Colors.white,
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 5
    },
    buttons_view: {
        alignItems:'center',
        justifyContent:'center'
    }

})