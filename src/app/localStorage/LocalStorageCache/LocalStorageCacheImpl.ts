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
                    let cardiacData = JSON.parse(item);
                    data.push(cardiacData);
                } catch (ex) {
                    console.log('Could not deserialize cardiac data', item);
                }
            }
        });

        return data;
    }

    // remove all entries that have been stored for more than 24hours
    refresh() {
        const keys = this.storage.getAllKeys();
        const now = Date.now();
        keys.forEach((key) => {
            let expiryDate = parseInt(key.split(' ')[1]);
            if (now >= expiryDate) {
                this.storage.delete(key);
            }
        });
    }
}
