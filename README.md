// Dummy data arrays
const statsData = [
    {
        id: 'vulnerabilities',
        title: 'Total Vulnerabilities',
        value: 44,
        icon: 'fas fa-exclamation-triangle',
        color: 'bg-danger-light',
        trend: 'fas fa-arrow-up text-danger'
    },
    {
        id: 'sast',
        title: 'SAST Issues',
        value: 51,
        icon: 'fas fa-code',
        color: 'bg-warning-light',
        trend: 'fas fa-arrow-up text-warning'
    },
    {
        id: 'license',
        title: 'License Risks',
        value: 4,
        icon: 'fas fa-certificate',
        color: 'bg-warning-light',
        trend: 'fas fa-minus text-muted'
    },
    {
        id: 'risk-score',
        title: 'Risk Score',
        value: '7.8',
        icon: 'fas fa-chart-line',
        color: 'bg-primary-light',
        trend: 'fas fa-arrow-up text-primary'
    }
];

const analysisData = [
    {
        title: 'Snyk SCA',
        icon: 'fas fa-shield-alt',
        color: 'bg-primary-light'
    },
    {
        title: 'SBOAM Analysis',
        icon: 'fas fa-list-alt',
        color: 'bg-info-light'
    },
    {
        title: 'SAST Results',
        icon: 'fas fa-search',
        color: 'bg-success-light'
    },
    {
        title: 'Scan History',
        icon: 'fas fa-history',
        color: 'bg-success-light'
    },
    {
        title: 'Analytics',
        icon: 'fas fa-chart-bar',
        color: 'bg-purple-light'
    }
];

const analysisStats = [
    {
        title: 'Total Vulnerabilities',
        value: 44,
        icon: 'fas fa-bug',
        color: 'bg-primary-light'
    },
    {
        title: 'Affected Packages',
        value: 6,
        icon: 'fas fa-box',
        color: 'bg-warning-light'
    },
    {
        title: 'Fixable Issues',
        value: 42,
        icon: 'fas fa-wrench',
        color: 'bg-success-light'
    },
    {
        title: 'Single Upgrade Fixes',
        value: 2,
        icon: 'fas fa-arrow-up',
        color: 'bg-purple-light'
    }
];

const vulnerabilityData = [
    {
        id: 'SNYK-JS-FORMDATA-10841158',
        package: 'form-data',
        version: '4.0.0',
        introducedThrough: 'axios@1.5.0',
        remediation: 'axios@1.5.0 → form-data@4.0.4',
        fixedIn: '2.5.4, 3.0.4, 4.0.4',
        severity: 'CRITICAL',
        dependency: 'Direct'
    },
    {
        id: 'SNYK-JS-AXIOS-7361793',
        package: 'axios',
        version: '1.5.0',
        introducedThrough: 'Direct',
        remediation: 'axios@1.7.4',
        fixedIn: '1.7.4',
        severity: 'HIGH',
        dependency: 'Direct'
    },
    {
        id: 'SNYK-JS-AXIOS-6144788',
        package: 'axios',
        version: '1.5.0',
        introducedThrough: 'Direct',
        remediation: 'axios@1.6.4',
        fixedIn: '0.28.0, 1.6.4',
        severity: 'HIGH',
        dependency: 'Direct'
    },
    {
        id: 'SNYK-JS-LODASH-567746',
        package: 'lodash',
        version: '4.17.20',
        introducedThrough: 'lodash@4.17.20',
        remediation: 'lodash@4.17.21',
        fixedIn: '4.17.21',
        severity: 'HIGH',
        dependency: 'Direct'
    },
    {
        id: 'SNYK-JS-MINIMIST-559764',
        package: 'minimist',
        version: '1.2.5',
        introducedThrough: 'mkdirp@0.5.5 → minimist@1.2.5',
        remediation: 'minimist@1.2.6',
        fixedIn: '1.2.6',
        severity: 'MEDIUM',
        dependency: 'Transitive'
    },
    {
        id: 'SNYK-JS-PATHPARSE-1077067',
        package: 'path-parse',
        version: '1.0.6',
        introducedThrough: 'resolve@1.20.0 → path-parse@1.0.6',
        remediation: 'path-parse@1.0.7',
        fixedIn: '1.0.7',
        severity: 'MEDIUM',
        dependency: 'Transitive'
    },
    {
        id: 'SNYK-JS-SEMVER-3247795',
        package: 'semver',
        version: '6.3.0',
        introducedThrough: 'semver@6.3.0',
        remediation: 'semver@7.5.2',
        fixedIn: '7.5.2',
        severity: 'MEDIUM',
        dependency: 'Direct'
    },
    {
        id: 'SNYK-JS-JSONSCHEMA-1920922',
        package: 'jsonschema',
        version: '1.4.0',
        introducedThrough: 'jsonschema@1.4.0',
        remediation: 'jsonschema@1.4.1',
        fixedIn: '1.4.1',
        severity: 'LOW',
        dependency: 'Direct'
    },
    {
        id: 'SNYK-JS-VALIDATOR-1090599',
        package: 'validator',
        version: '13.7.0',
        introducedThrough: 'validator@13.7.0',
        remediation: 'validator@13.9.0',
        fixedIn: '13.9.0',
        severity: 'LOW',
        dependency: 'Direct'
    },
    {
        id: 'SNYK-JS-MOMENT-2944238',
        package: 'moment',
        version: '2.29.1',
        introducedThrough: 'moment@2.29.1',
        remediation: 'moment@2.29.4',
        fixedIn: '2.29.4',
        severity: 'LOW',
        dependency: 'Direct'
    }
];

// Global variables
let filteredData = [...vulnerabilityData];

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', function() {
    renderStatsCards();
    renderAnalysisCards();
    renderAnalysisStats();
    renderVulnerabilityTable();
    setupEventListeners();
    setupTabSwitching();
});

// Render stats cards
function renderStatsCards() {
    const container = document.getElementById('statsCards');
    container.innerHTML = '';
    
    statsData.forEach(stat => {
        const card = document.createElement('div');
        card.className = 'col-md-3 mb-3';
        card.innerHTML = `
            <div class="stat-card">
                <div class="d-flex align-items-start">
                    <div>
                        <div class="stat-icon ${stat.color}">
                            <i class="${stat.icon}"></i>
                        </div>
                        <div class="stat-number">${stat.value}</div>
                        <div class="stat-label">${stat.title}</div>
                    </div>
                    <div class="stat-trend">
                        <i class="${stat.trend}"></i>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Render analysis cards
function renderAnalysisCards() {
    const container = document.getElementById('analysisCards');
    container.innerHTML = '';
    
    // First row - analysis options
    const analysisRow = document.createElement('div');
    analysisRow.className = 'row mb-3';
    
    analysisData.forEach(analysis => {
        const card = document.createElement('div');
        card.className = 'col-md-2 mb-2';
        card.innerHTML = `
            <div class="analysis-card">
                <div class="analysis-icon ${analysis.color}">
                    <i class="${analysis.icon}"></i>
                </div>
                <div class="analysis-title">${analysis.title}</div>
            </div>
        `;
        analysisRow.appendChild(card);
    });
    
    container.appendChild(analysisRow);
}

// Render analysis stats
function renderAnalysisStats() {
    const container = document.getElementById('analysisCards');
    
    // Second row - stats
    const statsRow = document.createElement('div');
    statsRow.className = 'row mb-4';
    
    analysisStats.forEach(stat => {
        const card = document.createElement('div');
        card.className = 'col-md-3 mb-2';
        card.innerHTML = `
            <div class="analysis-card">
                <div class="analysis-icon ${stat.color}">
                    <i class="${stat.icon}"></i>
                </div>
                <div class="analysis-title">${stat.title}</div>
                <div class="analysis-number">${stat.value}</div>
            </div>
        `;
        statsRow.appendChild(card);
    });
    
    container.appendChild(statsRow);
}

// Render vulnerability table
function renderVulnerabilityTable() {
    const tbody = document.getElementById('findingsTable');
    tbody.innerHTML = '';
    
    if (filteredData.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center py-4 text-muted">
                    <i class="fas fa-search mb-2" style="font-size: 24px;"></i>
                    <div>No vulnerabilities found matching your criteria</div>
                </td>
            </tr>
        `;
        return;
    }
    
    filteredData.forEach(vuln => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <a href="#" class="vuln-id">${vuln.id}</a>
            </td>
            <td>
                <span class="package-info">${vuln.package}</span>
            </td>
            <td>
                <span class="package-info">${vuln.version}</span>
            </td>
            <td>
                <span class="package-info">${vuln.introducedThrough}</span>
            </td>
            <td>
                <span class="package-info">${vuln.remediation}</span>
            </td>
            <td>
                <span class="package-info">${vuln.fixedIn}</span>
            </td>
            <td>
                <span class="severity-badge severity-${vuln.severity.toLowerCase()}">${vuln.severity}</span>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', handleSearch);
    
    // Filter functionality
    const severityFilter = document.getElementById('severityFilter');
    const dependencyFilter = document.getElementById('dependencyFilter');
    const fixableFilter = document.getElementById('fixableFilter');
    
    severityFilter.addEventListener('change', applyFilters);
    dependencyFilter.addEventListener('change', applyFilters);
    fixableFilter.addEventListener('change', applyFilters);
}

// Setup tab switching functionality
function setupTabSwitching() {
    const tabButtons = document.querySelectorAll('.analysis-tab');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding pane
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Update the main heading based on selected tab
            const headingMap = {
                'snyk-sca': 'Snyk SCA Findings',
                'sbom': 'SBOM Analysis',
                'sast': 'SAST Results',
                'history': 'Scan History',
                'analytics': 'Analytics'
            };
            
            const heading = document.querySelector('.card-header h5');
            if (heading && headingMap[targetTab]) {
                heading.textContent = headingMap[targetTab];
            }
        });
    });
}

// Handle search
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    applyFilters();
    
    if (searchTerm) {
        filteredData = filteredData.filter(vuln => 
            vuln.id.toLowerCase().includes(searchTerm) ||
            vuln.package.toLowerCase().includes(searchTerm) ||
            vuln.introducedThrough.toLowerCase().includes(searchTerm) ||
            vuln.remediation.toLowerCase().includes(searchTerm)
        );
    }
    
    renderVulnerabilityTable();
}

// Apply filters
function applyFilters() {
    const severityFilter = document.getElementById('severityFilter').value;
    const dependencyFilter = document.getElementById('dependencyFilter').value;
    const fixableFilter = document.getElementById('fixableFilter').value;
    
    filteredData = vulnerabilityData.filter(vuln => {
        let matches = true;
        
        if (severityFilter && vuln.severity !== severityFilter) {
            matches = false;
        }
        
        if (dependencyFilter && vuln.dependency !== dependencyFilter) {
            matches = false;
        }
        
        if (fixableFilter) {
            const isFixable = vuln.fixedIn !== 'No fix available';
            if (fixableFilter === 'true' && !isFixable) {
                matches = false;
            } else if (fixableFilter === 'false' && isFixable) {
                matches = false;
            }
        }
        
        return matches;
    });
    
    renderVulnerabilityTable();
    updateStats();
}

// Update stats based on filtered data
function updateStats() {
    const totalVulns = filteredData.length;
    const criticalCount = filteredData.filter(v => v.severity === 'CRITICAL').length;
    const highCount = filteredData.filter(v => v.severity === 'HIGH').length;
    const mediumCount = filteredData.filter(v => v.severity === 'MEDIUM').length;
    const lowCount = filteredData.filter(v => v.severity === 'LOW').length;
    
    // Update the stats display if needed
    console.log(`Filtered results: ${totalVulns} total, ${criticalCount} critical, ${highCount} high, ${mediumCount} medium, ${lowCount} low`);
}

// Utility functions
function getSeverityColor(severity) {
    switch(severity.toUpperCase()) {
        case 'CRITICAL': return 'text-danger';
        case 'HIGH': return 'text-warning';
        case 'MEDIUM': return 'text-primary';
        case 'LOW': return 'text-success';
        default: return 'text-muted';
    }
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).format(date);
}

// Export functionality (placeholder)
function exportReport() {
    alert('Export functionality would be implemented here');
}

// Add click handlers for interactive elements
document.addEventListener('click', function(event) {
    if (event.target.closest('.analysis-card')) {
        const card = event.target.closest('.analysis-card');
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 150);
    }
    
    if (event.target.closest('.vuln-id')) {
        event.preventDefault();
        const vulnId = event.target.textContent;
        alert(`Would open details for vulnerability: ${vulnId}`);
    }
});

// Add hover effects
document.addEventListener('mouseover', function(event) {
    if (event.target.closest('.stat-card') || event.target.closest('.analysis-card')) {
        event.target.closest('.stat-card, .analysis-card').style.transform = 'translateY(-2px)';
    }
});

document.addEventListener('mouseout', function(event) {
    if (event.target.closest('.stat-card') || event.target.closest('.analysis-card')) {
        event.target.closest('.stat-card, .analysis-card').style.transform = 'translateY(0)';
    }
});
