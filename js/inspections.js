/**
 * Inspections Module - Manage inspection forms and data
 */
const Inspections = {
    currentInspection: null,
    
    async init() {
        // Any initialization needed
    },
    
    async getAll() {
        const inspections = await DB.getAll(DB.stores.inspections);
        return inspections.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    },
    
    async getByStatus(status) {
        return DB.getByIndex(DB.stores.inspections, 'status', status);
    },
    
    async get(id) {
        return DB.get(DB.stores.inspections, id);
    },
    
    async create(templateId) {
        const template = await Templates.get(templateId);
        if (!template) throw new Error('Template not found');
        
        const inspection = {
            templateId: templateId,
            templateName: template.name,
            title: `${template.name} - ${new Date().toLocaleDateString()}`,
            status: 'draft',
            data: {},
            photos: [],
            signatures: {},
            location: null
        };
        
        // Initialize default values
        template.fields.forEach(field => {
            if (field.type === 'checkbox') {
                inspection.data[field.id] = false;
            } else if (field.type === 'photo') {
                inspection.data[field.id] = [];
            } else if (field.type === 'slider') {
                inspection.data[field.id] = field.min || 0;
            } else if (field.type === 'rating') {
                inspection.data[field.id] = 0;
            } else {
                inspection.data[field.id] = '';
            }
        });
        
        // Try to get current location
        if (navigator.geolocation) {
            try {
                const position = await this.getCurrentPosition();
                inspection.location = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                    timestamp: new Date().toISOString()
                };
            } catch (e) {
                console.log('Could not get location:', e.message);
            }
        }
        
        return DB.add(DB.stores.inspections, inspection);
    },
    
    async update(inspection) {
        inspection.updatedAt = new Date().toISOString();
        return DB.update(DB.stores.inspections, inspection);
    },
    
    async delete(id) {
        // Delete associated photos
        const photos = await DB.getByIndex(DB.stores.photos, 'inspectionId', id);
        for (const photo of photos) {
            await DB.delete(DB.stores.photos, photo.id);
        }
        return DB.delete(DB.stores.inspections, id);
    },
    
    async complete(id) {
        const inspection = await this.get(id);
        if (!inspection) throw new Error('Inspection not found');
        
        inspection.status = 'complete';
        inspection.completedAt = new Date().toISOString();
        
        return this.update(inspection);
    },
    
    async savePhoto(inspectionId, fieldId, imageData) {
        const photo = {
            id: DB.generateId(),
            inspectionId: inspectionId,
            fieldId: fieldId,
            data: imageData,
            timestamp: new Date().toISOString()
        };
        
        await DB.add(DB.stores.photos, photo);
        return photo;
    },
    
    async getPhotos(inspectionId) {
        return DB.getByIndex(DB.stores.photos, 'inspectionId', inspectionId);
    },
    
    async deletePhoto(photoId) {
        return DB.delete(DB.stores.photos, photoId);
    },
    
    getCurrentPosition() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000
            });
        });
    },
    
    async validate(inspection, template) {
        const errors = [];
        
        for (const field of template.fields) {
            if (field.required) {
                const value = inspection.data[field.id];
                
                if (field.type === 'photo') {
                    if (!value || value.length === 0) {
                        errors.push(`${field.label} is required`);
                    }
                } else if (field.type === 'signature') {
                    if (!inspection.signatures[field.id]) {
                        errors.push(`${field.label} is required`);
                    }
                } else if (field.type === 'checkbox') {
                    // Checkbox required means must be checked
                    if (!value) {
                        errors.push(`${field.label} must be checked`);
                    }
                } else if (!value || (typeof value === 'string' && value.trim() === '')) {
                    errors.push(`${field.label} is required`);
                }
            }
        }
        
        return { valid: errors.length === 0, errors };
    },
    
    getCompletionPercentage(inspection, template) {
        if (!template || !template.fields) return 0;
        
        let filled = 0;
        let total = 0;
        
        for (const field of template.fields) {
            if (field.type === 'section' || field.type === 'note') continue;
            
            total++;
            const value = inspection.data[field.id];
            
            if (field.type === 'photo') {
                if (value && value.length > 0) filled++;
            } else if (field.type === 'signature') {
                if (inspection.signatures && inspection.signatures[field.id]) filled++;
            } else if (field.type === 'checkbox') {
                if (value === true) filled++;
            } else if (value !== null && value !== undefined && value !== '') {
                filled++;
            }
        }
        
        return total > 0 ? Math.round((filled / total) * 100) : 0;
    },
    
    async search(query) {
        const all = await this.getAll();
        const q = query.toLowerCase();
        
        return all.filter(inspection => 
            inspection.title.toLowerCase().includes(q) ||
            inspection.templateName.toLowerCase().includes(q) ||
            Object.values(inspection.data).some(v => 
                typeof v === 'string' && v.toLowerCase().includes(q)
            )
        );
    },
    
    async duplicate(id) {
        const original = await this.get(id);
        if (!original) return null;
        
        const duplicate = { ...original };
        delete duplicate.id;
        duplicate.title = `${original.title} (Copy)`;
        duplicate.status = 'draft';
        duplicate.createdAt = null;
        duplicate.completedAt = null;
        
        return DB.add(DB.stores.inspections, duplicate);
    }
};

window.Inspections = Inspections;
