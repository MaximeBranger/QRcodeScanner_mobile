import {Pressable, StyleSheet, Text} from "react-native";
import { useContext } from "react";
import AppContext from "../Context/AppContext";
import {OpenLinkButtonStyle} from "../Style/Component/OpenLinkButtonStyle";

export default function OpenLinkButton({value}) {

    const { openUrl } = useContext(AppContext);

    if(/.*:\/\/.*/g.test(value)) {
        return (
            <Pressable
                style={[OpenLinkButtonStyle.button, OpenLinkButtonStyle.button_open]}
                onPress={() => {
                    openUrl(value);
                }
                }
            >
                <Text> Ouvrir le lien </Text>
            </Pressable>
        );
    } else {
        return (
            <Pressable
                style={[OpenLinkButtonStyle.button, OpenLinkButtonStyle.button_open]}
                onPress={() => {
                    openUrl(value);
                }
                }
            >
                <Text> Copier le texte </Text>
            </Pressable>
        );
    }
}