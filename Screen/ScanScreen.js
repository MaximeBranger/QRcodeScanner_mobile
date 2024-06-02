import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useEffect} from 'react';
import {Button, Image, Pressable,  Text, View} from 'react-native';
import {AsyncStorageManager} from "../Utils/AsyncStorageManager";
import OpenLinkButton from "../Component/OpenLinkButton";
import {CommonStyle} from "../Style/CommonStyle";
import {ScanStyle} from "../Style/ScanStyle";

export default function ScanScreen({navigation}) {


    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [qrData, setQRData] = useState(null);

    const addHistoryElement = async (value) => {
        await AsyncStorageManager.addToArray('history', value)
           .catch(error => console.error(error));
    }

    if (!permission) {
        return (
            <View style={CommonStyle.page}>
                <Text>Vous n'avez pas autorisé l'utilisation de la caméra</Text>
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View style={CommonStyle.page}>
                <Text>L'accès à la caméra est requis pour utiliser cette fonctionnalité.</Text>
                <Pressable
                    style={CommonStyle.button}
                    onPress={requestPermission}>
                    <Text>
                        Autoriser l'accès à la caméra
                    </Text>
                </Pressable>
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const handleBarCodeScanned = async ({ type, data }) => {
        await addHistoryElement(data);
        setScanned(true);
        setQRData(data);
    }

    return (
        <View style={ CommonStyle.page }>

            <Text style={CommonStyle.main_title}>QR Code Scanner</Text>

            <View style={{alignItems:'center', justifyContent:'center'}}>
                <CameraView
                    style={ScanStyle.camera}
                    facing={facing}
                    onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                    barcodeScannerSettings={{
                        barcodeTypes: ["qr"],
                    }}>
                    <Pressable
                        style={ScanStyle.button_camera}
                        onPress={toggleCameraFacing}>
                        <Image style={ScanStyle.image_camera} source={require('../assets/flip_camera.png')} />
                    </Pressable>
                </CameraView>
            </View>

            <View style={ScanStyle.scan_result}>
                {scanned && (
                    <View style={ ScanStyle.scan_result_view }>
                        <Text style={ScanStyle.scan_result_text} adjustsFontSizeToFit={true} numberOfLines={3}>
                            {qrData}
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <OpenLinkButton value={qrData}/>
                            <Pressable
                                style={CommonStyle.button}
                                onPress={() => {
                                        setScanned(false);
                                    }
                                }>
                                <Text>
                                    Scanner à nouveau
                                </Text>
                            </Pressable>
                        </View>
                    </View>

                )}
            </View>

            <View style={ScanStyle.buttons_view}>
                <Pressable
                    style={CommonStyle.button}
                    onPress={() => navigation.push('History')}>
                    <Text>
                        Historique
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}