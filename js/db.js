/**
 * Database Module - IndexedDB wrapper for offline storage
 */
const DB = {
    name: 'FieldInspectorDB',
    version: 1,
    db: null,
    
    stores: {
        templates: 'templates',
        inspections: 'inspections',
        reports: 'reports',
        settings: 'settings',
        photos: 'photos'
    },
    
    /**
     * Initialize the database
     */
    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.name, this.version);
            
            request.onerror = () => {
                console.error('Failed to open database:', request.error);
                reject(request.error);
            };
            
            request.onsuccess = () => {
                this.db = request.result;
                console.log('Database opened successfully');
                // Request persistent storage so IndexedDB data is not evicted
                if (navigator.storage && navigator.storage.persist) {
                    navigator.storage.persist().then(granted => {
                        console.log('Persistent storage:', granted ? 'granted' : 'denied');
                    });
                }
                resolve(this.db);
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                // Templates store
                if (!db.objectStoreNames.contains(this.stores.templates)) {
                    const templateStore = db.createObjectStore(this.stores.templates, { keyPath: 'id' });
                    templateStore.createIndex('name', 'name', { unique: false });
                    templateStore.createIndex('createdAt', 'createdAt', { unique: false });
                    templateStore.createIndex('updatedAt', 'updatedAt', { unique: false });
                }
                
                // Inspections store
                if (!db.objectStoreNames.contains(this.stores.inspections)) {
                    const inspectionStore = db.createObjectStore(this.stores.inspections, { keyPath: 'id' });
                    inspectionStore.createIndex('templateId', 'templateId', { unique: false });
                    inspectionStore.createIndex('status', 'status', { unique: false });
                    inspectionStore.createIndex('createdAt', 'createdAt', { unique: false });
                    inspectionStore.createIndex('updatedAt', 'updatedAt', { unique: false });
                }
                
                // Reports store
                if (!db.objectStoreNames.contains(this.stores.reports)) {
                    const reportStore = db.createObjectStore(this.stores.reports, { keyPath: 'id' });
                    reportStore.createIndex('inspectionId', 'inspectionId', { unique: false });
                    reportStore.createIndex('createdAt', 'createdAt', { unique: false });
                }
                
                // Settings store
                if (!db.objectStoreNames.contains(this.stores.settings)) {
                    db.createObjectStore(this.stores.settings, { keyPath: 'key' });
                }
                
                // Photos store (for blob storage)
                if (!db.objectStoreNames.contains(this.stores.photos)) {
                    const photoStore = db.createObjectStore(this.stores.photos, { keyPath: 'id' });
                    photoStore.createIndex('inspectionId', 'inspectionId', { unique: false });
                }
                
                console.log('Database schema created/upgraded');
            };
        });
    },
    
    /**
     * Generate a unique ID
     */
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
    },
    
    /**
     * Get a transaction for the specified stores
     */
    getTransaction(storeNames, mode = 'readonly') {
        if (!Array.isArray(storeNames)) {
            storeNames = [storeNames];
        }
        return this.db.transaction(storeNames, mode);
    },
    
    /**
     * Add an item to a store
     */
    async add(storeName, item) {
        return new Promise((resolve, reject) => {
            const transaction = this.getTransaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            
            if (!item.id) {
                item.id = this.generateId();
            }
            
            const now = new Date().toISOString();
            item.createdAt = item.createdAt || now;
            item.updatedAt = now;
            
            const request = store.add(item);
            
            request.onsuccess = () => resolve(item);
            request.onerror = () => reject(request.error);
        });
    },
    
    /**
     * Update an item in a store
     */
    async update(storeName, item) {
        return new Promise((resolve, reject) => {
            const transaction = this.getTransaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            
            item.updatedAt = new Date().toISOString();
            
            const request = store.put(item);
            
            request.onsuccess = () => resolve(item);
            request.onerror = () => reject(request.error);
        });
    },
    
    /**
     * Get an item by ID
     */
    async get(storeName, id) {
        return new Promise((resolve, reject) => {
            const transaction = this.getTransaction(storeName);
            const store = transaction.objectStore(storeName);
            const request = store.get(id);
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },
    
    /**
     * Get all items from a store
     */
    async getAll(storeName) {
        return new Promise((resolve, reject) => {
            const transaction = this.getTransaction(storeName);
            const store = transaction.objectStore(storeName);
            const request = store.getAll();
            
            request.onsuccess = () => resolve(request.result || []);
            request.onerror = () => reject(request.error);
        });
    },
    
    /**
     * Get items by index
     */
    async getByIndex(storeName, indexName, value) {
        return new Promise((resolve, reject) => {
            const transaction = this.getTransaction(storeName);
            const store = transaction.objectStore(storeName);
            const index = store.index(indexName);
            const request = index.getAll(value);
            
            request.onsuccess = () => resolve(request.result || []);
            request.onerror = () => reject(request.error);
        });
    },
    
    /**
     * Delete an item
     */
    async delete(storeName, id) {
        return new Promise((resolve, reject) => {
            const transaction = this.getTransaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.delete(id);
            
            request.onsuccess = () => resolve(true);
            request.onerror = () => reject(request.error);
        });
    },
    
    /**
     * Clear a store
     */
    async clear(storeName) {
        return new Promise((resolve, reject) => {
            const transaction = this.getTransaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.clear();
            
            request.onsuccess = () => resolve(true);
            request.onerror = () => reject(request.error);
        });
    },
    
    /**
     * Clear all stores
     */
    async clearAll() {
        const promises = Object.values(this.stores).map(store => this.clear(store));
        return Promise.all(promises);
    },
    
    /**
     * Get storage estimate
     */
    async getStorageEstimate() {
        if ('storage' in navigator && 'estimate' in navigator.storage) {
            const estimate = await navigator.storage.estimate();
            return {
                usage: estimate.usage,
                quota: estimate.quota,
                usagePercent: ((estimate.usage / estimate.quota) * 100).toFixed(2)
            };
        }
        return null;
    },
    
    /**
     * Export all data
     */
    async exportAll() {
        const data = {};
        for (const [key, storeName] of Object.entries(this.stores)) {
            data[key] = await this.getAll(storeName);
        }
        return data;
    },
    
    /**
     * Import data
     */
    async importAll(data) {
        for (const [key, items] of Object.entries(data)) {
            const storeName = this.stores[key];
            if (storeName && Array.isArray(items)) {
                for (const item of items) {
                    await this.update(storeName, item);
                }
            }
        }
    },
    
    // Settings helpers
    async getSetting(key) {
        const result = await this.get(this.stores.settings, key);
        return result ? result.value : null;
    },
    
    async setSetting(key, value) {
        return this.update(this.stores.settings, { key, value });
    }
};

// Export for use
window.DB = DB;
