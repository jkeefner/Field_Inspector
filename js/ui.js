/**
 * UI Module - UI helpers, rendering, and utilities
 */
const UI = {
    icons: {
        type: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4,7 4,4 20,4 20,7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>',
        'align-left': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/></svg>',
        hash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>',
        'chevron-down': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6,9 12,15 18,9"/></svg>',
        'check-square': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9,11 12,14 22,4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>',
        circle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>',
        calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
        clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>',
        camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>',
        'pen-tool': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>',
        'map-pin': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z"/><circle cx="12" cy="10" r="3"/></svg>',
        sliders: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>',
        star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"/></svg>',
        layout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>',
        info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
        shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
        tool: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>',
        mountain: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3l4 8 5-5 5 16H2L8 3z"/></svg>',
        database: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>',
        layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12,2 2,7 12,12 22,7 12,2"/><polyline points="2,17 12,22 22,17"/><polyline points="2,12 12,17 22,12"/></svg>',
        grip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/></svg>',
        edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
        trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3,6 5,6 21,6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>',
        check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20,6 9,17 4,12"/></svg>',
        x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
        alertCircle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'
    },
    
    getIcon(name) {
        return this.icons[name] || this.icons.info;
    },
    
    // Toast notifications
    toast(message, type = 'info', duration = 3000) {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        let icon = this.icons.info;
        if (type === 'success') icon = this.icons.check;
        if (type === 'error') icon = this.icons.x;
        if (type === 'warning') icon = this.icons.alertCircle;
        
        toast.innerHTML = `
            <span class="toast-icon">${icon}</span>
            <span class="toast-message">${message}</span>
        `;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('removing');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },
    
    // Modal management
    showModal(title, content, buttons = []) {
        const overlay = document.getElementById('modal-overlay');
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modal-title');
        const modalContent = document.getElementById('modal-content');
        const modalFooter = document.getElementById('modal-footer');
        
        modalTitle.textContent = title;
        modalContent.innerHTML = content;
        
        modalFooter.innerHTML = '';
        buttons.forEach(btn => {
            const button = document.createElement('button');
            button.className = `form-btn ${btn.type || 'secondary'}`;
            button.textContent = btn.text;
            button.onclick = () => {
                if (btn.action) btn.action();
                if (btn.close !== false) this.hideModal();
            };
            modalFooter.appendChild(button);
        });
        
        overlay.classList.add('visible');
        
        return new Promise(resolve => {
            this._modalResolve = resolve;
        });
    },
    
    hideModal() {
        const overlay = document.getElementById('modal-overlay');
        overlay.classList.remove('visible');
        if (this._modalResolve) {
            this._modalResolve();
            this._modalResolve = null;
        }
    },
    
    // Confirm dialog
    async confirm(title, message) {
        return new Promise(resolve => {
            this.showModal(title, `<p>${message}</p>`, [
                { text: 'Cancel', type: 'secondary', action: () => resolve(false) },
                { text: 'Confirm', type: 'primary', action: () => resolve(true) }
            ]);
        });
    },
    
    // Render inspection card
    renderInspectionCard(inspection, onClick) {
        const card = document.createElement('div');
        card.className = 'inspection-card';
        card.onclick = () => onClick(inspection);
        
        const date = new Date(inspection.updatedAt);
        const dateStr = date.toLocaleDateString();
        const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        card.innerHTML = `
            <div class="card-header">
                <div>
                    <div class="card-title">${inspection.title}</div>
                    <div class="card-subtitle">${inspection.templateName}</div>
                </div>
                <span class="card-status ${inspection.status}">${inspection.status}</span>
            </div>
            <div class="card-meta">
                <div class="card-meta-item">
                    ${this.icons.calendar}
                    <span>${dateStr}</span>
                </div>
                <div class="card-meta-item">
                    ${this.icons.clock}
                    <span>${timeStr}</span>
                </div>
            </div>
        `;
        
        return card;
    },
    
    // Render template card
    renderTemplateCard(template, onClick) {
        const card = document.createElement('div');
        card.className = 'template-card';
        card.onclick = () => onClick(template);
        
        const fieldCount = template.fields.filter(f => f.type !== 'section' && f.type !== 'note').length;
        
        card.innerHTML = `
            <div class="card-header">
                <div>
                    <div class="card-title">${template.name}</div>
                    <div class="card-subtitle">${template.description || ''}</div>
                </div>
                <div class="card-icon">${this.getIcon(template.icon || 'layout')}</div>
            </div>
            <div class="card-meta">
                <span class="field-count">${fieldCount} fields</span>
                ${template.isDefault ? '<span class="card-status synced">Default</span>' : ''}
            </div>
        `;
        
        return card;
    },
    
    // Render report card
    renderReportCard(report, onClick, onDelete) {
        const card = document.createElement('div');
        card.className = 'report-card';
        
        const date = new Date(report.generatedAt);
        
        card.innerHTML = `
            <div class="card-header">
                <div class="card-header-info" style="cursor:pointer;flex:1;">
                    <div class="card-title">${report.title}</div>
                    <div class="card-subtitle">${report.templateName}</div>
                </div>
                <button class="icon-btn delete-report-btn" title="Delete report" style="color:#e74c3c;background:none;border:none;cursor:pointer;padding:8px;flex-shrink:0;">
                    ${this.icons.trash}
                </button>
            </div>
            <div class="card-meta">
                <div class="card-meta-item">
                    ${this.icons.calendar}
                    <span>${date.toLocaleDateString()}</span>
                </div>
                <div class="card-meta-item">
                    ${this.icons.clock}
                    <span>${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            </div>
        `;
        
        card.querySelector('.card-header-info').addEventListener('click', () => onClick(report));
        card.querySelector('.delete-report-btn').addEventListener('click', async (e) => {
            e.stopPropagation();
            if (onDelete) onDelete(report);
        });
        
        return card;
    },
    
    // Render form field
    renderFormField(field, value, onChange) {
        const wrapper = document.createElement('div');
        wrapper.className = 'form-field';
        wrapper.dataset.fieldId = field.id;
        
        if (field.type === 'section') {
            wrapper.innerHTML = `
                <div class="form-section-title">
                    ${this.getIcon(field.icon || 'layout')}
                    ${field.label}
                </div>
            `;
            return wrapper;
        }
        
        if (field.type === 'note') {
            wrapper.innerHTML = `
                <div class="form-note">
                    ${this.icons.info}
                    <span>${field.label}</span>
                </div>
            `;
            return wrapper;
        }
        
        const label = document.createElement('label');
        label.className = `form-label${field.required ? ' required' : ''}`;
        label.textContent = field.label;
        wrapper.appendChild(label);
        
        switch (field.type) {
            case 'text':
                wrapper.innerHTML += `
                    <input type="text" class="form-input" value="${value || ''}" 
                           placeholder="${field.placeholder || ''}"
                           data-field-id="${field.id}">
                `;
                break;
                
            case 'textarea':
                wrapper.innerHTML += `
                    <textarea class="form-textarea" placeholder="${field.placeholder || ''}"
                              data-field-id="${field.id}">${value || ''}</textarea>
                `;
                break;
                
            case 'number':
                wrapper.innerHTML += `
                    <div class="number-input-wrapper">
                        <button class="number-btn" data-action="decrement">−</button>
                        <input type="number" class="form-input" value="${value || ''}"
                               ${field.min !== null ? `min="${field.min}"` : ''}
                               ${field.max !== null ? `max="${field.max}"` : ''}
                               data-field-id="${field.id}">
                        <button class="number-btn" data-action="increment">+</button>
                    </div>
                `;
                break;
                
            case 'select':
                let options = (field.options || []).map(opt => 
                    `<option value="${opt}" ${value === opt ? 'selected' : ''}>${opt}</option>`
                ).join('');
                wrapper.innerHTML += `
                    <select class="form-select" data-field-id="${field.id}">
                        <option value="">Select...</option>
                        ${options}
                    </select>
                `;
                break;
                
            case 'checkbox':
                wrapper.innerHTML += `
                    <label class="form-checkbox">
                        <input type="checkbox" ${value ? 'checked' : ''} data-field-id="${field.id}">
                        <span>${field.checkLabel || 'Yes'}</span>
                    </label>
                `;
                break;
                
            case 'radio':
                let radios = (field.options || []).map((opt, i) => `
                    <label class="form-radio">
                        <input type="radio" name="${field.id}" value="${opt}" 
                               ${value === opt ? 'checked' : ''} data-field-id="${field.id}">
                        <span>${opt}</span>
                    </label>
                `).join('');
                wrapper.innerHTML += radios;
                break;
                
            case 'date':
                wrapper.innerHTML += `
                    <input type="date" class="form-input" value="${value || ''}" data-field-id="${field.id}">
                `;
                break;
                
            case 'time':
                wrapper.innerHTML += `
                    <input type="time" class="form-input" value="${value || ''}" data-field-id="${field.id}">
                `;
                break;
                
            case 'datetime':
                wrapper.innerHTML += `
                    <input type="datetime-local" class="form-input" value="${value || ''}" data-field-id="${field.id}">
                `;
                break;
                
            case 'slider':
                const min = field.min || 0;
                const max = field.max || 100;
                const val = value || min;
                wrapper.innerHTML += `
                    <div class="slider-wrapper">
                        <input type="range" class="form-slider" min="${min}" max="${max}" 
                               value="${val}" data-field-id="${field.id}">
                        <div class="slider-value">${val}${field.unit || ''}</div>
                    </div>
                `;
                break;
                
            case 'rating':
                let stars = '';
                for (let i = 5; i >= 1; i--) {
                    stars += `
                        <input type="radio" id="star-${field.id}-${i}" name="rating-${field.id}" 
                               value="${i}" ${value == i ? 'checked' : ''} data-field-id="${field.id}">
                        <label for="star-${field.id}-${i}">★</label>
                    `;
                }
                wrapper.innerHTML += `<div class="star-rating">${stars}</div>`;
                break;
                
            case 'photo':
                wrapper.innerHTML += `
                    <div class="photo-grid" data-field-id="${field.id}">
                        <button class="add-photo-btn" data-field-id="${field.id}">
                            ${this.icons.camera}
                            <span>Add Photo</span>
                        </button>
                    </div>
                `;
                break;
                
            case 'signature':
                wrapper.innerHTML += `
                    <div class="signature-preview empty" data-field-id="${field.id}">
                        ${this.icons['pen-tool']}
                        <span>Tap to sign</span>
                    </div>
                `;
                break;
                
            case 'location':
                wrapper.innerHTML += `
                    <div class="location-field" data-field-id="${field.id}">
                        <input type="text" class="form-input" readonly 
                               value="${value ? `${value.latitude?.toFixed(6)}, ${value.longitude?.toFixed(6)}` : ''}"
                               placeholder="Tap to get location">
                        <button class="action-btn" data-action="get-location">
                            ${this.icons['map-pin']} Get Location
                        </button>
                    </div>
                `;
                break;
        }
        
        return wrapper;
    },
    
    // Format file size
    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },
    
    // Format date
    formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
};

window.UI = UI;
