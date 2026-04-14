import React, { useState } from 'react';
import { useAudioRecorder, AudioModule, RecordingPresets } from 'expo-audio';

import {
    View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert,
}
    from 'react-native';

export default function RecordingScreen() {

    const mockAudios = [1, 2, 3, 4, 5, 6];
    const [selected, setSelected] = useState<number[]>([]);
    const [isRecording, setIsRecording] = useState(false);
    const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

    const toggleSelect = (index: number) => {
        if (selected.includes(index)) {
            setSelected(selected.filter(i => i !== index));
        } else {
            setSelected([...selected, index]);
        }
    };

    const startRecording = async () => {
        const status = await AudioModule.requestRecordingPermissionsAsync();


        if (!status.granted) {
            Alert.alert('No tienes permiso', 'Necesitas dar permiso al micrófono.');
            return;
        }
        setIsRecording(true);

        try {
            await audioRecorder.record();
        } catch (error) {
            console.log('error al grabar:', error);
        }
    };

    const stopRecording = async () => {
        try {
            await audioRecorder.stop();
        } catch (error) {
            console.log('error al parar:', error);
        }

        setIsRecording(false);
    };


    return (
        <View style={styles.container}>
            <ScrollView>

                <Text style={styles.title}>Grabadora de voz</Text>

                <Text style={styles.mic}>🎙️</Text>

                <View style={styles.buttons}>

                    <TouchableOpacity
                        style={[styles.greenBtn, isRecording && styles.disabled]}
                        onPress={startRecording}
                        disabled={isRecording}
                    >
                        <Text style={styles.btnText}>
                            {isRecording ? '▶ Grabando...' : '▶ Iniciar'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.redBtn, !isRecording && styles.disabled]}
                        onPress={stopRecording}
                        disabled={!isRecording}
                    >
                        <Text style={styles.btnText}>Stop</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.subtitle}>Lista de audios</Text>

                {mockAudios.map((_, i) => (
                    <View key={i} style={styles.audioRow}>
                        <Text style={styles.audioName}>{i + 1}. Audio</Text>

                        <TouchableOpacity style={styles.greenBtn}>
                            <Text style={styles.btnText}>▶</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.checkbox, selected.includes(i) && styles.checkboxChecked]}
                            onPress={() => toggleSelect(i)}
                        >
                            {selected.includes(i) && <Text style={styles.checkmark}>✓</Text>}
                        </TouchableOpacity>
                    </View>
                ))}

                <TouchableOpacity style={[styles.redBtn, styles.deleteBtn]}>
                    <Text style={styles.btnText}>Eliminar</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20
    },
    mic: {
        fontSize: 80,
        textAlign: 'center',
        marginVertical: 10
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
        marginTop: 10
    },
    greenBtn: {
        backgroundColor: 'green',
        padding: 12,
        borderRadius: 25
    },
    redBtn: {
        backgroundColor: 'red',
        padding: 12,
        borderRadius: 25
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15
    },
    audioRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    audioName: {
        flex: 1,
        fontSize: 16
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: 'blue',
        borderRadius: 4,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    checkboxChecked: {
        backgroundColor: 'blue'
    },
    checkmark: {
        color: 'white',
        fontWeight: 'bold'
    },
    disabled: {
        opacity: 0.5
    },
    deleteBtn: {
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 30,
        paddingHorizontal: 30,
        marginLeft: 250
    },
});
