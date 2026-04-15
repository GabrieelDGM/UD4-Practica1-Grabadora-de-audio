import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const COLORS = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

export default function LoadingSpinner() {

    const bars = useRef(
        Array.from({ length: 7 }, () => new Animated.Value(0.2))
    ).current;

    useEffect(() => {
        const animations = bars.map((bar, i) =>
            Animated.loop(
                Animated.sequence([
                    Animated.timing(bar, {
                        toValue: 1,
                        duration: 400 + i * 100,
                        useNativeDriver: true,
                    }),
                    Animated.timing(bar, {
                        toValue: 0.2,
                        duration: 400 + i * 100,
                        useNativeDriver: true,
                    }),
                ])
            )
        );
        Animated.parallel(animations).start();
    }, []);

    return (
        <View style={styles.container}>
            {bars.map((bar, i) => (
                <Animated.View
                    key={i}
                    style={[styles.bar, {
                        backgroundColor: COLORS[i],
                        transform: [{ scaleY: bar }],
                    }]}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
        gap: 6,
        marginVertical: 10,
    },
    bar: {
        width: 10,
        height: 60,
        borderRadius: 5,
    },
});