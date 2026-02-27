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
        },
        {
            id: 'default-tailings-dam',
            name: 'Tailings Dam Inspection',
            description: 'GISTM-aligned tailings storage facility inspection',
            icon: 'database',
            isDefault: true,
            fields: [
                // Facility Identification
                { id: 'section-facility', type: 'section', label: 'Facility Identification' },
                { id: 'facility-name', type: 'text', label: 'Facility Name', required: true },
                { id: 'facility-id', type: 'text', label: 'Facility ID/Reference' },
                { id: 'date', type: 'datetime', label: 'Inspection Date/Time', required: true },
                { id: 'inspector', type: 'text', label: 'Inspector Name', required: true },
                { id: 'inspector-role', type: 'select', label: 'Inspector Role', options: ['Engineer of Record', 'Site Engineer', 'Operations Staff', 'Third Party Reviewer', 'ITRB Member', 'Regulatory Inspector', 'Corporate Auditor'] },
                { id: 'inspection-type', type: 'select', label: 'Inspection Type', options: ['Routine', 'Event-Triggered', 'Annual Technical', 'Dam Safety Review', 'Regulatory', 'ITRB Review', 'Corporate Audit'], required: true },
                { id: 'location', type: 'location', label: 'GPS Coordinates' },
                { id: 'consequence-class', type: 'select', label: 'Consequence Classification', options: ['Low', 'Significant', 'High', 'Very High', 'Extreme'], required: true },
                
                // Operating Conditions & Deposition Data
                { id: 'section-operations', type: 'section', label: 'Operating Conditions & Deposition' },
                { id: 'operational-status', type: 'select', label: 'Facility Status', options: ['Active - Depositing', 'Active - Not Depositing', 'Care & Maintenance', 'Closed', 'Transitioning'], required: true },
                { id: 'deposition-method', type: 'select', label: 'Deposition Method', options: ['Conventional Slurry', 'Thickened Tailings', 'Paste', 'Dry Stack/Filtered', 'Cycloned Sand', 'Co-disposal'] },
                { id: 'current-crest-elev', type: 'number', label: 'Current Crest Elevation (ft)' },
                { id: 'design-crest-elev', type: 'number', label: 'Design Ultimate Crest Elevation (ft)' },
                { id: 'pond-level', type: 'number', label: 'Pond Water Surface Elevation (ft)' },
                { id: 'freeboard', type: 'number', label: 'Current Freeboard (ft)' },
                { id: 'min-freeboard', type: 'number', label: 'Minimum Required Freeboard (ft)' },
                { id: 'freeboard-adequate', type: 'checkbox', label: 'Freeboard meets requirements' },
                { id: 'beach-width', type: 'number', label: 'Beach Width (ft)' },
                { id: 'note-deposition', type: 'note', label: 'Record current lift/raise data for deposition tracking' },
                { id: 'current-lift-number', type: 'number', label: 'Current Lift/Raise Number' },
                { id: 'lift-start-date', type: 'date', label: 'Current Lift Start Date' },
                { id: 'lift-height', type: 'number', label: 'Current Lift Height (ft)' },
                { id: 'lift-tonnage', type: 'number', label: 'Tonnage Deposited This Lift (tons)' },
                { id: 'total-tonnage', type: 'number', label: 'Total Facility Tonnage (tons)' },
                { id: 'daily-deposition-rate', type: 'number', label: 'Current Deposition Rate (tpd)' },
                { id: 'deposition-location', type: 'text', label: 'Active Deposition Location/Sector' },
                { id: 'deposition-photo', type: 'photo', label: 'Current Deposition Area Photo', multiple: false },
                
                // Dry Stack / Filtered Tailings (if applicable)
                { id: 'section-drystack', type: 'section', label: 'Dry Stack / Filtered Tailings (if applicable)' },
                { id: 'drystack-applicable', type: 'checkbox', label: 'Dry stack/filtered tailings present' },
                { id: 'filter-cake-moisture', type: 'number', label: 'Filter Cake Moisture Content (%)' },
                { id: 'moisture-spec', type: 'number', label: 'Specified Max Moisture (%)' },
                { id: 'moisture-compliant', type: 'checkbox', label: 'Moisture within specification' },
                { id: 'compaction-testing', type: 'checkbox', label: 'Compaction testing current' },
                { id: 'compaction-percent', type: 'number', label: 'Latest Compaction Result (%)' },
                { id: 'drystack-condition', type: 'select', label: 'Dry Stack Surface Condition', options: ['Dry - Good', 'Slightly Damp', 'Wet Areas Present', 'Ponding Observed', 'N/A'] },
                { id: 'drystack-photo', type: 'photo', label: 'Dry Stack Condition Photo', multiple: true },
                
                // Water Management & Ponding
                { id: 'section-water', type: 'section', label: 'Water Management & Ponding' },
                { id: 'note-water', type: 'note', label: 'Document all surface water, ponding, and water management structures' },
                { id: 'supernatant-pond', type: 'checkbox', label: 'Supernatant pond present' },
                { id: 'pond-area', type: 'number', label: 'Estimated Pond Area (acres)' },
                { id: 'pond-volume', type: 'number', label: 'Estimated Pond Volume (acre-ft)' },
                { id: 'pond-location', type: 'select', label: 'Pond Location', options: ['Against embankment', 'Near embankment (<500ft)', 'Center of facility', 'Away from embankment', 'No pond'] },
                { id: 'decant-type', type: 'select', label: 'Decant System Type', options: ['Tower/Riser', 'Floating Barge', 'Pump System', 'Spillway Only', 'None', 'Multiple Systems'] },
                { id: 'decant-functioning', type: 'checkbox', label: 'Decant system functioning' },
                { id: 'decant-flow', type: 'number', label: 'Decant Flow Rate (gpm)' },
                { id: 'reclaim-status', type: 'select', label: 'Reclaim Water System Status', options: ['Operating', 'Standby', 'Maintenance', 'Not Installed'] },
                { id: 'spillway-condition', type: 'select', label: 'Spillway Condition', options: ['Good', 'Minor Defects', 'Moderate Defects', 'Significant Defects', 'N/A'] },
                { id: 'spillway-clear', type: 'checkbox', label: 'Spillway clear of debris' },
                { id: 'unwanted-ponding', type: 'checkbox', label: 'Unwanted ponding observed on beach/surface' },
                { id: 'ponding-photo', type: 'photo', label: 'Pond/Water Management Photos', multiple: true },
                
                // Weather & Environmental
                { id: 'section-weather', type: 'section', label: 'Weather & Environmental Conditions' },
                { id: 'weather', type: 'select', label: 'Current Weather', options: ['Clear', 'Partly Cloudy', 'Overcast', 'Light Rain', 'Heavy Rain', 'Snow', 'Freezing Conditions'] },
                { id: 'temp', type: 'number', label: 'Temperature (°F)' },
                { id: 'recent-precip', type: 'checkbox', label: 'Significant precipitation in last 72hrs' },
                { id: 'precip-amount', type: 'number', label: 'Precipitation Amount (inches)' },
                { id: 'seismic-activity', type: 'checkbox', label: 'Recent seismic activity reported' },
                { id: 'seismic-magnitude', type: 'number', label: 'Seismic Event Magnitude (if applicable)' },
                
                // Embankment/Dam Inspection
                { id: 'section-embankment', type: 'section', label: 'Embankment Inspection' },
                { id: 'note-embankment', type: 'note', label: 'Inspect crest, upstream slope, downstream slope, and toe areas. Document ALL anomalies with photos.' },
                { id: 'crest-condition', type: 'select', label: 'Crest Condition', options: ['Good - No Issues', 'Minor Defects', 'Moderate Defects', 'Significant Defects', 'Critical'], required: true },
                { id: 'crest-cracking', type: 'checkbox', label: 'Cracking observed on crest' },
                { id: 'crest-crack-width', type: 'number', label: 'Maximum Crack Width (inches)' },
                { id: 'crest-crack-length', type: 'number', label: 'Crack Length (ft)' },
                { id: 'crest-settlement', type: 'checkbox', label: 'Settlement/depressions on crest' },
                { id: 'crest-settlement-amount', type: 'number', label: 'Estimated Settlement (inches)' },
                { id: 'crest-rutting', type: 'checkbox', label: 'Rutting or erosion on crest' },
                { id: 'upstream-condition', type: 'select', label: 'Upstream Slope Condition', options: ['Good - No Issues', 'Minor Defects', 'Moderate Defects', 'Significant Defects', 'Critical'] },
                { id: 'upstream-erosion', type: 'checkbox', label: 'Wave erosion observed' },
                { id: 'upstream-liner', type: 'checkbox', label: 'Liner/protection intact (if present)' },
                { id: 'downstream-condition', type: 'select', label: 'Downstream Slope Condition', options: ['Good - No Issues', 'Minor Defects', 'Moderate Defects', 'Significant Defects', 'Critical'], required: true },
                { id: 'downstream-seepage', type: 'checkbox', label: 'Seepage observed on downstream slope' },
                { id: 'downstream-wet-areas', type: 'checkbox', label: 'Wet areas or soft spots' },
                { id: 'downstream-erosion', type: 'checkbox', label: 'Erosion rills or gullies' },
                { id: 'downstream-vegetation', type: 'select', label: 'Vegetation Condition', options: ['Well maintained', 'Minor overgrowth', 'Significant overgrowth', 'Trees/woody vegetation present'] },
                { id: 'downstream-cracking', type: 'checkbox', label: 'Tension cracks observed' },
                { id: 'downstream-bulging', type: 'checkbox', label: 'Bulging or displacement' },
                { id: 'downstream-sloughing', type: 'checkbox', label: 'Sloughing or slope failures' },
                { id: 'slope-failure-photo', type: 'photo', label: 'Slope Failure/Instability Photos', multiple: true },
                { id: 'toe-condition', type: 'select', label: 'Toe Area Condition', options: ['Good - No Issues', 'Minor Defects', 'Moderate Defects', 'Significant Defects', 'Critical'] },
                { id: 'toe-seepage', type: 'checkbox', label: 'Seepage at toe' },
                { id: 'toe-boils', type: 'checkbox', label: 'Sand boils observed' },
                { id: 'toe-drain-flowing', type: 'checkbox', label: 'Toe drain flowing (if present)' },
                
                // Seepage & Drainage - Quantitative Data
                { id: 'section-seepage', type: 'section', label: 'Seepage & Drainage - Measured Data' },
                { id: 'note-seepage', type: 'note', label: 'Record actual measured values where available. Attach lab results if turbidity/chemistry sampled.' },
                { id: 'seepage-observed', type: 'checkbox', label: 'Seepage observed' },
                { id: 'seepage-location', type: 'textarea', label: 'Seepage Location Description (station, coordinates)' },
                { id: 'seepage-flow-measured', type: 'number', label: 'Measured Seepage Flow (gpm)' },
                { id: 'seepage-flow-estimate', type: 'select', label: 'Seepage Flow Estimate (if not measured)', options: ['None', 'Damp/Wet', 'Dripping', '<5 gpm', '5-50 gpm', '>50 gpm'] },
                { id: 'seepage-clarity', type: 'select', label: 'Seepage Water Clarity', options: ['Clear', 'Slightly Cloudy', 'Cloudy', 'Turbid/Muddy'] },
                { id: 'seepage-sample-collected', type: 'checkbox', label: 'Water sample collected' },
                { id: 'seepage-sample-id', type: 'text', label: 'Sample ID/Lab Reference' },
                { id: 'underdrain-total-flow', type: 'number', label: 'Total Underdrain Flow (gpm)' },
                { id: 'seepage-photos', type: 'photo', label: 'Seepage Area Photos', multiple: true },
                
                // Instrumentation & Monitoring - Actual Data
                { id: 'section-monitoring', type: 'section', label: 'Instrumentation & Monitoring Data' },
                { id: 'note-monitoring', type: 'note', label: 'Record actual instrument readings. Reference data system/historian where complete dataset stored.' },
                { id: 'data-system-ref', type: 'text', label: 'Monitoring Data System Reference/Link' },
                { id: 'piezometers-read', type: 'checkbox', label: 'Piezometer readings taken' },
                { id: 'piezo-count-read', type: 'number', label: 'Number of Piezometers Read' },
                { id: 'piezo-count-total', type: 'number', label: 'Total Installed Piezometers' },
                { id: 'piezo-anomalies', type: 'checkbox', label: 'Piezometer anomalies/trends noted' },
                { id: 'piezo-max-level', type: 'number', label: 'Highest Phreatic Level (ft below crest)' },
                { id: 'piezo-critical', type: 'text', label: 'Critical Piezometer ID & Reading' },
                { id: 'inclinometers-read', type: 'checkbox', label: 'Inclinometer readings taken' },
                { id: 'incline-movement', type: 'checkbox', label: 'Movement detected in inclinometers' },
                { id: 'incline-max-displacement', type: 'number', label: 'Maximum Cumulative Displacement (inches)' },
                { id: 'incline-critical', type: 'text', label: 'Critical Inclinometer ID & Reading' },
                { id: 'survey-monuments', type: 'checkbox', label: 'Survey monuments read' },
                { id: 'survey-date', type: 'date', label: 'Latest Survey Date' },
                { id: 'monument-movement', type: 'checkbox', label: 'Survey movement exceeds threshold' },
                { id: 'max-horizontal-disp', type: 'number', label: 'Max Horizontal Displacement (ft)' },
                { id: 'max-vertical-disp', type: 'number', label: 'Max Vertical Displacement/Settlement (ft)' },
                { id: 'weirs-read', type: 'checkbox', label: 'Seepage weirs read' },
                { id: 'weir-total-flow', type: 'number', label: 'Total Weir Flow (gpm)' },
                { id: 'insar-reviewed', type: 'checkbox', label: 'InSAR data reviewed' },
                { id: 'insar-date', type: 'date', label: 'Latest InSAR Data Date' },
                { id: 'insar-max-velocity', type: 'number', label: 'Max InSAR Velocity (mm/year)' },
                { id: 'insar-anomalies', type: 'checkbox', label: 'InSAR anomalies identified' },
                { id: 'prism-data-reviewed', type: 'checkbox', label: 'Prism/survey monitoring data reviewed' },
                { id: 'radar-data-reviewed', type: 'checkbox', label: 'Ground-based radar data reviewed (if installed)' },
                { id: 'monitoring-notes', type: 'textarea', label: 'Monitoring Data Observations & Trends' },
                
                // Active Equipment & Operations
                { id: 'section-equipment', type: 'section', label: 'Equipment & Active Operations' },
                { id: 'construction-active', type: 'checkbox', label: 'Active construction/raising in progress' },
                { id: 'contractor-onsite', type: 'text', label: 'Contractor(s) on Site' },
                { id: 'equipment-types', type: 'textarea', label: 'Equipment Operating on Facility (list)' },
                { id: 'equipment-photo', type: 'photo', label: 'Equipment/Operations Photos', multiple: true },
                
                // Photo Documentation
                { id: 'section-photos', type: 'section', label: 'Photo Documentation Summary' },
                { id: 'note-photos', type: 'note', label: 'Ensure all anomalies, seepage, slope conditions, and monitoring infrastructure are photographed with GPS tags' },
                { id: 'overview-photos', type: 'photo', label: 'Facility Overview Photos', multiple: true },
                { id: 'embankment-photos', type: 'photo', label: 'Embankment General Photos', multiple: true },
                { id: 'additional-photos', type: 'photo', label: 'Additional Documentation Photos', multiple: true },
                
                // Risk Assessment & TARP
                { id: 'section-risk', type: 'section', label: 'Risk Assessment & TARP Status' },
                { id: 'dam-safety-condition', type: 'select', label: 'Overall Dam Safety Condition', options: ['Satisfactory', 'Fair', 'Poor', 'Unsatisfactory', 'Critical'], required: true },
                { id: 'immediate-safety-concern', type: 'checkbox', label: 'Immediate safety concerns identified' },
                { id: 'pac-triggered', type: 'checkbox', label: 'Potential for Adverse Consequence (PAC) triggered' },
                { id: 'tarp-triggered', type: 'checkbox', label: 'TARP Level Triggered' },
                { id: 'tarp-level', type: 'select', label: 'TARP Level (if triggered)', options: ['Level 1 - Heightened Awareness', 'Level 2 - Potential Emergency', 'Level 3 - Emergency', 'N/A'] },
                { id: 'tarp-criteria', type: 'textarea', label: 'TARP Trigger Criteria Met (describe)' },
                
                // Actions & Notifications
                { id: 'section-actions', type: 'section', label: 'Actions & Notifications' },
                { id: 'immediate-actions', type: 'textarea', label: 'Immediate Actions Required' },
                { id: 'short-term-actions', type: 'textarea', label: 'Short-term Recommendations (within 30 days)' },
                { id: 'long-term-actions', type: 'textarea', label: 'Long-term Recommendations' },
                { id: 'notify-eor', type: 'checkbox', label: 'Engineer of Record notified' },
                { id: 'eor-contact-time', type: 'datetime', label: 'EoR Contact Date/Time' },
                { id: 'notify-management', type: 'checkbox', label: 'Site/Corporate Management notified' },
                { id: 'notify-regulatory', type: 'checkbox', label: 'Regulatory notification required' },
                { id: 'notify-itrb', type: 'checkbox', label: 'ITRB notification required' },
                { id: 'next-inspection', type: 'date', label: 'Next Scheduled Inspection Date' },
                { id: 'followup-required', type: 'checkbox', label: 'Follow-up inspection required' },
                { id: 'followup-date', type: 'date', label: 'Follow-up Date' },
                
                // Data Provenance & Audit Trail
                { id: 'section-provenance', type: 'section', label: 'Data Provenance & Sign-off' },
                { id: 'note-provenance', type: 'note', label: 'This inspection record provides timestamped data with digital signature for audit purposes' },
                { id: 'data-sources', type: 'textarea', label: 'Data Sources Referenced (systems, reports, personnel)' },
                { id: 'previous-inspection-ref', type: 'text', label: 'Previous Inspection Reference ID' },
                { id: 'report-distribution', type: 'textarea', label: 'Report Distribution List' },
                { id: 'general-notes', type: 'textarea', label: 'Additional Observations & Notes' },
                { id: 'signature', type: 'signature', label: 'Inspector Signature', required: true },
                { id: 'review-required', type: 'checkbox', label: 'EoR/ITRB review required' },
                { id: 'reviewer-name', type: 'text', label: 'Reviewer Name (if reviewed)' },
                { id: 'review-date', type: 'date', label: 'Review Date' }
            ]
        },
        {
            id: 'default-heap-leach',
            name: 'Heap Leach Facility Inspection',
            description: 'Heap leach pad and solution management inspection',
            icon: 'layers',
            isDefault: true,
            fields: [
                // Facility Identification
                { id: 'section-facility', type: 'section', label: 'Facility Identification' },
                { id: 'facility-name', type: 'text', label: 'Facility Name', required: true },
                { id: 'pad-id', type: 'text', label: 'Pad/Phase ID' },
                { id: 'date', type: 'datetime', label: 'Inspection Date/Time', required: true },
                { id: 'inspector', type: 'text', label: 'Inspector Name', required: true },
                { id: 'inspector-role', type: 'select', label: 'Inspector Role', options: ['Engineer of Record', 'Site Engineer', 'Operations Staff', 'Environmental Staff', 'Third Party Reviewer', 'Regulatory Inspector'] },
                { id: 'location', type: 'location', label: 'GPS Coordinates' },
                
                // Heap Status & Stacking
                { id: 'section-stacking', type: 'section', label: 'Heap Status & Stacking' },
                { id: 'heap-status', type: 'select', label: 'Heap Status', options: ['Active Stacking', 'Under Leach - No Stacking', 'Rinsing', 'Draindown', 'Closed'], required: true },
                { id: 'current-lift', type: 'number', label: 'Current Lift Number' },
                { id: 'current-elevation', type: 'number', label: 'Current Top Elevation (ft)' },
                { id: 'design-ultimate-elev', type: 'number', label: 'Design Ultimate Elevation (ft)' },
                { id: 'tonnage-on-pad', type: 'number', label: 'Total Tonnage on Pad (tons)' },
                { id: 'stacking-rate', type: 'number', label: 'Current Stacking Rate (tpd)' },
                { id: 'ore-grade', type: 'number', label: 'Current Ore Grade (opt or g/t)' },
                { id: 'stacking-photo', type: 'photo', label: 'Active Stacking Area Photo', multiple: true },
                
                // Liner & Containment
                { id: 'section-liner', type: 'section', label: 'Liner System & Containment' },
                { id: 'liner-type', type: 'select', label: 'Liner System Type', options: ['Single HDPE', 'Double HDPE', 'GCL Composite', 'Clay', 'Other'] },
                { id: 'liner-exposed', type: 'checkbox', label: 'Exposed liner visible' },
                { id: 'liner-condition', type: 'select', label: 'Exposed Liner Condition', options: ['Good', 'Minor Defects', 'Needs Repair', 'N/A - Not Visible'] },
                { id: 'liner-damage', type: 'checkbox', label: 'Liner damage observed' },
                { id: 'liner-damage-desc', type: 'textarea', label: 'Liner Damage Description' },
                { id: 'lcrs-functioning', type: 'checkbox', label: 'Leak Collection/Recovery System functioning' },
                { id: 'lcrs-flow', type: 'number', label: 'LCRS Flow Rate (gpm)' },
                { id: 'liner-photo', type: 'photo', label: 'Liner/Containment Photos', multiple: true },
                
                // Solution Application
                { id: 'section-solution', type: 'section', label: 'Solution Application' },
                { id: 'leach-method', type: 'select', label: 'Leach Method', options: ['Drip Emitters', 'Wobblers/Sprinklers', 'Drip Tape', 'Combination', 'Not Active'] },
                { id: 'solution-applied', type: 'checkbox', label: 'Solution currently being applied' },
                { id: 'application-rate', type: 'number', label: 'Application Rate (gpm/acre or L/hr/m²)' },
                { id: 'leach-area', type: 'number', label: 'Active Leach Area (acres)' },
                { id: 'emitter-condition', type: 'select', label: 'Emitter/Distribution Condition', options: ['Good', 'Minor Issues', 'Needs Maintenance', 'Poor'] },
                { id: 'ponding-observed', type: 'checkbox', label: 'Ponding on heap surface' },
                { id: 'channeling-observed', type: 'checkbox', label: 'Solution channeling observed' },
                { id: 'solution-photo', type: 'photo', label: 'Solution Application Photos', multiple: true },
                
                // Solution Chemistry & Ponds
                { id: 'section-chemistry', type: 'section', label: 'Solution Chemistry & Ponds' },
                { id: 'barren-ph', type: 'number', label: 'Barren Solution pH' },
                { id: 'barren-cn', type: 'number', label: 'Barren CN (ppm)' },
                { id: 'pregnant-ph', type: 'number', label: 'Pregnant Solution pH' },
                { id: 'pregnant-au', type: 'number', label: 'Pregnant Au Grade (mg/L)' },
                { id: 'pls-pond-level', type: 'number', label: 'PLS Pond Level (% full)' },
                { id: 'barren-pond-level', type: 'number', label: 'Barren Pond Level (% full)' },
                { id: 'event-pond-level', type: 'number', label: 'Event/Storm Pond Level (% full)' },
                { id: 'pond-freeboard', type: 'number', label: 'Minimum Pond Freeboard (ft)' },
                { id: 'pond-liner-condition', type: 'select', label: 'Pond Liner Condition', options: ['Good', 'Minor Issues', 'Needs Repair', 'Critical'] },
                { id: 'pond-photo', type: 'photo', label: 'Solution Pond Photos', multiple: true },
                
                // Slopes & Stability
                { id: 'section-slopes', type: 'section', label: 'Heap Slopes & Stability' },
                { id: 'slope-angle', type: 'number', label: 'Current Slope Angle (degrees)' },
                { id: 'design-slope', type: 'number', label: 'Design Slope Angle (degrees)' },
                { id: 'slope-condition', type: 'select', label: 'Slope Condition', options: ['Good - Stable', 'Minor Raveling', 'Erosion Present', 'Slumping/Movement', 'Failed/Failing'], required: true },
                { id: 'tension-cracks', type: 'checkbox', label: 'Tension cracks observed' },
                { id: 'crack-width', type: 'number', label: 'Maximum Crack Width (inches)' },
                { id: 'slope-movement', type: 'checkbox', label: 'Slope movement observed' },
                { id: 'buttress-condition', type: 'select', label: 'Buttress/Toe Berm Condition', options: ['Good', 'Minor Issues', 'Needs Repair', 'N/A'] },
                { id: 'slope-photo', type: 'photo', label: 'Slope Condition Photos', multiple: true },
                
                // Environmental & Drainage
                { id: 'section-environmental', type: 'section', label: 'Environmental & Drainage' },
                { id: 'stormwater-managed', type: 'checkbox', label: 'Stormwater properly managed' },
                { id: 'diversion-channels', type: 'select', label: 'Diversion Channel Condition', options: ['Good', 'Minor Debris', 'Needs Cleaning', 'Damaged'] },
                { id: 'solution-release', type: 'checkbox', label: 'Any solution release observed' },
                { id: 'release-description', type: 'textarea', label: 'Release Description (if any)' },
                { id: 'wildlife-mortalities', type: 'checkbox', label: 'Wildlife mortalities observed' },
                { id: 'wildlife-deterrents', type: 'checkbox', label: 'Wildlife deterrents in place' },
                
                // Weather
                { id: 'section-weather', type: 'section', label: 'Weather Conditions' },
                { id: 'weather', type: 'select', label: 'Current Weather', options: ['Clear', 'Partly Cloudy', 'Overcast', 'Light Rain', 'Heavy Rain', 'Snow', 'Freezing'] },
                { id: 'temp', type: 'number', label: 'Temperature (°F)' },
                { id: 'recent-precip', type: 'checkbox', label: 'Precipitation in last 24hrs' },
                
                // Actions & Sign-off
                { id: 'section-actions', type: 'section', label: 'Actions & Sign-off' },
                { id: 'overall-condition', type: 'select', label: 'Overall Facility Condition', options: ['Good', 'Fair', 'Poor', 'Critical'], required: true },
                { id: 'immediate-actions', type: 'textarea', label: 'Immediate Actions Required' },
                { id: 'recommendations', type: 'textarea', label: 'Recommendations' },
                { id: 'next-inspection', type: 'date', label: 'Next Inspection Date' },
                { id: 'general-notes', type: 'textarea', label: 'Additional Notes' },
                { id: 'signature', type: 'signature', label: 'Inspector Signature', required: true }
            ]
        },
        {
            id: 'default-stockpile',
            name: 'Stockpile Inspection',
            description: 'Ore, waste, and material stockpile inspection',
            icon: 'mountain',
            isDefault: true,
            fields: [
                // Identification
                { id: 'section-id', type: 'section', label: 'Stockpile Identification' },
                { id: 'stockpile-name', type: 'text', label: 'Stockpile Name/ID', required: true },
                { id: 'stockpile-type', type: 'select', label: 'Stockpile Type', options: ['ROM Ore', 'Crushed Ore', 'Low Grade Ore', 'Waste Rock', 'Topsoil', 'Overburden', 'Construction Material', 'Other'], required: true },
                { id: 'date', type: 'datetime', label: 'Inspection Date/Time', required: true },
                { id: 'inspector', type: 'text', label: 'Inspector Name', required: true },
                { id: 'location', type: 'location', label: 'GPS Coordinates' },
                
                // Stockpile Status
                { id: 'section-status', type: 'section', label: 'Stockpile Status' },
                { id: 'status', type: 'select', label: 'Current Status', options: ['Active - Building', 'Active - Reclaiming', 'Active - Both', 'Inactive', 'Closed/Reclaimed'] },
                { id: 'current-tonnage', type: 'number', label: 'Estimated Current Tonnage (tons)' },
                { id: 'current-height', type: 'number', label: 'Current Height (ft)' },
                { id: 'design-height', type: 'number', label: 'Maximum Design Height (ft)' },
                { id: 'footprint-area', type: 'number', label: 'Footprint Area (acres)' },
                { id: 'overview-photo', type: 'photo', label: 'Overview Photo', multiple: false },
                
                // Slope Conditions
                { id: 'section-slopes', type: 'section', label: 'Slope Conditions' },
                { id: 'slope-angle', type: 'number', label: 'Current Slope Angle (degrees)' },
                { id: 'design-slope', type: 'number', label: 'Design Slope Angle (degrees)' },
                { id: 'slope-condition', type: 'select', label: 'Overall Slope Condition', options: ['Stable', 'Minor Raveling', 'Active Raveling', 'Tension Cracks', 'Slumping', 'Failed'], required: true },
                { id: 'tension-cracks', type: 'checkbox', label: 'Tension cracks present' },
                { id: 'crack-width', type: 'number', label: 'Max Crack Width (inches)' },
                { id: 'recent-movement', type: 'checkbox', label: 'Recent movement observed' },
                { id: 'slope-photo', type: 'photo', label: 'Slope Condition Photos', multiple: true },
                
                // Foundation & Drainage
                { id: 'section-foundation', type: 'section', label: 'Foundation & Drainage' },
                { id: 'foundation-type', type: 'select', label: 'Foundation Type', options: ['Native Ground', 'Prepared Pad', 'Lined', 'Unknown'] },
                { id: 'foundation-condition', type: 'select', label: 'Foundation Condition', options: ['Good', 'Minor Settlement', 'Significant Settlement', 'Heaving', 'Unknown'] },
                { id: 'drainage-adequate', type: 'checkbox', label: 'Surface drainage adequate' },
                { id: 'ponding-observed', type: 'checkbox', label: 'Ponding observed' },
                { id: 'seepage-observed', type: 'checkbox', label: 'Seepage from stockpile' },
                
                // Safety & Access
                { id: 'section-safety', type: 'section', label: 'Safety & Access' },
                { id: 'access-roads', type: 'select', label: 'Access Road Condition', options: ['Good', 'Fair', 'Poor', 'Unsafe'] },
                { id: 'berms-adequate', type: 'checkbox', label: 'Safety berms adequate' },
                { id: 'signage-present', type: 'checkbox', label: 'Warning signage present' },
                { id: 'equipment-operating', type: 'checkbox', label: 'Equipment currently operating' },
                { id: 'equipment-types', type: 'text', label: 'Equipment Types Present' },
                
                // Environmental
                { id: 'section-environmental', type: 'section', label: 'Environmental' },
                { id: 'dust-control', type: 'select', label: 'Dust Control', options: ['Good', 'Moderate Dust', 'Significant Dust', 'N/A'] },
                { id: 'runoff-controlled', type: 'checkbox', label: 'Runoff properly controlled' },
                { id: 'acid-generation', type: 'checkbox', label: 'Signs of acid generation' },
                { id: 'spontaneous-combustion', type: 'checkbox', label: 'Signs of spontaneous combustion (coal/sulfide)' },
                
                // Weather
                { id: 'section-weather', type: 'section', label: 'Weather' },
                { id: 'weather', type: 'select', label: 'Weather', options: ['Clear', 'Cloudy', 'Rain', 'Snow', 'Windy'] },
                { id: 'temp', type: 'number', label: 'Temperature (°F)' },
                { id: 'recent-precip', type: 'checkbox', label: 'Recent precipitation' },
                
                // Actions
                { id: 'section-actions', type: 'section', label: 'Assessment & Actions' },
                { id: 'hazard-level', type: 'select', label: 'Hazard Level', options: ['Low', 'Moderate', 'High', 'Critical'], required: true },
                { id: 'immediate-actions', type: 'textarea', label: 'Immediate Actions Required' },
                { id: 'recommendations', type: 'textarea', label: 'Recommendations' },
                { id: 'notes', type: 'textarea', label: 'Additional Notes' },
                { id: 'next-inspection', type: 'date', label: 'Next Inspection Date' },
                { id: 'signature', type: 'signature', label: 'Inspector Signature', required: true }
            ]
        }
    ],
    
    async init() {
        const existing = await DB.getAll(DB.stores.templates);
        const existingIds = new Set(existing.map(t => t.id));
        // Add any default templates that are missing (handles fresh installs AND
        // app updates that add new defaults without clearing user-created templates).
        for (const template of this.defaultTemplates) {
            if (!existingIds.has(template.id)) {
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
