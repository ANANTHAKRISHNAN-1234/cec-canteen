<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SecureScope - Security Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        :root {
            --primary-color: #6366f1;
            --secondary-color: #10b981;
            --warning-color: #f59e0b;
            --danger-color: #ef4444;
            --light-bg: #f8fafc;
            --white: #ffffff;
            --gray-50: #f9fafb;
            --gray-100: #f3f4f6;
            --gray-200: #e5e7eb;
            --gray-300: #d1d5db;
            --gray-400: #9ca3af;
            --gray-500: #6b7280;
            --gray-600: #4b5563;
            --gray-700: #374151;
            --gray-800: #1f2937;
            --gray-900: #111827;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            background: var(--light-bg);
            color: var(--gray-900);
            line-height: 1.6;
        }

        .container-fluid {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%);
            background-size: 400% 400%;
            animation: gradientShift 15s ease infinite;
            min-height: 100vh;
            padding: 20px;
        }

        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        .main-wrapper {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 24px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        /* Unique Sidebar Design */
        .sidebar {
            background: linear-gradient(180deg, var(--gray-900) 0%, var(--gray-800) 100%);
            min-height: calc(100vh - 40px);
            padding: 32px 20px;
            position: relative;
        }

        .sidebar::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 4px;
            height: 100%;
            background: linear-gradient(180deg, var(--primary-color), var(--secondary-color), var(--warning-color));
        }

        .sidebar-header {
            text-align: center;
            margin-bottom: 40px;
        }

        .logo-icon {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 24px;
            margin: 0 auto 16px;
            position: relative;
            overflow: hidden;
        }

        .logo-icon::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent);
            transform: rotate(45deg);
            animation: shine 3s infinite;
        }

        @keyframes shine {
            0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
            50% { transform: translateX(100%) translateY(100%) rotate(45deg); }
            100% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
        }

        .sidebar h5 {
            color: white;
            font-weight: 700;
            font-size: 18px;
        }

        .nav-item {
            padding: 16px 20px;
            margin: 8px 0;
            border-radius: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
            color: var(--gray-400);
            position: relative;
            border-left: 4px solid transparent;
        }

        .nav-item:hover {
            background: rgba(99, 102, 241, 0.1);
            color: var(--primary-color);
            transform: translateX(8px);
            border-left-color: var(--primary-color);
        }

        .nav-item.active {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(16, 185, 129, 0.1));
            color: white;
            border-left-color: var(--secondary-color);
        }

        .nav-title {
            color: var(--gray-500);
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin: 24px 0 12px;
        }

        .repo-status {
            width: 12px;
            height: 12px;
            background: var(--secondary-color);
            border-radius: 50%;
            position: relative;
        }

        .repo-status::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: var(--secondary-color);
            border-radius: 50%;
            opacity: 0.3;
            animation: pulse-ring 2s infinite;
        }

        @keyframes pulse-ring {
            0% { transform: scale(1); opacity: 0.3; }
            100% { transform: scale(1.5); opacity: 0; }
        }

        .repo-name {
            color: white;
            font-weight: 600;
        }

        .repo-info {
            color: var(--gray-400);
            font-size: 11px;
        }

        .add-repo {
            width: 40px;
            height: 40px;
            border: 2px dashed var(--gray-600);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--gray-500);
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 16px;
        }

        .add-repo:hover {
            border-color: var(--primary-color);
            color: var(--primary-color);
            background: rgba(99, 102, 241, 0.1);
        }

        /* Main Content with Glass Effect */
        .main-content {
            padding: 32px;
            background: rgba(248, 250, 252, 0.8);
            backdrop-filter: blur(10px);
        }

        .content-header {
            background: white;
            padding: 32px;
            border-radius: 20px;
            margin-bottom: 32px;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
            border: 1px solid var(--gray-200);
            position: relative;
            overflow: hidden;
        }

        .content-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, var(--primary-color), var(--secondary-color), var(--warning-color), var(--danger-color));
        }

        .search-box {
            background: var(--gray-50);
            border: 2px solid var(--gray-200);
            border-radius: 16px;
            padding: 4px;
            display: flex;
            align-items: center;
            transition: all 0.3s ease;
            position: relative;
        }

        .search-box:focus-within {
            border-color: var(--primary-color);
            box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
        }

        .search-box i {
            color: var(--gray-400);
            margin: 0 12px;
        }

        .search-box input {
            border: none;
            background: transparent;
            padding: 12px 8px;
            width: 280px;
            color: var(--gray-700);
        }

        .search-box input:focus {
            outline: none;
        }

        .search-box input::placeholder {
            color: var(--gray-400);
        }

        /* Hexagonal Cards */
        .stat-card {
            background: white;
            border-radius: 20px;
            padding: 28px;
            position: relative;
            overflow: hidden;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            border: 1px solid var(--gray-200);
            height: 100%;
        }

        .stat-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 6px;
            border-radius: 20px 20px 0 0;
        }

        .stat-card:nth-child(1)::before { background: var(--danger-color); }
        .stat-card:nth-child(2)::before { background: var(--warning-color); }
        .stat-card:nth-child(3)::before { background: var(--warning-color); }
        .stat-card:nth-child(4)::before { background: var(--primary-color); }

        .stat-card:hover {
            transform: translateY(-12px) scale(1.02);
            box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.2);
        }

        .stat-icon {
            width: 56px;
            height: 56px;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            margin-bottom: 20px;
            position: relative;
        }

        .bg-danger-light { 
            background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.1));
            color: var(--danger-color);
        }
        .bg-warning-light { 
            background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(217, 119, 6, 0.1));
            color: var(--warning-color);
        }
        .bg-primary-light { 
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(79, 70, 229, 0.1));
            color: var(--primary-color);
        }
        .bg-success-light { 
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1));
            color: var(--secondary-color);
        }
        .bg-info-light { 
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(37, 99, 235, 0.1));
            color: #3b82f6;
        }
        .bg-purple-light { 
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(124, 58, 237, 0.1));
            color: #8b5cf6;
        }

        .stat-number {
            font-size: 36px;
            font-weight: 800;
            line-height: 1;
            margin-bottom: 8px;
            color: var(--gray-900);
        }

        .stat-label {
            color: var(--gray-600);
            font-weight: 500;
            font-size: 14px;
        }

        .stat-trend {
            position: absolute;
            top: 24px;
            right: 24px;
            font-size: 20px;
        }

        /* Analysis Cards with Unique Layout */
        .analysis-card {
            background: white;
            border-radius: 16px;
            padding: 24px;
            text-align: center;
            transition: all 0.3s ease;
            border: 1px solid var(--gray-200);
            position: relative;
            overflow: hidden;
        }

        .analysis-card::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
            transform: translateX(-100%);
            transition: transform 0.3s ease;
        }

        .analysis-card:hover::after {
            transform: translateX(0);
        }

        .analysis-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.15);
        }

        .analysis-icon {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 16px;
            font-size: 20px;
        }

        .analysis-title {
            color: var(--gray-700);
            font-weight: 600;
            font-size: 13px;
        }

        .analysis-number {
            font-size: 28px;
            font-weight: 700;
            color: var(--gray-900);
            margin-top: 8px;
        }

        /* Modern Table Design */
        .card {
            background: white;
            border: none;
            border-radius: 24px;
            box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .card-header {
            background: linear-gradient(135deg, var(--gray-50), white);
            border-bottom: 1px solid var(--gray-200);
            padding: 24px 32px;
        }

        .card-header h5 {
            color: var(--gray-900);
            font-weight: 700;
        }

        /* Unique Tab Design */
        .analysis-tabs {
            background: var(--gray-50);
            border-bottom: 1px solid var(--gray-200);
        }

        .tab-container {
            display: flex;
            padding: 0 32px;
            overflow-x: auto;
        }

        .analysis-tab {
            background: transparent;
            border: none;
            padding: 20px 24px;
            color: var(--gray-500);
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            font-weight: 500;
            border-radius: 12px 12px 0 0;
            margin: 0 4px;
        }

        .analysis-tab::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 0;
            height: 3px;
            background: var(--primary-color);
            transition: all 0.3s ease;
            transform: translateX(-50%);
            border-radius: 3px;
        }

        .analysis-tab:hover {
            color: var(--primary-color);
            background: rgba(99, 102, 241, 0.05);
        }

        .analysis-tab:hover::before {
            width: 80%;
        }

        .analysis-tab.active {
            color: var(--primary-color);
            background: white;
            font-weight: 600;
        }

        .analysis-tab.active::before {
            width: 100%;
        }

        /* Table Styling */
        .table {
            color: var(--gray-700);
        }

        .table th {
            background: var(--gray-50);
            border-color: var(--gray-200);
            color: var(--gray-600);
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-size: 12px;
            padding: 20px 16px;
        }

        .table td {
            padding: 20px 16px;
            border-color: var(--gray-100);
            vertical-align: middle;
        }

        .table tbody tr {
            transition: all 0.2s ease;
        }

        .table tbody tr:hover {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.02), rgba(16, 185, 129, 0.02));
            transform: scale(1.005);
        }

        /* Modern Severity Badges */
        .severity-badge {
            padding: 8px 16px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border: 2px solid;
            position: relative;
            overflow: hidden;
        }

        .severity-critical {
            background: rgba(239, 68, 68, 0.1);
            color: var(--danger-color);
            border-color: var(--danger-color);
        }

        .severity-high {
            background: rgba(245, 158, 11, 0.1);
            color: var(--warning-color);
            border-color: var(--warning-color);
        }

        .severity-medium {
            background: rgba(99, 102, 241, 0.1);
            color: var(--primary-color);
            border-color: var(--primary-color);
        }

        .severity-low {
            background: rgba(16, 185, 129, 0.1);
            color: var(--secondary-color);
            border-color: var(--secondary-color);
        }

        .vuln-id {
            color: var(--primary-color);
            text-decoration: none;
            font-family: 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace;
            font-size: 12px;
            font-weight: 600;
            transition: all 0.2s ease;
        }

        .vuln-id:hover {
            color: var(--danger-color);
            text-decoration: underline;
        }

        .package-info {
            font-family: 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace;
            font-size: 12px;
            color: var(--gray-600);
        }

        /* Modern Button */
        .btn-primary {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            border: none;
            border-radius: 12px;
            padding: 12px 24px;
            font-weight: 600;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .btn-primary::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            transition: left 0.5s ease;
        }

        .btn-primary:hover::before {
            left: 100%;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.4);
        }

        /* Form Controls */
        .form-select {
            background: white;
            border: 2px solid var(--gray-200);
            border-radius: 12px;
            padding: 12px 16px;
            color: var(--gray-700);
            transition: all 0.3s ease;
        }

        .form-select:focus {
            border-color: var(--primary-color);
            box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
        }

        /* Badge Updates */
        .badge.bg-light {
            background: var(--gray-100) !important;
            color: var(--gray-600) !important;
            border: 1px solid var(--gray-200);
            border-radius: 8px;
            font-weight: 500;
        }

        /* Tab Content */
        .tab-pane {
            min-height: 500px;
            padding: 32px 0;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .sidebar {
                display: none;
            }
            
            .main-content {
                padding: 20px;
            }
            
            .content-header {
                padding: 24px;
            }
            
            .search-box input {
                width: 200px;
            }
        }

        /* Loading */
        .loading {
            display: inline-block;
            width: 24px;
            height: 24px;
            border: 3px solid var(--gray-200);
            border-top: 3px solid var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="container-fluid">
        <div class="main-wrapper">
            <div class="row g-0">
                <!-- Sidebar -->
                <div class="col-md-2 sidebar">
                    <div class="sidebar-header">
                        <div class="logo-icon">
                            <i class="fas fa-shield-alt"></i>
                        </div>
                        <h5>SecureScope</h5>
                    </div>
                    
                    <div class="sidebar-nav">
                        <div class="nav-item">
                            <i class="fas fa-arrow-left me-2"></i>
                            <span>Back to Projects</span>
                        </div>
                        
                        <div class="nav-section mt-4">
                            <div class="nav-title">REPOSITORIES</div>
                            <div class="nav-item active">
                                <div class="d-flex align-items-center">
                                    <div class="repo-status me-3"></div>
                                    <div>
                                        <div class="repo-name">Test Repo</div>
                                        <div class="repo-info">Last updated: 09/01/2025, 15:53:09</div>
                                    </div>
                                </div>
                            </div>
                            <div class="add-repo">
                                <i class="fas fa-plus"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Main Content -->
                <div class="col-md-10 main-content">
                    <!-- Header -->
                    <div class="content-header">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h4 class="mb-1">Test / Test Repo</h4>
                                <p class="text-muted mb-0">Security findings overview and detailed analysis</p>
                            </div>
                            <div class="d-flex gap-3 align-items-center">
                                <div class="search-box">
                                    <i class="fas fa-search"></i>
                                    <input type="text" placeholder="Search findings..." id="searchInput">
                                </div>
                                <button class="btn btn-primary">
                                    <i class="fas fa-download me-2"></i>
                                    Export Report
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Stats Cards -->
                    <div class="row mb-4" id="statsCards">
                        <!-- Stats will be populated by JavaScript -->
                    </div>

                    <!-- Analysis Cards -->
                    <div class="row mb-4" id="analysisCards">
                        <!-- Analysis cards will be populated by JavaScript -->
                    </div>

                    <!-- Findings Table -->
                    <div class="card">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <div class="d-flex align-items-center">
                                <i class="fas fa-bug me-2"></i>
                                <h5 class="mb-0">Snyk SCA Findings</h5>
                            </div>
                            <div class="d-flex gap-2">
                                <span class="badge bg-light text-dark">Vulnerable Path</span>
                                <span class="badge bg-light text-dark">Package View</span>
                            </div>
                        </div>
                        
                        <!-- Analysis Tabs -->
                        <div class="analysis-tabs">
                            <div class="tab-container">
                                <button class="analysis-tab active" data-tab="snyk-sca">
                                    <i class="fas fa-shield-alt me-2"></i>
                                    Snyk SCA
                                </button>
                                <button class="analysis-tab" data-tab="sbom">
                                    <i class="fas fa-list-alt me-2"></i>
                                    SBOM Analysis
                                </button>
                                <button class="analysis-tab" data-tab="sast">
                                    <i class="fas fa-search me-2"></i>
                                    SAST Results
                                </button>
                                <button class="analysis-tab" data-tab="history">
                                    <i class="fas fa-history me-2"></i>
                                    Scan History
                                </button>
                                <button class="analysis-tab" data-tab="analytics">
                                    <i class="fas fa-chart-bar me-2"></i>
                                    Analytics
                                </button>
                            </div>
                        </div>
                        
                        <div class="card-body">
                            <!-- Tab Content -->
                            <div class="tab-content">
                                <!-- Snyk SCA Tab -->
                                <div class="tab-pane active" id="snyk-sca">
                            <!-- Filters -->
                            <div class="row mb-4">
                                <div class="col-md-3">
                                    <select class="form-select" id="severityFilter">
                                        <option value="">All Severities</option>
                                        <option value="CRITICAL">Critical</option>
                                        <option value="HIGH">High</option>
                                        <option value="MEDIUM">Medium</option>
                                        <option value="LOW">Low</option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <select class="form-select" id="dependencyFilter">
                                        <option value="">All Types</option>
                                        <option value="Direct">Direct</option>
                                        <option value="Transitive">Transitive</option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <select class="form-select" id="fixableFilter">
                                        <option value="">All Issues</option>
                                        <option value="true">Fixable</option>
                                        <option value="false">Not Fixable</option>
                                    </select>
                                </div>
                            </div>

                            <!-- Table -->
                            <div class="table-responsive">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Vulnerability ID</th>
                                            <th>Package</th>
                                            <th>Version</th>
                                            <th>Introduced Through</th>
                                            <th>Remediation</th>
                                            <th>Fixed In</th>
                                            <th>Severity</th>
                                        </tr>
                                    </thead>
                                    <tbody id="findingsTable">
                                        <!-- Table rows will be populated by JavaScript -->
                                    </tbody>
                                </table>
                            </div>
                                </div>
                                
                                <!-- SBOM Analysis Tab -->
                                <div class="tab-pane" id="sbom">
                                    <div class="text-center py-5">
                                        <i class="fas fa-list-alt fa-3x text-muted mb-3"></i>
                                        <h4>SBOM Analysis</h4>
                                        <p class="text-muted">Software Bill of Materials analysis results will be displayed here.</p>
                                        <div class="row mt-4">
                                            <div class="col-md-3">
                                                <div class="stat-card text-center">
                                                    <div class="stat-number text-primary">156</div>
                                                    <div class="stat-label">Total Components</div>
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="stat-card text-center">
                                                    <div class="stat-number text-warning">23</div>
                                                    <div class="stat-label">Outdated Components</div>
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="stat-card text-center">
                                                    <div class="stat-number text-success">12</div>
                                                    <div class="stat-label">License Types</div>
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="stat-card text-center">
                                                    <div class="stat-number text-info">89%</div>
                                                    <div class="stat-label">Coverage</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- SAST Results Tab -->
                                <div class="tab-pane" id="sast">
                                    <div class="text-center py-5">
                                        <i class="fas fa-search fa-3x text-muted mb-3"></i>
                                        <h4>SAST Results</h4>
                                        <p class="text-muted">Static Application Security Testing results will be displayed here.</p>
                                        <div class="row mt-4">
                                            <div class="col-md-4">
                                                <div class="stat-card text-center">
                                                    <div class="stat-number text-danger">8</div>
                                                    <div class="stat-label">Critical Issues</div>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="stat-card text-center">
                                                    <div class="stat-number text-warning">15</div>
                                                    <div class="stat-label">High Issues</div>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="stat-card text-center">
                                                    <div class="stat-number text-info">28</div>
                                                    <div class="stat-label">Medium Issues</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Scan History Tab -->
                                <div class="tab-pane" id="history">
                                    <div class="text-center py-5">
                                        <i class="fas fa-history fa-3x text-muted mb-3"></i>
                                        <h4>Scan History</h4>
                                        <p class="text-muted">Historical scan data and trends will be displayed here.</p>
                                        <div class="row mt-4">
                                            <div class="col-md-6">
                                                <div class="stat-card text-center">
                                                    <div class="stat-number text-primary">24</div>
                                                    <div class="stat-label">Total Scans</div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="stat-card text-center">
                                                    <div class="stat-number text-success">2 days ago</div>
                                                    <div class="stat-label">Last Scan</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Analytics Tab -->
                                <div class="tab-pane" id="analytics">
                                    <div class="text-center py-5">
                                        <i class="fas fa-chart-bar fa-3x text-muted mb-3"></i>
                                        <h4>Analytics</h4>
                                        <p class="text-muted">Security analytics and insights will be displayed here.</p>
                                        <div class="row mt-4">
                                            <div class="col-md-3">
                                                <div class="stat-card text-center">
                                                    <div class="stat-number text-success">↓ 15%</div>
                                                    <div class="stat-label">Vulnerability Trend</div>
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="stat-card text-center">
                                                    <div class="stat-number text-primary">7.8</div>
                                                    <div class="stat-label">Risk Score</div>
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="stat-card text-center">
                                                    <div class="stat-number text-warning">3.2 days</div>
                                                    <div class="stat-label">Avg Fix Time</div>
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="stat-card text-center">
                                                    <div class="stat-number text-info">92%</div>
                                                    <div class="stat-label">Fix Rate</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
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
                event.target.closest('.stat-card, .analysis-card').style.transform = 'translateY(-2px) scale(1.02)';
            }
        });

        document.addEventListener('mouseout', function(event) {
            if (event.target.closest('.stat-card') || event.target.closest('.analysis-card')) {
                event.target.closest('.stat-card, .analysis-card').style.transform = 'translateY(0) scale(1)';
            }
        });
    </script>
</body>
</html>
