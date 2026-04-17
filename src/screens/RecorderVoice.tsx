import React, { useEffect, useState } from 'react';
import { useAudioRecorder, AudioModule, RecordingPresets, useAudioPlayer } from 'expo-audio';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { loadAudios, saveAudios } from '../services/Service';
import * as FileSystem from 'expo-file-system/legacy';
import LoadingSpinner from '../components/LoadingSpinner';
import { MaterialIcons } from '@expo/vector-icons';
import AnimatedButton from '../components/AnimationBotton';

export default function RecordingScreen() {

    const [audios, setAudios] = useState<string[]>([]);
    const [selected, setSelected] = useState<number[]>([]);
    const [isRecording, setIsRecording] = useState(false);
    const [currentUri, setCurrentUri] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
    const player = useAudioPlayer(currentUri);

    useEffect(() => {
        const getAudios = async () => {
            const savedAudios = await loadAudios();
            setAudios(savedAudios);
            setIsLoading(false);
        };
        getAudios();
    }, []);

    useEffect(() => {
        if (currentUri) {
            player.play();
        }
    }, [currentUri]);

    const toggleSelect = (index: number) => {
        if (selected.includes(index)) {
            setSelected(selected.filter(i => i !== index));
        } else {
            setSelected([...selected, index]);
        }
    };

    const toggleSelectAll = () => {
        if (selected.length === audios.length) {
            setSelected([]);
        } else {
            setSelected(audios.map((_, i) => i));
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
            await audioRecorder.prepareToRecordAsync();
            audioRecorder.record();
        } catch (error) {
            console.log('error al grabar:', error);
            setIsRecording(false);
        }
    };

    const stopRecording = async () => {
        try {
            await audioRecorder.stop();

            await new Promise(resolve => setTimeout(resolve, 500));

            const uri = audioRecorder.uri;
            console.log('uri del audio:', uri);

            if (uri) {
                const fileName = `audio_${Date.now()}.m4a`;
                const dest = `${FileSystem.documentDirectory}${fileName}`;
                await FileSystem.moveAsync({ from: uri, to: dest });

                const updated = [...audios, dest];
                setAudios(updated);
                await saveAudios(updated);
            }
        } catch (error) {
            console.log('error al parar:', error);
        } finally {
            setIsRecording(false);
        }
    };

    const deleteSelected = async () => {
        if (selected.length === 0) {
            Alert.alert('Aviso', 'Selecciona al menos un audio para eliminar.');
            return;
        }

        Alert.alert('Eliminar', '¿Eliminar los audios seleccionados?', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Eliminar', style: 'destructive', onPress: async () => {
                    const updated = audios.filter((_, i) => !selected.includes(i));
                    setAudios(updated);
                    setSelected([]);
                    await saveAudios(updated);
                }
            }
        ]);
    };

    return (
        <View style={styles.container}>
            <ScrollView>

                <Text style={styles.title}>Grabadora de voz</Text>
                {isRecording ? <LoadingSpinner /> : <MaterialIcons name="mic" size={100} color="black" style={styles.mic} />}

                <View style={styles.buttons}>
                    <AnimatedButton
                        texto={isRecording ? '⏺ Grabando...' : '▶ Iniciar'}
                        color="green"
                        onPress={startRecording}
                        disabled={isRecording}
                    />

                    <AnimatedButton
                        texto="⏹ Stop"
                        color="red"
                        onPress={stopRecording}
                        disabled={!isRecording}
                    />
                </View>

                <Text style={styles.subtitle}>Lista de audios</Text>

                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        {audios.length > 0 && (
                            <TouchableOpacity
                                style={styles.selectAllRow}
                                onPress={toggleSelectAll}
                            >
                                <Text style={styles.audioName}>Seleccionar todo los audios</Text>
                                <View style={[
                                    styles.checkbox,
                                    selected.length === audios.length && styles.checkboxChecked
                                ]}>
                                    {selected.length === audios.length && (
                                        <Text style={styles.checkmark}>✓</Text>
                                    )}
                                </View>
                            </TouchableOpacity>
                        )}

                        {audios.map((uri, i) => (
                            <View key={i} style={styles.audioRow}>
                                <Text style={styles.audioName}>{i + 1}. Audio</Text>

                                <TouchableOpacity
                                    style={styles.greenBtn}
                                    onPress={() => setCurrentUri(uri)}
                                >
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
                    </>
                )}

                {audios.length > 0 && (
                    <TouchableOpacity
                        style={[styles.redBtn, styles.deleteBtn]}
                        onPress={deleteSelected}
                    >
                        <Text style={styles.btnText}>
                            {selected.length > 0 ? `Eliminar (${selected.length})` : 'Eliminar'}
                        </Text>
                    </TouchableOpacity>
                )}

            </ScrollView>
        </View>
    );
};

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
        textAlign: 'center',
        marginVertical: 10,
        alignSelf: 'center',
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
        borderRadius: 30
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
    selectAllRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#aaa',
        marginBottom: 4,
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
    },
});