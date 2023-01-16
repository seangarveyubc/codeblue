import { CardiacData } from '../models/CardiacData';
import { LocalStorageImpl } from '../LocalStorage/LocalStorageImpl';
import { LocalAppStorageCache } from './LocalStorageCache';

export class LocalStorageCacheImpl
    extends LocalStorageImpl
    implements LocalAppStorageCache
{
    addCardiacData(key: string, value: CardiacData) {
        this.storage.set(key, JSON.stringify(value));
    }

    getAllCardiacData(): CardiacData[] {
        const keys = this.storage.getAllKeys();
        let data: CardiacData[] = [];
        keys.forEach((key) => {
            let item = this.getString(key);
            if (item) {
                try {
                    let cardiacData: CardiacData = this.parseCardiacData(item);
                    data.push(cardiacData);
                } catch (err) {
                    console.log('Could not deserialize cardiac data', item);
                }
            }
        });

        return data;
    }

    private parseCardiacData(data: string): CardiacData {
        const parsedData: CardiacData = JSON.parse(data);
        if (!parsedData) {
            throw Error('Could not deserialize cardiac data');
        }

        return {
            frequency: parsedData.frequency,
            deviceId: parsedData.deviceId,
            timestamp: new Date(parsedData.timestamp),
            expiration: new Date(parsedData.expiration)
        };
    }

    refresh() {
        const keys = this.storage.getAllKeys();
        const now = Date.now();
        keys.forEach((key) => {
            let expiryDate = parseInt(key.split(' ')[1]);
            if (now >= expiryDate) {
                this.delete(key);
            }
        });
    }
}
