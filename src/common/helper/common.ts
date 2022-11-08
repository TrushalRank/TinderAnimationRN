import AsyncStorage from '@react-native-community/async-storage';

export const priceFormat = (amount) => {
	return Number(amount).toFixed(0).replace(/\d(?=(\d{3})+$)/g, "$&,");
};

export const Storage = {
    getItem: async function (key) {
        let item = await AsyncStorage.getItem(key);
        //You'd want to error check for failed JSON parsing...
        return JSON.parse(item);
    },
    setItem: async function (key, value) {
        return await AsyncStorage.setItem(key, JSON.stringify(value));
    },
    removeItem: async function (key) {
        return await AsyncStorage.removeItem(key);
    }
};
