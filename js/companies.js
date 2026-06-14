// ============================================
// COMPANIES PAGE RENDERER
// 50+ companies hiring AI/LLM engineers
// ============================================

var companySearch = '';
var companyFilter = 'all';

function renderCompanies() {
  var container = document.getElementById('tab-companies');
  if (!container) return;

  var totalCompanies = COMPANIES.length;
  var indiaCompanies = COMPANIES.filter(function(c) { return c.hq.indexOf('India') !== -1 || c.hq.indexOf('Bangalore') !== -1 || c.hq.indexOf('Mumbai') !== -1 || c.hq.indexOf('Gurugram') !== -1 || c.hq.indexOf('Chennai') !== -1; }).length;
  var remoteCompanies = COMPANIES.filter(function(c) { return c.notes && c.notes.toLowerCase().indexOf('remote') !== -1; }).length;

  var html = '';

  // Header
  html += '<div class="dash-hero">';
  html += '<div class="dash-greeting"><h2>Top Companies Hiring AI/LLM Engineers</h2><p class="text-muted">FAANG, Indian Unicorns, AI Startups, Global Leaders</p></div>';
  html += '<div class="dash-hero-row">';
  html += '<div class="dash-stats-col">';
  html += '<div class="stat-chip-sm"><div class="stat-val">' + totalCompanies + '</div><div class="stat-lbl">Companies</div></div>';
  html += '<div class="stat-chip-sm"><div class="stat-val">' + indiaCompanies + '</div><div class="stat-lbl">India-Based</div></div>';
  html += '<div class="stat-chip-sm"><div class="stat-val">' + remoteCompanies + '</div><div class="stat-lbl">Remote/Hybrid</div></div>';
  html += '</div></div></div>';

  // Search
  html += '<div style="margin-bottom:12px;">';
  html += '<input type="text" class="search-input" placeholder="Search companies, roles, skills..." oninput="searchCompanies(this.value)">';
  html += '</div>';

  // Filter
  html += '<div class="filter-bar">';
  html += '<button class="filter-btn ' + (companyFilter === 'all' ? 'active' : '') + '" onclick="setCompanyFilter(\'all\')">All</button>';
  html += '<button class="filter-btn ' + (companyFilter === 'FAANG' ? 'active' : '') + '" onclick="setCompanyFilter(\'FAANG\')">FAANG+</button>';
  html += '<button class="filter-btn ' + (companyFilter === 'India' ? 'active' : '') + '" onclick="setCompanyFilter(\'India\')">India</button>';
  html += '<button class="filter-btn ' + (companyFilter === 'Startup' ? 'active' : '') + '" onclick="setCompanyFilter(\'Startup\')">Startups</button>';
  html += '<button class="filter-btn ' + (companyFilter === 'Research' ? 'active' : '') + '" onclick="setCompanyFilter(\'Research\')">Research Labs</button>';
  html += '</div>';

  // Company cards
  var faang = ['Google', 'OpenAI', 'Meta', 'Microsoft', 'Amazon', 'Apple', 'NVIDIA', 'Anthropic', 'Mistral', 'Cohere'];
  var india = ['Flipkart', 'Razorpay', 'PhonePe', 'Zomato', 'Swiggy', 'Meesho', 'Cred', 'Ola', 'Sarvam AI', 'Yellow.ai', 'Fractal', 'Freshworks'];
  var research = ['Google', 'DeepMind', 'OpenAI', 'Meta', 'Anthropic', 'Mistral AI', 'Stability AI', 'Together AI'];
  var startups = ['Hugging Face', 'LangChain', 'Pinecone', 'Perplexity AI', 'Runway', 'Groq', 'Together AI', 'Weights & Biases', 'Modal', 'Replicate', 'Replit'];

  var filtered = COMPANIES.filter(function(c) {
    if (companySearch) {
      var q = companySearch.toLowerCase();
      var searchFields = (c.name + ' ' + c.roles + ' ' + c.skills + ' ' + c.hq + ' ' + c.notes).toLowerCase();
      if (searchFields.indexOf(q) === -1) return false;
    }
    if (companyFilter === 'FAANG') return faang.some(function(f) { return c.name.indexOf(f) !== -1; });
    if (companyFilter === 'India') return india.some(function(f) { return c.name.indexOf(f) !== -1; }) || c.hq.indexOf('India') !== -1 || c.hq.indexOf('Bangalore') !== -1 || c.hq.indexOf('Mumbai') !== -1 || c.hq.indexOf('Gurugram') !== -1 || c.hq.indexOf('Chennai') !== -1;
    if (companyFilter === 'Startup') return startups.some(function(f) { return c.name.indexOf(f) !== -1; });
    if (companyFilter === 'Research') return research.some(function(f) { return c.name.indexOf(f) !== -1; });
    return true;
  });

  filtered.forEach(function(company, idx) {
    html += '<div class="company-card hover-lift" style="animation-delay:' + (idx * 0.03) + 's">';
    html += '<div class="cc-header">';
    html += '<div class="cc-name">' + company.name + '</div>';
    html += '<div class="cc-hq">' + company.hq + '</div>';
    html += '</div>';
    html += '<div class="cc-roles">' + company.roles + '</div>';
    html += '<div class="cc-skills">';
    company.skills.split(', ').forEach(function(skill) {
      html += '<span class="skill-tag">' + skill + '</span>';
    });
    html += '</div>';
    if (company.notes) {
      html += '<div class="cc-notes">' + company.notes + '</div>';
    }
    html += '<div class="cc-actions">';
    html += '<a href="' + company.url + '" target="_blank" class="cc-link-btn" rel="noopener">View Careers &rarr;</a>';
    html += '</div>';
    html += '</div>';
  });

  if (filtered.length === 0) {
    html += '<div style="padding:32px;text-align:center;color:var(--text-muted);font-size:14px;">No companies match your search.</div>';
  }

  container.innerHTML = html;
}

function searchCompanies(query) {
  companySearch = query.trim();
  renderCompanies();
}

function setCompanyFilter(filter) {
  companyFilter = filter;
  renderCompanies();
}
