<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SecureScope - Security Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="styles.css" rel="stylesheet">
</head>
<body>
    <div class="container-fluid">
        <div class="row">
            <!-- Sidebar -->
            <div class="col-md-2 sidebar">
                <div class="sidebar-header">
                    <div class="d-flex align-items-center mb-4">
                        <div class="logo-icon me-2">
                            <i class="fas fa-shield-alt"></i>
                        </div>
                        <h5 class="mb-0">SecureScope</h5>
                    </div>
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
                                <div class="repo-status me-2"></div>
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
                        <div class="d-flex gap-2">
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
                        <div class="row mb-3">
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

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="script.js"></script>
</body>
</html>
