/**
 * Reports Module - Generate and manage inspection reports
 */
const Reports = {
    
    async init() {
        // Any initialization
    },
    
    async getAll() {
        const reports = await DB.getAll(DB.stores.reports);
        return reports.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
    
    async get(id) {
        return DB.get(DB.stores.reports, id);
    },
    
    async getByInspection(inspectionId) {
        const reports = await DB.getByIndex(DB.stores.reports, 'inspectionId', inspectionId);
        return reports[0] || null;
    },
    
    async create(inspectionId) {
        const inspection = await Inspections.get(inspectionId);
        if (!inspection) throw new Error('Inspection not found');
        
        const template = await Templates.get(inspection.templateId);
        if (!template) throw new Error('Template not found');
        
        const photos = await Inspections.getPhotos(inspectionId);
        
        const report = {
            inspectionId: inspectionId,
            title: inspection.title,
            templateName: template.name,
            inspection: { ...inspection },
            template: { ...template },
            photos: photos,
            generatedAt: new Date().toISOString()
        };
        
        return DB.add(DB.stores.reports, report);
    },
    
    async delete(id) {
        return DB.delete(DB.stores.reports, id);
    },
    
    async generateHTML(report) {
        const { inspection, template, photos } = report;
        const settings = {
            inspectorName: await DB.getSetting('inspectorName') || '',
            company: await DB.getSetting('company') || 'Keefner Mining & Geotech LLC'
        };
        
        let html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${report.title}</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            padding: 40px;
            max-width: 800px;
            margin: 0 auto;
        }
        .company-header {
            text-align: center;
            padding-bottom: 16px;
            margin-bottom: 20px;
            border-bottom: 3px solid #1a1a1a;
        }
        .company-header img {
            height: 40px;
            margin-bottom: 8px;
        }
        .company-name {
            font-size: 12px;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 2px solid #00d4aa;
            margin-bottom: 30px;
        }
        .header h1 { font-size: 24px; margin-bottom: 5px; }
        .header .meta { color: #666; font-size: 14px; }
        .section {
            margin-bottom: 25px;
        }
        .section-title {
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #1a1a1a;
            padding-bottom: 8px;
            border-bottom: 1px solid #ddd;
            margin-bottom: 15px;
        }
        .field {
            display: flex;
            padding: 10px 0;
            border-bottom: 1px solid #eee;
        }
        .field:last-child { border-bottom: none; }
        .field-label {
            flex: 0 0 40%;
            color: #666;
            font-size: 14px;
        }
        .field-value {
            flex: 1;
            font-weight: 500;
        }
        .field-value.checked::before {
            content: '✓ ';
            color: #00d4aa;
        }
        .field-value.unchecked::before {
            content: '✗ ';
            color: #999;
        }
        .photos {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin-top: 10px;
        }
        .photo {
            border-radius: 8px;
            overflow: hidden;
            border: 1px solid #ddd;
        }
        .photo img {
            width: 100%;
            height: auto;
            display: block;
        }
        .signature {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            margin-top: 10px;
        }
        .signature img {
            max-width: 250px;
            max-height: 100px;
        }
        .signature-label {
            font-size: 12px;
            color: #666;
            margin-top: 10px;
        }
        .location {
            font-family: monospace;
            font-size: 13px;
            background: #f5f5f5;
            padding: 8px 12px;
            border-radius: 4px;
        }
        .rating {
            color: #ffb800;
            font-size: 18px;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #1a1a1a;
            text-align: center;
            color: #666;
            font-size: 12px;
        }
        .footer strong {
            color: #1a1a1a;
        }
        @media print {
            body { padding: 20px; }
            .section { page-break-inside: avoid; }
        }
    </style>
</head>
<body>
    <div class="company-header">
        <div class="company-name">${settings.company}</div>
    </div>
    <div class="header">
        <h1>${report.title}</h1>
        <div class="meta">
            <div>Generated: ${new Date(report.generatedAt).toLocaleString()}</div>
            ${inspection.completedAt ? `<div>Completed: ${new Date(inspection.completedAt).toLocaleString()}</div>` : ''}
        </div>
    </div>
`;
        
        let currentSection = null;
        
        for (const field of template.fields) {
            const value = inspection.data[field.id];
            
            if (field.type === 'section') {
                if (currentSection) {
                    html += `</div>`;
                }
                html += `
    <div class="section">
        <div class="section-title">${field.label}</div>
`;
                currentSection = field.label;
                continue;
            }
            
            if (field.type === 'note') {
                continue;
            }
            
            html += `<div class="field">
            <div class="field-label">${field.label}</div>
            <div class="field-value">`;
            
            switch (field.type) {
                case 'checkbox':
                    html += `<span class="${value ? 'checked' : 'unchecked'}">${value ? 'Yes' : 'No'}</span>`;
                    break;
                    
                case 'rating':
                    const stars = '★'.repeat(value || 0) + '☆'.repeat(5 - (value || 0));
                    html += `<span class="rating">${stars}</span>`;
                    break;
                    
                case 'photo':
                    const fieldPhotos = photos.filter(p => p.fieldId === field.id);
                    if (fieldPhotos.length > 0) {
                        html += `</div></div><div class="photos">`;
                        for (const photo of fieldPhotos) {
                            html += `<div class="photo"><img src="${photo.data}" alt="Photo"></div>`;
                        }
                        html += `</div><div class="field"><div class="field-label"></div><div class="field-value">`;
                    } else {
                        html += `<em>No photos</em>`;
                    }
                    break;
                    
                case 'signature':
                    const sig = inspection.signatures[field.id];
                    if (sig) {
                        html += `</div></div>
                        <div class="signature">
                            <img src="${sig}" alt="Signature">
                            <div class="signature-label">${field.label}</div>
                        </div>
                        <div class="field"><div class="field-label"></div><div class="field-value">`;
                    } else {
                        html += `<em>Not signed</em>`;
                    }
                    break;
                    
                case 'location':
                    if (value && value.latitude) {
                        html += `<span class="location">${value.latitude.toFixed(6)}, ${value.longitude.toFixed(6)}</span>`;
                    } else if (inspection.location) {
                        html += `<span class="location">${inspection.location.latitude.toFixed(6)}, ${inspection.location.longitude.toFixed(6)}</span>`;
                    } else {
                        html += `<em>No location</em>`;
                    }
                    break;
                    
                case 'slider':
                    html += `${value}${field.unit || ''}`;
                    break;
                    
                default:
                    html += value || '<em>-</em>';
            }
            
            html += `</div></div>`;
        }
        
        if (currentSection) {
            html += `</div>`;
        }
        
        html += `
    <div class="footer">
        <div><strong>Keefner Mining & Geotech LLC</strong></div>
        <div>Report generated by Field Inspector</div>
        <div>Inspection ID: ${inspection.id}</div>
    </div>
</body>
</html>`;
        
        return html;
    },
    
    async downloadHTML(reportId) {
        const report = await this.get(reportId);
        if (!report) throw new Error('Report not found');
        
        const html = await this.generateHTML(report);
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `${report.title.replace(/[^a-z0-9]/gi, '_')}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },
    
    async print(reportId) {
        const report = await this.get(reportId);
        if (!report) throw new Error('Report not found');
        
        const html = await this.generateHTML(report);
        const printWindow = window.open('', '_blank');
        printWindow.document.write(html);
        printWindow.document.close();
        printWindow.onload = () => {
            printWindow.print();
        };
    },
    
    async downloadPDF(reportId) {
        const report = await this.get(reportId);
        if (!report) throw new Error('Report not found');

        const html = await this.generateHTML(report);

        // Render HTML in a hidden iframe, then capture with html2canvas → jsPDF
        const iframe = document.createElement('iframe');
        iframe.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:800px;height:1px;border:none;';
        document.body.appendChild(iframe);

        await new Promise(resolve => {
            iframe.onload = resolve;
            iframe.srcdoc = html;
        });

        // Give the iframe a moment to fully render
        await new Promise(r => setTimeout(r, 300));

        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        const canvas = await html2canvas(iframeDoc.body, {
            scale: 1.5,
            useCORS: true,
            width: 800,
            windowWidth: 800,
            scrollY: 0
        });

        document.body.removeChild(iframe);

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'letter' });
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgData = canvas.toDataURL('image/jpeg', 0.92);
        const imgWidth = pageWidth;
        const imgHeight = (canvas.height / canvas.width) * imgWidth;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
            position -= pageHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        pdf.save(`${report.title.replace(/[^a-z0-9]/gi, '_')}.pdf`);
    },

    async share(reportId) {
        const report = await this.get(reportId);
        if (!report) throw new Error('Report not found');

        if (navigator.share) {
            const html = await this.generateHTML(report);
            const blob = new Blob([html], { type: 'text/html' });
            const file = new File([blob], `${report.title}.html`, { type: 'text/html' });

            try {
                await navigator.share({
                    title: report.title,
                    text: `Inspection Report: ${report.title}`,
                    files: [file]
                });
                return true;
            } catch (e) {
                if (e.name !== 'AbortError') {
                    console.error('Share failed:', e);
                }
            }
        }

        // Fallback: download as PDF
        await this.downloadPDF(reportId);
        return false;
    },
    
    // CSV Export functionality
    generateCSV(report) {
        const { inspection, template, photos } = report;
        const rows = [];
        
        // Header row
        rows.push(['Field', 'Value', 'Field Type', 'Section']);
        
        // Metadata rows
        rows.push(['Report Title', report.title, 'metadata', 'Report Info']);
        rows.push(['Template', template.name, 'metadata', 'Report Info']);
        rows.push(['Generated At', new Date(report.generatedAt).toLocaleString(), 'metadata', 'Report Info']);
        rows.push(['Inspection ID', inspection.id, 'metadata', 'Report Info']);
        rows.push(['Status', inspection.status, 'metadata', 'Report Info']);
        if (inspection.completedAt) {
            rows.push(['Completed At', new Date(inspection.completedAt).toLocaleString(), 'metadata', 'Report Info']);
        }
        
        // Add blank row separator
        rows.push(['', '', '', '']);
        
        // Field data
        let currentSection = 'General';
        
        for (const field of template.fields) {
            if (field.type === 'section') {
                currentSection = field.label;
                continue;
            }
            
            if (field.type === 'note') continue;
            
            const value = inspection.data[field.id];
            let displayValue = '';
            
            switch (field.type) {
                case 'checkbox':
                    displayValue = value ? 'Yes' : 'No';
                    break;
                case 'rating':
                    displayValue = value ? `${value}/5` : 'Not rated';
                    break;
                case 'photo':
                    const fieldPhotos = photos.filter(p => p.fieldId === field.id);
                    displayValue = fieldPhotos.length > 0 ? `${fieldPhotos.length} photo(s) attached` : 'No photos';
                    break;
                case 'signature':
                    displayValue = inspection.signatures?.[field.id] ? 'Signed' : 'Not signed';
                    break;
                case 'location':
                    if (value?.latitude) {
                        displayValue = `${value.latitude.toFixed(6)}, ${value.longitude.toFixed(6)}`;
                    } else {
                        displayValue = 'No location';
                    }
                    break;
                case 'slider':
                    displayValue = value !== undefined ? `${value}${field.unit || ''}` : '';
                    break;
                case 'select':
                case 'radio':
                    displayValue = value || '';
                    break;
                default:
                    displayValue = value !== undefined && value !== null ? String(value) : '';
            }
            
            rows.push([field.label, displayValue, field.type, currentSection]);
        }
        
        // Convert to CSV string with proper escaping
        const csvContent = rows.map(row => 
            row.map(cell => {
                // Escape quotes and wrap in quotes if contains comma, quote, or newline
                const cellStr = String(cell);
                if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
                    return `"${cellStr.replace(/"/g, '""')}"`;
                }
                return cellStr;
            }).join(',')
        ).join('\n');
        
        return csvContent;
    },
    
    async downloadCSV(reportId) {
        const report = await this.get(reportId);
        if (!report) throw new Error('Report not found');
        
        const csv = this.generateCSV(report);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `${report.title.replace(/[^a-z0-9]/gi, '_')}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },
    
    // Generate CSV for multiple reports (useful for batch export)
    async generateBatchCSV(reportIds) {
        const allRows = [];
        
        // Header with report identifier
        allRows.push(['Report', 'Section', 'Field', 'Value', 'Field Type', 'Generated At']);
        
        for (const reportId of reportIds) {
            const report = await this.get(reportId);
            if (!report) continue;
            
            const { inspection, template, photos } = report;
            let currentSection = 'General';
            
            for (const field of template.fields) {
                if (field.type === 'section') {
                    currentSection = field.label;
                    continue;
                }
                
                if (field.type === 'note') continue;
                
                const value = inspection.data[field.id];
                let displayValue = '';
                
                switch (field.type) {
                    case 'checkbox':
                        displayValue = value ? 'Yes' : 'No';
                        break;
                    case 'rating':
                        displayValue = value ? `${value}/5` : '';
                        break;
                    case 'photo':
                        const fieldPhotos = photos.filter(p => p.fieldId === field.id);
                        displayValue = `${fieldPhotos.length} photo(s)`;
                        break;
                    case 'signature':
                        displayValue = inspection.signatures?.[field.id] ? 'Signed' : 'Not signed';
                        break;
                    case 'location':
                        if (value?.latitude) {
                            displayValue = `${value.latitude.toFixed(6)}, ${value.longitude.toFixed(6)}`;
                        }
                        break;
                    case 'slider':
                        displayValue = value !== undefined ? `${value}${field.unit || ''}` : '';
                        break;
                    default:
                        displayValue = value !== undefined && value !== null ? String(value) : '';
                }
                
                allRows.push([
                    report.title,
                    currentSection,
                    field.label,
                    displayValue,
                    field.type,
                    new Date(report.generatedAt).toLocaleString()
                ]);
            }
        }
        
        // Convert to CSV
        const csvContent = allRows.map(row => 
            row.map(cell => {
                const cellStr = String(cell);
                if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
                    return `"${cellStr.replace(/"/g, '""')}"`;
                }
                return cellStr;
            }).join(',')
        ).join('\n');
        
        return csvContent;
    }
};

window.Reports = Reports;
