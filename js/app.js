/**
 * Main Application - Field Inspector
 */
const App = {
    currentView: 'inspections',
    currentInspection: null,
    currentTemplate: null,
    currentReport: null,
    isEditing: false,
    
    async init() {
        try {
            await DB.init();
            await Templates.init();
            await Inspections.init();
            await Reports.init();
            await this.loadSettings();
            this.setupEventListeners();
            await this.loadView('inspections');
            await this.updateStorageInfo();
            
            setTimeout(() => {
                document.getElementById('splash-screen').classList.add('hidden');
            }, 1000);
            
            this.updateOnlineStatus();
            window.addEventListener('online', () => this.updateOnlineStatus());
            window.addEventListener('offline', () => this.updateOnlineStatus());
        } catch (error) {
            console.error('Failed to initialize:', error);
            UI.toast('Failed to initialize app', 'error');
        }
    },
    
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => this.loadView(btn.dataset.view));
        });
        
        document.getElementById('back-btn').addEventListener('click', () => this.goBack());
        document.getElementById('add-btn').addEventListener('click', () => this.handleAddButton());
        
        // Modal
        document.getElementById('modal-close').addEventListener('click', () => UI.hideModal());
        document.getElementById('modal-overlay').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) UI.hideModal();
        });
        
        // Search
        document.getElementById('search-inspections').addEventListener('input', (e) => {
            this.filterInspections(e.target.value);
        });
        document.getElementById('search-templates').addEventListener('input', (e) => {
            this.filterTemplates(e.target.value);
        });
        
        // Filter tabs
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.filterInspections(document.getElementById('search-inspections').value, tab.dataset.filter);
            });
        });
        
        this.setupSettingsListeners();
        this.setupCameraListeners();
        this.setupSignatureListeners();
    },
    
    setupSettingsListeners() {
        ['inspector-name', 'company', 'email'].forEach(id => {
            const input = document.getElementById(`setting-${id}`);
            input.addEventListener('change', () => {
                DB.setSetting(id.replace(/-/g, ''), input.value);
                UI.toast('Setting saved', 'success');
            });
        });
        
        ['autosave', 'gps', 'hq-photos'].forEach(id => {
            const input = document.getElementById(`setting-${id}`);
            input.addEventListener('change', () => DB.setSetting(id, input.checked));
        });
        
        document.getElementById('export-data-btn').addEventListener('click', async () => {
            const data = await DB.exportAll();
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `field-inspector-backup-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
            UI.toast('Data exported', 'success');
        });
        
        document.getElementById('import-data-btn').addEventListener('click', () => {
            document.getElementById('import-file').click();
        });
        
        document.getElementById('import-file').addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            try {
                const text = await file.text();
                const data = JSON.parse(text);
                await DB.importAll(data);
                UI.toast('Data imported', 'success');
                this.loadView(this.currentView);
            } catch (error) {
                UI.toast('Failed to import', 'error');
            }
            e.target.value = '';
        });
        
        document.getElementById('clear-data-btn').addEventListener('click', async () => {
            const confirmed = await UI.confirm('Clear All Data', 'This will permanently delete everything.');
            if (confirmed) {
                await DB.clearAll();
                await Templates.init();
                UI.toast('All data cleared', 'success');
                this.loadView('inspections');
            }
        });
    },
    
    setupCameraListeners() {
        document.getElementById('camera-close').addEventListener('click', () => this.closeCamera());
        
        document.getElementById('camera-switch').addEventListener('click', async () => {
            this._facingMode = this._facingMode === 'environment' ? 'user' : 'environment';
            await this.startCamera(this._facingMode);
        });
        
        document.getElementById('camera-capture').addEventListener('click', () => {
            const video = document.getElementById('camera-video');
            const canvas = document.getElementById('camera-canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0);
            const imageData = canvas.toDataURL('image/jpeg', 0.8);
            this.closeCamera();
            if (this._photoCallback) {
                this._photoCallback(imageData);
                this._photoCallback = null;
            }
        });
    },
    
    async openCamera(callback) {
        this._photoCallback = callback;
        this._facingMode = 'environment';
        document.getElementById('camera-modal').classList.add('visible');
        await this.startCamera('environment');
    },
    
    async startCamera(facingMode) {
        const video = document.getElementById('camera-video');
        if (this._cameraStream) {
            this._cameraStream.getTracks().forEach(t => t.stop());
        }
        try {
            this._cameraStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode, width: { ideal: 1920 }, height: { ideal: 1080 } }
            });
            video.srcObject = this._cameraStream;
        } catch (error) {
            UI.toast('Could not access camera', 'error');
            this.closeCamera();
        }
    },
    
    closeCamera() {
        document.getElementById('camera-modal').classList.remove('visible');
        if (this._cameraStream) {
            this._cameraStream.getTracks().forEach(t => t.stop());
            this._cameraStream = null;
        }
    },
    
    setupSignatureListeners() {
        const modal = document.getElementById('signature-modal');
        const canvas = document.getElementById('signature-canvas');
        let ctx, isDrawing = false, lastX = 0, lastY = 0;
        
        const getPos = (e) => {
            const rect = canvas.getBoundingClientRect();
            const touch = e.touches ? e.touches[0] : e;
            return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
        };
        
        const startDraw = (e) => {
            isDrawing = true;
            const pos = getPos(e);
            lastX = pos.x;
            lastY = pos.y;
        };
        
        const draw = (e) => {
            if (!isDrawing) return;
            e.preventDefault();
            const pos = getPos(e);
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
            lastX = pos.x;
            lastY = pos.y;
        };
        
        const endDraw = () => { isDrawing = false; };
        
        canvas.addEventListener('mousedown', startDraw);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', endDraw);
        canvas.addEventListener('mouseout', endDraw);
        canvas.addEventListener('touchstart', startDraw);
        canvas.addEventListener('touchmove', draw);
        canvas.addEventListener('touchend', endDraw);
        
        document.getElementById('signature-close').addEventListener('click', () => {
            modal.classList.remove('visible');
        });
        
        document.getElementById('signature-clear').addEventListener('click', () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });
        
        document.getElementById('signature-save').addEventListener('click', () => {
            const imageData = canvas.toDataURL('image/png');
            modal.classList.remove('visible');
            if (this._signatureCallback) {
                this._signatureCallback(imageData);
                this._signatureCallback = null;
            }
        });
        
        this._initSignatureCanvas = () => {
            // Use offsetWidth/offsetHeight (integer pixels) so the canvas intrinsic
            // size exactly matches its CSS-rendered size — prevents flex overflow on desktop.
            canvas.width  = canvas.offsetWidth  || 300;
            canvas.height = canvas.offsetHeight || 200;
            ctx = canvas.getContext('2d');
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        };
    },
    
    openSignature(callback) {
        this._signatureCallback = callback;
        document.getElementById('signature-modal').classList.add('visible');
        // Double rAF ensures the browser has fully laid out the modal before
        // we sample the canvas dimensions (more reliable than a fixed timeout,
        // especially on desktop Chrome where layout timing differs from mobile).
        requestAnimationFrame(() => requestAnimationFrame(() => this._initSignatureCanvas()));
    },
    
    async loadView(viewName) {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === viewName);
        });
        
        document.querySelectorAll('.view').forEach(view => {
            view.classList.toggle('active', view.id === `view-${viewName}`);
        });
        
        const titles = { inspections: 'Inspections', templates: 'Templates', reports: 'Reports', settings: 'Settings' };
        document.getElementById('header-title').textContent = titles[viewName] || viewName;
        
        const addBtn = document.getElementById('add-btn');
        addBtn.classList.toggle('hidden', viewName === 'settings' || viewName === 'reports');
        
        document.getElementById('back-btn').classList.add('hidden');
        document.getElementById('bottom-nav').style.display = '';
        
        this.currentView = viewName;
        
        switch (viewName) {
            case 'inspections': await this.loadInspections(); break;
            case 'templates': await this.loadTemplates(); break;
            case 'reports': await this.loadReports(); break;
            case 'settings': await this.loadSettings(); break;
        }
    },
    
    async loadInspections() {
        const list = document.getElementById('inspection-list');
        const empty = document.getElementById('empty-inspections');
        const inspections = await Inspections.getAll();
        
        list.innerHTML = '';
        
        if (inspections.length === 0) {
            empty.classList.add('visible');
            list.style.display = 'none';
        } else {
            empty.classList.remove('visible');
            list.style.display = '';
            inspections.forEach(i => {
                list.appendChild(UI.renderInspectionCard(i, (ins) => this.openInspection(ins.id)));
            });
        }
    },
    
    async loadTemplates() {
        const list = document.getElementById('template-list');
        const empty = document.getElementById('empty-templates');
        const templates = await Templates.getAll();
        
        list.innerHTML = '';
        
        if (templates.length === 0) {
            empty.classList.add('visible');
            list.style.display = 'none';
        } else {
            empty.classList.remove('visible');
            list.style.display = '';
            templates.forEach(t => {
                list.appendChild(UI.renderTemplateCard(t, (tmpl) => this.showTemplateOptions(tmpl)));
            });
        }
    },
    
    async loadReports() {
        const list = document.getElementById('report-list');
        const empty = document.getElementById('empty-reports');
        const reports = await Reports.getAll();
        
        list.innerHTML = '';
        
        if (reports.length === 0) {
            empty.classList.add('visible');
            list.style.display = 'none';
        } else {
            empty.classList.remove('visible');
            list.style.display = '';
            reports.forEach(r => {
                    list.appendChild(UI.renderReportCard(r, (rep) => this.openReport(rep.id), async (rep) => {
                        const confirmed = await UI.confirm('Delete Report', `Delete "${rep.title}"? This cannot be undone.`);
                        if (confirmed) {
                            await Reports.delete(rep.id);
                            UI.toast('Report deleted', 'success');
                            this.loadReports();
                        }
                    }));
                });
        }
    },
    
    async loadSettings() {
        const inspectorName = await DB.getSetting('inspectorname');
        const company = await DB.getSetting('company');
        const email = await DB.getSetting('email');
        
        if (inspectorName) document.getElementById('setting-inspector-name').value = inspectorName;
        if (company) document.getElementById('setting-company').value = company;
        if (email) document.getElementById('setting-email').value = email;
        
        document.getElementById('setting-autosave').checked = await DB.getSetting('autosave') !== false;
        document.getElementById('setting-gps').checked = await DB.getSetting('gps') !== false;
        document.getElementById('setting-hq-photos').checked = await DB.getSetting('hq-photos') === true;
    },
    
    async updateStorageInfo() {
        const info = await DB.getStorageEstimate();
        if (info) {
            document.getElementById('storage-info').textContent = 
                `Storage: ${UI.formatBytes(info.usage)} / ${UI.formatBytes(info.quota)} (${info.usagePercent}%)`;
        }
    },
    
    updateOnlineStatus() {
        const dot = document.querySelector('.sync-dot');
        const text = document.querySelector('.sync-text');
        if (navigator.onLine) {
            dot.classList.remove('offline');
            text.textContent = 'Online';
        } else {
            dot.classList.add('offline');
            text.textContent = 'Offline';
        }
    },
    
    handleAddButton() {
        if (this.currentView === 'inspections') this.showNewInspectionModal();
        else if (this.currentView === 'templates') this.openTemplateBuilder();
    },
    
    async showNewInspectionModal() {
        const templates = await Templates.getAll();
        let content = '<div class="template-select-list">';
        templates.forEach(t => {
            content += `
                <div class="template-select-item" data-id="${t.id}">
                    <div class="card-icon">${UI.getIcon(t.icon || 'layout')}</div>
                    <div>
                        <div class="card-title">${t.name}</div>
                        <div class="card-subtitle">${t.description || ''}</div>
                    </div>
                </div>
            `;
        });
        content += '</div>';
        content += `<style>
            .template-select-list { display: flex; flex-direction: column; gap: 10px; }
            .template-select-item { display: flex; align-items: center; gap: 12px; padding: 14px; 
                background: var(--bg-tertiary); border-radius: var(--radius-md); cursor: pointer; 
                border: 2px solid transparent; transition: all 0.2s; }
            .template-select-item:hover { border-color: var(--accent-primary); }
            .template-select-item .card-icon { width: 40px; height: 40px; background: rgba(0,212,170,0.1);
                border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center;
                color: var(--accent-primary); }
            .template-select-item .card-icon svg { width: 22px; height: 22px; }
        </style>`;
        
        UI.showModal('New Inspection', content, []);
        
        document.querySelectorAll('.template-select-item').forEach(item => {
            item.addEventListener('click', async () => {
                UI.hideModal();
                const inspection = await Inspections.create(item.dataset.id);
                this.openInspection(inspection.id);
            });
        });
    },
    
    async showTemplateOptions(template) {
        const content = `
            <div class="template-options">
                <button class="option-btn" data-action="use">${UI.icons['check-square']}<span>Start Inspection</span></button>
                <button class="option-btn" data-action="edit">${UI.icons.edit}<span>Edit Template</span></button>
                <button class="option-btn" data-action="duplicate">${UI.icons.layout}<span>Duplicate</span></button>
                ${!template.isDefault ? `<button class="option-btn danger" data-action="delete">${UI.icons.trash}<span>Delete</span></button>` : ''}
            </div>
            <style>
                .template-options { display: flex; flex-direction: column; gap: 8px; }
                .option-btn { display: flex; align-items: center; gap: 12px; padding: 14px 16px;
                    background: var(--bg-tertiary); border: 1px solid var(--border-color);
                    border-radius: var(--radius-md); color: var(--text-primary); cursor: pointer;
                    transition: all 0.2s; text-align: left; }
                .option-btn:hover { border-color: var(--accent-primary); }
                .option-btn svg { width: 20px; height: 20px; color: var(--accent-primary); }
                .option-btn.danger svg { color: var(--accent-danger); }
                .option-btn.danger:hover { border-color: var(--accent-danger); }
            </style>
        `;
        
        UI.showModal(template.name, content, []);
        
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                const action = btn.dataset.action;
                UI.hideModal();
                
                switch (action) {
                    case 'use':
                        const inspection = await Inspections.create(template.id);
                        this.openInspection(inspection.id);
                        break;
                    case 'edit':
                        this.openTemplateBuilder(template.id);
                        break;
                    case 'duplicate':
                        await Templates.duplicate(template.id);
                        this.loadTemplates();
                        UI.toast('Template duplicated', 'success');
                        break;
                    case 'delete':
                        if (await UI.confirm('Delete Template', `Delete "${template.name}"?`)) {
                            await Templates.delete(template.id);
                            this.loadTemplates();
                            UI.toast('Template deleted', 'success');
                        }
                        break;
                }
            });
        });
    },
    
    async openInspection(id) {
        const inspection = await Inspections.get(id);
        if (!inspection) return UI.toast('Inspection not found', 'error');
        
        const template = await Templates.get(inspection.templateId);
        if (!template) return UI.toast('Template not found', 'error');
        
        this.currentInspection = inspection;
        this.currentTemplate = template;
        
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById('view-inspection-form').classList.add('active');
        document.getElementById('header-title').textContent = inspection.title;
        document.getElementById('back-btn').classList.remove('hidden');
        document.getElementById('add-btn').classList.add('hidden');
        document.getElementById('bottom-nav').style.display = 'none';
        
        await this.renderInspectionForm();
    },
    
    async renderInspectionForm() {
        const container = document.getElementById('inspection-form-container');
        container.innerHTML = '';
        
        const { currentInspection: inspection, currentTemplate: template } = this;
        const photos = await Inspections.getPhotos(inspection.id);
        
        for (const field of template.fields) {
            const value = inspection.data[field.id];
            const fieldEl = UI.renderFormField(field, value);
            container.appendChild(fieldEl);
            
            if (field.type === 'photo') {
                const grid = fieldEl.querySelector('.photo-grid');
                photos.filter(p => p.fieldId === field.id).forEach(photo => {
                    const item = document.createElement('div');
                    item.className = 'photo-item';
                    item.innerHTML = `<img src="${photo.data}" alt="Photo"><button class="delete-btn" data-photo-id="${photo.id}">&times;</button>`;
                    grid.insertBefore(item, grid.lastElementChild);
                });
            }
            
            if (field.type === 'signature' && inspection.signatures?.[field.id]) {
                const preview = fieldEl.querySelector('.signature-preview');
                preview.classList.remove('empty');
                preview.innerHTML = `<img src="${inspection.signatures[field.id]}" alt="Signature">`;
            }
        }
        
        const actions = document.createElement('div');
        actions.className = 'form-actions';
        actions.innerHTML = `
            <button class="form-btn secondary" id="save-draft-btn">Save Draft</button>
            <button class="form-btn primary" id="complete-btn">Complete</button>
        `;
        container.appendChild(actions);
        
        this.setupFormListeners();
    },
    
    setupFormListeners() {
        const container = document.getElementById('inspection-form-container');
        
        container.addEventListener('change', async (e) => {
            const fieldId = e.target.dataset.fieldId;
            if (!fieldId) return;
            
            let value = e.target.value;
            if (e.target.type === 'checkbox') value = e.target.checked;
            else if (e.target.type === 'number') value = parseFloat(value) || 0;
            
            this.currentInspection.data[fieldId] = value;
            
            if (await DB.getSetting('autosave') !== false) {
                await Inspections.update(this.currentInspection);
            }
        });
        
        container.addEventListener('input', (e) => {
            if (e.target.classList.contains('form-slider')) {
                const wrapper = e.target.closest('.slider-wrapper');
                const field = this.currentTemplate.fields.find(f => f.id === e.target.dataset.fieldId);
                wrapper.querySelector('.slider-value').textContent = e.target.value + (field?.unit || '');
            }
        });
        
        container.addEventListener('click', async (e) => {
            const action = e.target.dataset.action;
            
            if (action === 'increment' || action === 'decrement') {
                const wrapper = e.target.closest('.number-input-wrapper');
                const input = wrapper.querySelector('input');
                let value = parseFloat(input.value) || 0;
                value = action === 'increment' ? value + 1 : value - 1;
                if (input.min && value < parseFloat(input.min)) value = parseFloat(input.min);
                if (input.max && value > parseFloat(input.max)) value = parseFloat(input.max);
                input.value = value;
                input.dispatchEvent(new Event('change', { bubbles: true }));
            }
            
            if (e.target.closest('.add-photo-btn')) {
                const fieldId = e.target.closest('.add-photo-btn').dataset.fieldId;
                this.openCamera(async (imageData) => {
                    const photo = await Inspections.savePhoto(this.currentInspection.id, fieldId, imageData);
                    const grid = container.querySelector(`[data-field-id="${fieldId}"].photo-grid`);
                    const item = document.createElement('div');
                    item.className = 'photo-item';
                    item.innerHTML = `<img src="${imageData}" alt="Photo"><button class="delete-btn" data-photo-id="${photo.id}">&times;</button>`;
                    grid.insertBefore(item, grid.lastElementChild);
                    UI.toast('Photo added', 'success');
                });
            }
            
            if (e.target.classList.contains('delete-btn') && e.target.dataset.photoId) {
                await Inspections.deletePhoto(e.target.dataset.photoId);
                e.target.closest('.photo-item').remove();
                UI.toast('Photo removed', 'success');
            }
            
            if (e.target.closest('.signature-preview')) {
                const fieldId = e.target.closest('.signature-preview').dataset.fieldId;
                this.openSignature(async (imageData) => {
                    this.currentInspection.signatures = this.currentInspection.signatures || {};
                    this.currentInspection.signatures[fieldId] = imageData;
                    await Inspections.update(this.currentInspection);
                    const preview = container.querySelector(`[data-field-id="${fieldId}"].signature-preview`);
                    preview.classList.remove('empty');
                    preview.innerHTML = `<img src="${imageData}" alt="Signature">`;
                    UI.toast('Signature saved', 'success');
                });
            }
            
            if (action === 'get-location') {
                const fieldId = e.target.closest('.location-field').dataset.fieldId;
                try {
                    const position = await Inspections.getCurrentPosition();
                    const loc = { latitude: position.coords.latitude, longitude: position.coords.longitude, accuracy: position.coords.accuracy };
                    this.currentInspection.data[fieldId] = loc;
                    await Inspections.update(this.currentInspection);
                    container.querySelector(`.location-field[data-field-id="${fieldId}"] input`).value = 
                        `${loc.latitude.toFixed(6)}, ${loc.longitude.toFixed(6)}`;
                    UI.toast('Location captured', 'success');
                } catch (error) {
                    UI.toast('Could not get location', 'error');
                }
            }
        });
        
        document.getElementById('save-draft-btn').addEventListener('click', async () => {
            await Inspections.update(this.currentInspection);
            UI.toast('Draft saved', 'success');
        });
        
        document.getElementById('complete-btn').addEventListener('click', async () => {
            const validation = await Inspections.validate(this.currentInspection, this.currentTemplate);
            if (!validation.valid) return UI.toast(validation.errors[0], 'warning');
            
            await Inspections.complete(this.currentInspection.id);
            await Reports.create(this.currentInspection.id);
            UI.toast('Inspection completed!', 'success');
            this.goBack();
        });
    },
    
    async openTemplateBuilder(id = null) {
        let template;
        if (id) {
            template = await Templates.get(id);
        } else {
            template = {
                name: 'New Template',
                description: '',
                icon: 'layout',
                fields: [
                    { id: DB.generateId(), type: 'section', label: 'General Information' },
                    { id: DB.generateId(), type: 'text', label: 'Inspector Name', required: true }
                ]
            };
        }
        
        this.currentTemplate = template;
        this.isEditing = !!id;
        
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById('view-template-builder').classList.add('active');
        document.getElementById('header-title').textContent = id ? 'Edit Template' : 'New Template';
        document.getElementById('back-btn').classList.remove('hidden');
        document.getElementById('add-btn').classList.add('hidden');
        document.getElementById('bottom-nav').style.display = 'none';
        
        this.renderTemplateBuilder();
    },
    
    renderTemplateBuilder() {
        const container = document.getElementById('template-builder-container');
        const template = this.currentTemplate;
        
        container.innerHTML = `
            <div class="builder-header">
                <input type="text" class="form-input" id="template-name" value="${template.name}" placeholder="Template Name">
                <textarea class="form-textarea" id="template-desc" placeholder="Description">${template.description || ''}</textarea>
            </div>
            <div class="field-list" id="field-list">
                ${template.fields.map(f => this.renderFieldItem(f)).join('')}
            </div>
            <button class="add-field-btn" id="add-field-btn">${UI.icons.layout} Add Field</button>
            <div class="form-actions">
                <button class="form-btn secondary" id="cancel-template-btn">Cancel</button>
                <button class="form-btn primary" id="save-template-btn">Save Template</button>
            </div>
        `;
        
        this.setupBuilderListeners();
    },
    
    renderFieldItem(field) {
        const typeInfo = Templates.getFieldType(field.type) || { name: field.type };
        return `
            <div class="field-item" data-field-id="${field.id}">
                <div class="field-drag-handle">${UI.icons.grip}</div>
                <div class="field-info">
                    <div class="field-name">${field.label || 'Untitled'}</div>
                    <div class="field-type">${typeInfo.name}${field.required ? ' • Required' : ''}</div>
                </div>
                <div class="field-actions">
                    <button class="field-action-btn edit" data-action="edit">${UI.icons.edit}</button>
                    <button class="field-action-btn delete" data-action="delete">${UI.icons.trash}</button>
                </div>
            </div>
        `;
    },
    
    setupBuilderListeners() {
        document.getElementById('template-name').addEventListener('change', (e) => {
            this.currentTemplate.name = e.target.value;
        });
        document.getElementById('template-desc').addEventListener('change', (e) => {
            this.currentTemplate.description = e.target.value;
        });
        
        document.getElementById('add-field-btn').addEventListener('click', () => this.showFieldTypeModal());
        
        document.getElementById('template-builder-container').addEventListener('click', (e) => {
            const action = e.target.closest('[data-action]')?.dataset.action;
            const fieldId = e.target.closest('.field-item')?.dataset.fieldId;
            if (!action || !fieldId) return;
            
            if (action === 'edit') this.showFieldEditModal(fieldId);
            else if (action === 'delete') {
                this.currentTemplate.fields = this.currentTemplate.fields.filter(f => f.id !== fieldId);
                document.querySelector(`.field-item[data-field-id="${fieldId}"]`).remove();
            }
        });
        
        document.getElementById('cancel-template-btn').addEventListener('click', () => this.goBack());
        
        document.getElementById('save-template-btn').addEventListener('click', async () => {
            const validation = Templates.validate(this.currentTemplate);
            if (!validation.valid) return UI.toast(validation.errors[0], 'warning');
            
            if (this.isEditing) await Templates.update(this.currentTemplate);
            else await Templates.create(this.currentTemplate);
            
            UI.toast('Template saved', 'success');
            this.loadView('templates');
        });
    },
    
    showFieldTypeModal() {
        let content = '<div class="field-type-grid">';
        Templates.fieldTypes.forEach(type => {
            content += `<div class="field-type-option" data-type="${type.id}">${UI.getIcon(type.icon)}<span>${type.name}</span></div>`;
        });
        content += '</div>';
        
        UI.showModal('Select Field Type', content, []);
        
        document.querySelectorAll('.field-type-option').forEach(opt => {
            opt.addEventListener('click', () => {
                const type = opt.dataset.type;
                UI.hideModal();
                const field = Templates.createField(type);
                field.label = Templates.getFieldType(type).name;
                this.currentTemplate.fields.push(field);
                document.getElementById('field-list').insertAdjacentHTML('beforeend', this.renderFieldItem(field));
                this.showFieldEditModal(field.id);
            });
        });
    },
    
    showFieldEditModal(fieldId) {
        const field = this.currentTemplate.fields.find(f => f.id === fieldId);
        if (!field) return;
        
        let content = `<div class="form-field"><label class="form-label">Label</label><input type="text" class="form-input" id="field-label" value="${field.label || ''}"></div>`;
        
        if (field.type !== 'section' && field.type !== 'note') {
            content += `<div class="form-field"><label class="form-checkbox"><input type="checkbox" id="field-required" ${field.required ? 'checked' : ''}><span>Required</span></label></div>`;
        }
        
        if (field.type === 'select' || field.type === 'radio') {
            content += `<div class="form-field"><label class="form-label">Options (one per line)</label><textarea class="form-textarea" id="field-options">${(field.options || []).join('\n')}</textarea></div>`;
        }
        
        if (field.type === 'slider' || field.type === 'number') {
            content += `<div class="form-field"><label class="form-label">Min</label><input type="number" class="form-input" id="field-min" value="${field.min || 0}"></div>`;
            content += `<div class="form-field"><label class="form-label">Max</label><input type="number" class="form-input" id="field-max" value="${field.max || 100}"></div>`;
        }
        
        if (field.type === 'slider') {
            content += `<div class="form-field"><label class="form-label">Unit</label><input type="text" class="form-input" id="field-unit" value="${field.unit || ''}"></div>`;
        }
        
        UI.showModal('Edit Field', content, [
            { text: 'Cancel', type: 'secondary' },
            { text: 'Save', type: 'primary', action: () => {
                field.label = document.getElementById('field-label').value;
                const req = document.getElementById('field-required');
                if (req) field.required = req.checked;
                const opts = document.getElementById('field-options');
                if (opts) field.options = opts.value.split('\n').filter(o => o.trim());
                const min = document.getElementById('field-min');
                if (min) field.min = parseFloat(min.value) || 0;
                const max = document.getElementById('field-max');
                if (max) field.max = parseFloat(max.value) || 100;
                const unit = document.getElementById('field-unit');
                if (unit) field.unit = unit.value;
                
                const item = document.querySelector(`.field-item[data-field-id="${fieldId}"]`);
                if (item) item.outerHTML = this.renderFieldItem(field);
            }}
        ]);
    },
    
    async openReport(id) {
        const report = await Reports.get(id);
        if (!report) return UI.toast('Report not found', 'error');
        
        this.currentReport = report;
        
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById('view-report-detail').classList.add('active');
        document.getElementById('header-title').textContent = 'Report';
        document.getElementById('back-btn').classList.remove('hidden');
        document.getElementById('add-btn').classList.add('hidden');
        document.getElementById('bottom-nav').style.display = 'none';
        
        this.renderReportDetail();
    },
    
    async renderReportDetail() {
        const container = document.getElementById('report-detail-container');
        const report = this.currentReport;
        const { inspection, template, photos } = report;
        
        let html = `<div class="report-header"><h2 class="report-title">${report.title}</h2><div class="report-meta"><div>${template.name}</div><div>Generated: ${UI.formatDate(report.generatedAt)}</div></div></div>`;
        
        let currentSection = null;
        
        for (const field of template.fields) {
            const value = inspection.data[field.id];
            
            if (field.type === 'section') {
                if (currentSection) html += '</div>';
                html += `<div class="report-section"><h3>${field.label}</h3>`;
                currentSection = field.label;
                continue;
            }
            
            if (field.type === 'note') continue;
            
            let displayValue = '';
            
            switch (field.type) {
                case 'checkbox': displayValue = value ? '✓ Yes' : '✗ No'; break;
                case 'rating': displayValue = '★'.repeat(value || 0) + '☆'.repeat(5 - (value || 0)); break;
                case 'photo':
                    const fieldPhotos = photos.filter(p => p.fieldId === field.id);
                    if (fieldPhotos.length > 0) {
                        html += '<div class="report-photos">';
                        fieldPhotos.forEach(p => { html += `<div class="report-photo"><img src="${p.data}"></div>`; });
                        html += '</div>';
                    }
                    continue;
                case 'signature':
                    if (inspection.signatures?.[field.id]) {
                        html += `<div class="report-signature"><img src="${inspection.signatures[field.id]}"></div>`;
                    }
                    continue;
                case 'location':
                    displayValue = value?.latitude ? `${value.latitude.toFixed(6)}, ${value.longitude.toFixed(6)}` : '<em>No location</em>';
                    break;
                case 'slider': displayValue = `${value}${field.unit || ''}`; break;
                default: displayValue = value || '<em>-</em>';
            }
            
            if (displayValue) {
                html += `<div class="report-field"><span class="report-field-label">${field.label}</span><span class="report-field-value">${displayValue}</span></div>`;
            }
        }
        
        if (currentSection) html += '</div>';
        
        html += `<div class="report-actions form-actions">
            <button class="form-btn secondary" id="download-html-btn">HTML</button>
            <button class="form-btn secondary" id="download-csv-btn">CSV</button>
            <button class="form-btn secondary" id="download-pdf-btn">PDF</button>
            <button class="form-btn secondary" id="print-report-btn">Print</button>
            <button class="form-btn primary" id="share-report-btn">Share</button>
            <button class="form-btn danger" id="delete-report-btn">Delete</button>
        </div>`;
        
        container.innerHTML = html;
        
        document.getElementById('download-html-btn').addEventListener('click', async () => {
            await Reports.downloadHTML(report.id);
            UI.toast('HTML Downloaded', 'success');
        });
        document.getElementById('download-csv-btn').addEventListener('click', async () => {
            await Reports.downloadCSV(report.id);
            UI.toast('CSV Downloaded', 'success');
        });
        document.getElementById('download-pdf-btn').addEventListener('click', async () => {
            UI.toast('Generating PDF...', 'info');
            await Reports.downloadPDF(report.id);
            UI.toast('PDF Downloaded', 'success');
        });
        document.getElementById('print-report-btn').addEventListener('click', () => Reports.print(report.id));
        document.getElementById('share-report-btn').addEventListener('click', async () => {
            if (await Reports.share(report.id)) UI.toast('Shared', 'success');
        });
        document.getElementById('delete-report-btn').addEventListener('click', async () => {
            const confirmed = await UI.confirm('Delete Report', `Delete "${report.title}"? This cannot be undone.`);
            if (confirmed) {
                await Reports.delete(report.id);
                UI.toast('Report deleted', 'success');
                this.goBack();
            }
        });
    },
    
    goBack() {
        this.currentInspection = null;
        this.currentTemplate = null;
        this.currentReport = null;
        document.getElementById('back-btn').classList.add('hidden');
        document.getElementById('bottom-nav').style.display = '';
        this.loadView(this.currentView);
    },
    
    async filterInspections(query, status = 'all') {
        const inspections = await Inspections.getAll();
        let filtered = inspections;
        
        if (query) {
            const q = query.toLowerCase();
            filtered = filtered.filter(i => i.title.toLowerCase().includes(q) || i.templateName.toLowerCase().includes(q));
        }
        if (status !== 'all') filtered = filtered.filter(i => i.status === status);
        
        const list = document.getElementById('inspection-list');
        list.innerHTML = '';
        filtered.forEach(i => list.appendChild(UI.renderInspectionCard(i, (ins) => this.openInspection(ins.id))));
        
        document.getElementById('empty-inspections').classList.toggle('visible', filtered.length === 0);
        list.style.display = filtered.length === 0 ? 'none' : '';
    },
    
    async filterTemplates(query) {
        const templates = await Templates.getAll();
        let filtered = templates;
        
        if (query) {
            const q = query.toLowerCase();
            filtered = filtered.filter(t => t.name.toLowerCase().includes(q) || (t.description || '').toLowerCase().includes(q));
        }
        
        const list = document.getElementById('template-list');
        list.innerHTML = '';
        filtered.forEach(t => list.appendChild(UI.renderTemplateCard(t, (tmpl) => this.showTemplateOptions(tmpl))));
        
        document.getElementById('empty-templates').classList.toggle('visible', filtered.length === 0);
        list.style.display = filtered.length === 0 ? 'none' : '';
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());
