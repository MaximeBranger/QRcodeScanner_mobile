import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useEffect } from 'react';
import {Button, Image, Pressable, StyleSheet, Text, View, Linking} from 'react-native';
import {AsyncStorageManager} from "../Utils/AsyncStorageManager";

export default function ScanScreen({navigation}) {

    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [qrData, setQRData] = useState(null);

    const [history, setHistory] = useState([]);

    const addHistoryElement = async (value) => {
        await AsyncStorageManager.addToArray('history', value)
           .catch(error => console.error(error));
    }

    const getHistory = async () => {
        const value = await AsyncStorageManager.getItem('history');
        if (value !== null) {
            setHistory(value.slice(0,4));
        }
    }

    useEffect(() => {
        getHistory();
    }, []);

    if (!permission) {
        // Camera permissions are still loading.
        return (
            <View>
                <Text>Vous n'avez pas autorisé l'utilisation de la caméra</Text>
            </View>
        );
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>L'accès à la caméra est requis pour utiliser cette fonctionnalité.</Text>
                <Button onPress={requestPermission} title="grant permission" />
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
        <View style={{paddingTop: 60, justifyContent: 'center', alignItems: 'center', gap: 20, backgroundColor: '#EAE0CC', height: '100%' }}>

            <Text style={styles.main_title}>QR Code Scanner</Text>

            <View style={{alignItems:'center', justifyContent:'center'}}>
                <CameraView
                    style={{alignSelf: 'center', width: '70%', aspectRatio: 1}}
                    facing={facing}
                    onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                    barcodeScannerSettings={{
                        barcodeTypes: ["qr"],
                    }}>
                    <Pressable
                        style={styles.button_camera}
                        onPress={toggleCameraFacing}>
                        <Image style={styles.image_camera} source={require('../assets/flip_camera.png')} />
                    </Pressable>
                </CameraView>
            </View>

            <View style={{alignItems:'center', justifyContent:'center'}}>
                {scanned && (
                    <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                        <Text>{qrData}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Pressable
                                style={[styles.button, styles.button_open]}
                                onPress={() => {
                                    Linking.openURL(qrData).catch((err) => console.error('An error occurred', err));
                                }
                                }
                            >
                                <Text style={styles.textLight}>
                                    Ouvrir le lien
                                </Text>
                            </Pressable>
                            <Pressable
                                style={styles.button}
                                onPress={() => {
                                        getHistory();
                                        setScanned(false);
                                    }
                                }>
                                <Text style={styles.textLight}>
                                    Scanner à nouveau
                                </Text>
                            </Pressable>
                        </View>
                    </View>

                )}
            </View>

            {/*BOUTTONS*/}
            <View style={{alignItems:'center', justifyContent:'center'}}>
                <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                    <Pressable
                        style={styles.button}
                        onPress={() => navigation.push('History')}>
                        <Text style={styles.textLight}>
                            Historique
                        </Text>
                    </Pressable>

                </View>
            </View>
        </View>
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