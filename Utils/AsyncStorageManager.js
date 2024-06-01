import AsyncStorage from '@react-native-async-storage/async-storage';

export class AsyncStorageManager {
    static async setItem(key, value) {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            throw new Error(`Error setting item ${key}: ${error.message}`);
        }
    }

    static async getItem(key) {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                return JSON.parse(value);
            }
            return null;
        } catch (error) {
            throw new Error(`Error getting item ${key}: ${error.message}`);
        }
    }

    static async removeItem(key) {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            throw new Error(`Error removing item ${key}: ${error.message}`);
        }
    }

    static async addToArray(key, element) {
        try {
            const existingArray = await AsyncStorageManager.getItem(key);
            if (existingArray && Array.isArray(existingArray)) {
                existingArray.unshift(element);
                await AsyncStorageManager.setItem(key, existingArray);
            } else {
                AsyncStorageManager.setItem(key, [element])
            }
        } catch (error) {
            throw new Error(`Error adding element to array ${key}: ${error.message}`);
        }
    }

    static async removeFromArray(key, element) {
        try {
            const existingArray = await AsyncStorageManager.getItem(key);
            if (existingArray && Array.isArray(existingArray)) {
                await AsyncStorageManager.setItem(key, existingArray.filter(item => JSON.stringify(item) !== JSON.stringify(element)));
            } else {
                throw new Error(`Item ${key} does not exist or is not an array`);
            }
        } catch (error) {
            throw new Error(`Error removing element from array ${key}: ${error.message}`);
        }
    }

    static async isInArray(key, element, callback=null) {
        try {
            const existingArray = await AsyncStorageManager.getItem(key);
            if (existingArray && Array.isArray(existingArray)) {
                let test;
                if (element.constructor === Object) {
                    test = existingArray.some(item =>
                        Object.keys(element).every(key => item[key] !== element[key])
                    )
                } else {
                    test = existingArray.some(item => JSON.stringify(item) !== JSON.stringify(element));
                }

                if (callback !== null) {
                    callback(test)
                } else {
                    return test
                }
            } else {
                if (callback !== null) {
                    callback(false)
                } else {
                    return flase
                }
            }
        } catch (error) {
            throw new Error(`Error removing element from array ${key}: ${error.message}`);
        }
    }
}
