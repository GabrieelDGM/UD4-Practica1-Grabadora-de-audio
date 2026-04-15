import React, { useRef } from 'react';
import { Animated, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
    texto: string;
    color: string;
    onPress: () => void;
    disabled?: boolean;
}

export default function AnimatedButton({ texto, color, onPress, disabled }: Props) {

    const scale = useRef(new Animated.Value(1)).current;

    const animarBoton = () => {
        Animated.sequence([
            Animated.timing(scale, {
                toValue: 0.85,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(scale, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handlePress = () => {
        animarBoton();
        onPress();
    };

    return (
        <Animated.View style={{ transform: [{ scale }] }}>
            <TouchableOpacity
                style={[styles.btn, { backgroundColor: color }, disabled && styles.disabled]}
                onPress={handlePress}
                disabled={disabled}
            >
                <Text style={styles.texto}>{texto}</Text>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    btn: {
        padding: 12,
        borderRadius: 25,
    },
    texto: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    },
    disabled: {
        opacity: 0.5,
    },
});