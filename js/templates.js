/**
 * Templates Module - Manage inspection form templates
 */
const Templates = {
    // Available field types
    fieldTypes: [
        { id: 'text', name: 'Text Input', icon: 'type' },
        { id: 'textarea', name: 'Long Text', icon: 'align-left' },
        { id: 'number', name: 'Number', icon: 'hash' },
        { id: 'select', name: 'Dropdown', icon: 'chevron-down' },
        { id: 'checkbox', name: 'Checkbox', icon: 'check-square' },
        { id: 'radio', name: 'Radio Choice', icon: 'circle' },
        { id: 'date', name: 'Date', icon: 'calendar' },
        { id: 'time', name: 'Time', icon: 'clock' },
        { id: 'datetime', name: 'Date & Time', icon: 'calendar' },
        { id: 'photo', name: 'Photo', icon: 'camera' },
        { id: 'signature', name: 'Signature', icon: 'pen-tool' },
        { id: 'location', name: 'GPS Location', icon: 'map-pin' },
        { id: 'slider', name: 'Slider', icon: 'sliders' },
        { id: 'rating', name: 'Star Rating', icon: 'star' },
        { id: 'section', name: 'Section Header', icon: 'layout' },
        { id: 'note', name: 'Info Note', icon: 'info' }
    ],
    
    // Default templates for common inspection types
    defaultTemplates: [
        {
            id: 'default-safety',
            name: 'Safety Inspection',
            description: 'General workplace safety inspection checklist',
            icon: 'shield',
            isDefault: true,
            fields: [
                { id: 'section-general', type: 'section', label: 'General Information' },
                { id: 'inspector', type: 'text', label: 'Inspector Name', required: true },
                { id: 'date', type: 'date', label: 'Inspection Date', required: true },
                { id: 'location', type: 'location', label: 'Location' },
                { id: 'section-conditions', type: 'section', label: 'Site Conditions' },
                { id: 'weather', type: 'select', label: 'Weather Conditions', options: ['Clear', 'Cloudy', 'Rain', 'Snow', 'Windy'] },
                { id: 'ground-conditions', type: 'select', label: 'Ground Conditions', options: ['Dry', 'Wet', 'Muddy', 'Icy', 'Snow-covered'] },
                { id: 'visibility', type: 'slider', label: 'Visibility', min: 0, max: 100, unit: '%' },
                { id: 'section-safety', type: 'section', label: 'Safety Checklist' },
                { id: 'ppe-available', type: 'checkbox', label: 'PPE Available and in use' },
                { id: 'signage', type: 'checkbox', label: 'Safety signage visible' },
                { id: 'emergency-exits', type: 'checkbox', label: 'Emergency exits clear' },
                { id: 'fire-extinguishers', type: 'checkbox', label: 'Fire extinguishers accessible' },
                { id: 'first-aid', type: 'checkbox', label: 'First aid kit available' },
                { id: 'hazards', type: 'textarea', label: 'Observed Hazards' },
                { id: 'section-photos', type: 'section', label: 'Documentation' },
                { id: 'photos', type: 'photo', label: 'Site Photos', multiple: true },
                { id: 'overall-rating', type: 'rating', label: 'Overall Safety Rating' },
                { id: 'notes', type: 'textarea', label: 'Additional Notes' },
                { id: 'section-sign', type: 'section', label: 'Sign-off' },
                { id: 'signature', type: 'signature', label: 'Inspector Signature', required: true }
            ]
        },
        {
            id: 'default-equipment',
            name: 'Equipment Inspection',
            description: 'Equipment condition and maintenance check',
            icon: 'tool',
            isDefault: true,
            fields: [
                { id: 'section-info', type: 'section', label: 'Equipment Information' },
                { id: 'equipment-id', type: 'text', label: 'Equipment ID', required: true },
                { id: 'equipment-name', type: 'text', label: 'Equipment Name', required: true },
                { id: 'manufacturer', type: 'text', label: 'Manufacturer' },
                { id: 'model', type: 'text', label: 'Model Number' },
                { id: 'serial', type: 'text', label: 'Serial Number' },
                { id: 'date', type: 'datetime', label: 'Inspection Date/Time', required: true },
                { id: 'section-condition', type: 'section', label: 'Condition Assessment' },
                { id: 'overall-condition', type: 'select', label: 'Overall Condition', options: ['Excellent', 'Good', 'Fair', 'Poor', 'Critical'], required: true },
                { id: 'operational', type: 'radio', label: 'Operational Status', options: ['Fully Operational', 'Limited Operation', 'Non-operational'] },
                { id: 'hour-meter', type: 'number', label: 'Hour Meter Reading' },
                { id: 'section-checks', type: 'section', label: 'Inspection Checklist' },
                { id: 'visual-damage', type: 'checkbox', label: 'No visible damage' },
                { id: 'leaks', type: 'checkbox', label: 'No fluid leaks' },
                { id: 'guards', type: 'checkbox', label: 'All guards in place' },
                { id: 'controls', type: 'checkbox', label: 'Controls functioning' },
                { id: 'safety-devices', type: 'checkbox', label: 'Safety devices operational' },
                { id: 'lubrication', type: 'checkbox', label: 'Properly lubricated' },
                { id: 'section-issues', type: 'section', label: 'Issues Found' },
                { id: 'issues', type: 'textarea', label: 'Describe any issues' },
                { id: 'issue-photos', type: 'photo', label: 'Photos of Issues', multiple: true },
                { id: 'action-required', type: 'select', label: 'Action Required', options: ['None', 'Minor Repair', 'Major Repair', 'Replace', 'Out of Service'] },
                { id: 'section-sign', type: 'section', label: 'Sign-off' },
                { id: 'inspector', type: 'text', label: 'Inspector Name', required: true },
                { id: 'signature', type: 'signature', label: 'Signature', required: true }
            ]
        },
        {
            id: 'default-slope',
            name: 'Slope Stability Check',
            description: 'Geotechnical slope inspection form',
            icon: 'mountain',
            isDefault: true,
            fields: [
                { id: 'section-info', type: 'section', label: 'Location Information' },
                { id: 'date', type: 'datetime', label: 'Inspection Date/Time', required: true },
                { id: 'inspector', type: 'text', label: 'Inspector Name', required: true },
                { id: 'location', type: 'location', label: 'GPS Coordinates' },
                { id: 'bench-level', type: 'text', label: 'Bench/Level ID' },
                { id: 'sector', type: 'text', label: 'Sector/Area' },
                { id: 'section-conditions', type: 'section', label: 'Conditions' },
                { id: 'weather', type: 'select', label: 'Weather', options: ['Clear', 'Overcast', 'Light Rain', 'Heavy Rain', 'Snow', 'Freezing'] },
                { id: 'recent-precip', type: 'checkbox', label: 'Precipitation in last 24hrs' },
                { id: 'temp', type: 'number', label: 'Temperature (°F)' },
                { id: 'section-observations', type: 'section', label: 'Slope Observations' },
                { id: 'tension-cracks', type: 'checkbox', label: 'Tension cracks observed' },
                { id: 'crack-width', type: 'number', label: 'Crack width (inches)' },
                { id: 'seepage', type: 'checkbox', label: 'Groundwater seepage' },
                { id: 'raveling', type: 'checkbox', label: 'Raveling/spalling' },
                { id: 'undercutting', type: 'checkbox', label: 'Undercutting observed' },
                { id: 'rockfall', type: 'checkbox', label: 'Recent rockfall evidence' },
                { id: 'movement', type: 'select', label: 'Visible Movement', options: ['None', 'Minor (<1")', 'Moderate (1-6")', 'Significant (>6")'] },
                { id: 'stability-rating', type: 'slider', label: 'Stability Rating', min: 1, max: 5, unit: '' },
                { id: 'section-hazards', type: 'section', label: 'Hazard Assessment' },
                { id: 'hazard-level', type: 'select', label: 'Hazard Level', options: ['Low', 'Moderate', 'High', 'Critical'], required: true },
                { id: 'personnel-risk', type: 'checkbox', label: 'Risk to personnel' },
                { id: 'equipment-risk', type: 'checkbox', label: 'Risk to equipment' },
                { id: 'access-risk', type: 'checkbox', label: 'Risk to access roads' },
                { id: 'section-photos', type: 'section', label: 'Photo Documentation' },
                { id: 'overview-photo', type: 'photo', label: 'Overview Photo', multiple: false },
                { id: 'detail-photos', type: 'photo', label: 'Detail Photos', multiple: true },
                { id: 'section-recommendations', type: 'section', label: 'Recommendations' },
                { id: 'action', type: 'select', label: 'Recommended Action', options: ['Continue Monitoring', 'Increase Monitoring', 'Engineering Review', 'Restrict Access', 'Immediate Action Required'] },
                { id: 'notes', type: 'textarea', label: 'Detailed Notes' },
                { id: 'followup-date', type: 'date', label: 'Follow-up Inspection Date' },
                { id: 'section-sign', type: 'section', label: 'Sign-off' },
                { id: 'signature', type: 'signature', label: 'Inspector Signature', required: true }
            ]
        }
    ],
    
    async init() {
        const existing = await DB.getAll(DB.stores.templates);
        if (existing.length === 0) {
            for (const template of this.defaultTemplates) {
                await DB.add(DB.stores.templates, { ...template });
            }
        }
    },
    
    async getAll() {
        return DB.getAll(DB.stores.templates);
    },
    
    async get(id) {
        return DB.get(DB.stores.templates, id);
    },
    
    async create(template) {
        template.isDefault = false;
        return DB.add(DB.stores.templates, template);
    },
    
    async update(template) {
        return DB.update(DB.stores.templates, template);
    },
    
    async delete(id) {
        return DB.delete(DB.stores.templates, id);
    },
    
    async duplicate(id) {
        const original = await this.get(id);
        if (!original) return null;
        
        const duplicate = { ...original };
        delete duplicate.id;
        duplicate.name = `${original.name} (Copy)`;
        duplicate.isDefault = false;
        duplicate.fields = original.fields.map(f => ({ ...f, id: DB.generateId() }));
        
        return this.create(duplicate);
    },
    
    getFieldType(typeId) {
        return this.fieldTypes.find(t => t.id === typeId);
    },
    
    validate(template) {
        const errors = [];
        if (!template.name || template.name.trim() === '') {
            errors.push('Template name is required');
        }
        if (!template.fields || template.fields.length === 0) {
            errors.push('Template must have at least one field');
        }
        return { valid: errors.length === 0, errors };
    },
    
    createField(type = 'text') {
        const field = {
            id: DB.generateId(),
            type: type,
            label: '',
            required: false
        };
        
        if (type === 'select' || type === 'radio') {
            field.options = ['Option 1', 'Option 2'];
        }
        if (type === 'slider') {
            field.min = 0;
            field.max = 100;
            field.unit = '';
        }
        if (type === 'number') {
            field.min = null;
            field.max = null;
        }
        if (type === 'photo') {
            field.multiple = true;
        }
        
        return field;
    }
};

window.Templates = Templates;
