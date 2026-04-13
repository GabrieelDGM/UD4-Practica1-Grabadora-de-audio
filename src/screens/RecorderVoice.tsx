import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native';

export default function RecordingScreen() {
    
    const mockAudios = [1, 2, 3, 4, 5, 6];
    const [selected, setSelected] = useState<number[]>([]);

    const toggleSelect = (index: number) => {
        if (selected.includes(index)) {
            setSelected(selected.filter(i => i !== index));
        } else {
            setSelected([...selected, index]);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>

                <Text style={styles.title}>Grabadora de voz</Text>

                <Text style={styles.mic}>🎙️</Text>

                {/* Buttons */}
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.greenBtn}>
                        <Text style={styles.btnText}>▶ Iniciar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.redBtn}>
                        <Text style={styles.btnText}>Stop</Text>
                    </TouchableOpacity>
                </View>

                {/* Lista de audios */}
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

                {/* Delete button */}
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
    deleteBtn: {
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 30,
        paddingHorizontal: 30,
        marginLeft:250
    },
});