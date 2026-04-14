import AsyncStorage from '@react-native-async-storage/async-storage';

// Guarda la lista de URIs de audios
const saveAudios = async (uris: string[]) => {
    await AsyncStorage.setItem('audios', JSON.stringify(uris));
};

// Carga la lista de URIs de audios
const loadAudios = async () => {
    const data = await AsyncStorage.getItem('audios');
    if (data) {
        return JSON.parse(data);
    }
    return [];
};

// Elimina todos los audios
const clearAudios = async () => {
    await AsyncStorage.removeItem('audios');
};

export { saveAudios, loadAudios, clearAudios };