/* Custom CSS for Security Dashboard */
:root {
    --primary-color: #4285f4;
    --secondary-color: #34a853;
    --warning-color: #fbbc04;
    --danger-color: #ea4335;
    --dark-color: #202124;
    --light-gray: #f8f9fa;
    --border-color: #e8eaed;
    --text-muted: #5f6368;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f8f9fa;
    font-size: 14px;
}

/* Sidebar Styles */
.sidebar {
    background: white;
    border-right: 1px solid var(--border-color);
    min-height: 100vh;
    padding: 20px 15px;
}

.sidebar-header .logo-icon {
    width: 32px;
    height: 32px;
    background: var(--primary-color);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}

.nav-item {
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s;
    font-size: 13px;
    color: var(--text-muted);
}

.nav-item:hover {
    background-color: var(--light-gray);
}

.nav-item.active {
    background-color: #e8f0fe;
    color: var(--primary-color);
}

.nav-title {
    font-size: 11px;
    font-weight: 600;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 10px;
}

.repo-status {
    width: 8px;
    height: 8px;
    background: var(--secondary-color);
    border-radius: 50%;
}

.repo-name {
    font-weight: 500;
    color: var(--dark-color);
}

.repo-info {
    font-size: 11px;
    color: var(--text-muted);
}

.add-repo {
    width: 24px;
    height: 24px;
    border: 1px dashed var(--border-color);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
    cursor: pointer;
    margin-top: 10px;
}

/* Main Content */
.main-content {
    padding: 20px;
}

.content-header {
    margin-bottom: 24px;
}

.search-box {
    position: relative;
    display: flex;
    align-items: center;
}

.search-box i {
    position: absolute;
    left: 12px;
    color: var(--text-muted);
    z-index: 2;
}

.search-box input {
    border: 1px solid var(--border-color);
    border-radius: 6px;
    padding: 8px 12px 8px 36px;
    font-size: 13px;
    width: 250px;
}

.search-box input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.2);
}

/* Stats Cards */
.stat-card {
    background: white;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 20px;
    transition: box-shadow 0.2s;
}

.stat-card:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.stat-icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    margin-bottom: 12px;
}

.stat-number {
    font-size: 28px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 4px;
}

.stat-label {
    font-size: 12px;
    color: var(--text-muted);
    font-weight: 500;
}

.stat-trend {
    font-size: 20px;
    margin-left: auto;
}

/* Analysis Cards */
.analysis-card {
    background: white;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    transition: box-shadow 0.2s;
}

.analysis-card:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.analysis-icon {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 8px;
    font-size: 14px;
}

.analysis-title {
    font-size: 12px;
    color: var(--text-muted);
    margin-bottom: 4px;
}

.analysis-number {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 8px;
}

/* Table Styles */
.card {
    border: 1px solid var(--border-color);
    border-radius: 8px;
    box-shadow: none;
}

.card-header {
    background: white;
    border-bottom: 1px solid var(--border-color);
    padding: 16px 20px;
}

.table {
    margin-bottom: 0;
    font-size: 13px;
}

.table th {
    border-top: none;
    border-bottom: 1px solid var(--border-color);
    font-weight: 600;
    color: var(--text-muted);
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 12px;
}

.table td {
    border-top: 1px solid #f0f0f0;
    padding: 12px;
    vertical-align: middle;
}

.table tbody tr:hover {
    background-color: #f8f9fa;
}

/* Severity Badges */
.severity-badge {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.severity-critical {
    background: #fce8e6;
    color: #d93025;
}

.severity-high {
    background: #fef7e0;
    color: #f9ab00;
}

.severity-medium {
    background: #e8f0fe;
    color: #1a73e8;
}

.severity-low {
    background: #e6f4ea;
    color: #137333;
}

/* Vulnerability ID Styling */
.vuln-id {
    font-family: 'Courier New', monospace;
    font-size: 12px;
    color: var(--primary-color);
    text-decoration: none;
}

.vuln-id:hover {
    text-decoration: underline;
}

/* Package Info */
.package-info {
    font-family: 'Courier New', monospace;
    font-size: 12px;
}

/* Responsive Design */
@media (max-width: 768px) {
    .sidebar {
        display: none;
    }
    
    .main-content {
        padding: 15px;
    }
    
    .search-box input {
        width: 200px;
    }
    
    .content-header .d-flex {
        flex-direction: column;
        gap: 15px;
    }
}

/* Loading Animation */
.loading {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Custom Button Styles */
.btn-primary {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
    font-size: 13px;
    padding: 8px 16px;
    border-radius: 6px;
}

.btn-primary:hover {
    background-color: #3367d6;
    border-color: #3367d6;
}

/* Form Controls */
.form-select {
    font-size: 13px;
    border: 1px solid var(--border-color);
    border-radius: 6px;
}

.form-select:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.2);
}

/* Badge Styles */
.badge {
    font-size: 11px;
    padding: 4px 8px;
}

.bg-light {
    background-color: #f1f3f4 !important;
}

/* Icon Colors */
.text-danger { color: var(--danger-color) !important; }
.text-warning { color: var(--warning-color) !important; }
.text-success { color: var(--secondary-color) !important; }
.text-primary { color: var(--primary-color) !important; }

/* Background Colors for Stats */
.bg-danger-light { background-color: #fce8e6; color: var(--danger-color); }
.bg-warning-light { background-color: #fef7e0; color: var(--warning-color); }
.bg-success-light { background-color: #e6f4ea; color: var(--secondary-color); }
.bg-primary-light { background-color: #e8f0fe; color: var(--primary-color); }
.bg-info-light { background-color: #e3f2fd; color: #1976d2; }
.bg-purple-light { background-color: #f3e5f5; color: #7b1fa2; }

/* Analysis Tabs */
.analysis-tabs {
    border-bottom: 1px solid var(--border-color);
    background: #f8f9fa;
    padding: 0;
}

.tab-container {
    display: flex;
    overflow-x: auto;
    padding: 0 20px;
}

.analysis-tab {
    background: none;
    border: none;
    padding: 12px 20px;
    font-size: 13px;
    font-weight: 500;
    color: var(--text-muted);
    cursor: pointer;
    transition: all 0.2s ease;
    border-bottom: 2px solid transparent;
    white-space: nowrap;
    display: flex;
    align-items: center;
}

.analysis-tab:hover {
    color: var(--primary-color);
    background-color: rgba(66, 133, 244, 0.05);
}

.analysis-tab.active {
    color: var(--primary-color);
    border-bottom-color: var(--primary-color);
    background-color: white;
}

.analysis-tab i {
    font-size: 12px;
}

/* Tab Content */
.tab-content {
    min-height: 400px;
}

.tab-pane {
    display: none;
}

.tab-pane.active {
    display: block;
}

/* Responsive tabs */
@media (max-width: 768px) {
    .tab-container {
        padding: 0 15px;
    }
    
    .analysis-tab {
        padding: 10px 15px;
        font-size: 12px;
    }
    
    .analysis-tab i {
        display: none;
    }
}
