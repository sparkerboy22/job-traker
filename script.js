
let jobs = [];

const template = document.getElementById("jobsData");
for (let el of template.content.children) {
  jobs.push({
    id:          Number(el.dataset.id),
    company:     el.dataset.company,
    position:    el.dataset.position,
    location:    el.dataset.location,
    type:        el.dataset.type.trim(),
    salary:      el.dataset.salary.trim(),
    description: el.dataset.description,
    status:      el.dataset.status
  });
}

let currentTab = "all";

function renderJobs() {
  const container = document.getElementById("jobContainer");
  const filtered = currentTab === "all" ? jobs : jobs.filter(j => j.status === currentTab);

  document.getElementById("tabCount").innerText = filtered.length + " jobs";

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
      <img src="jobs.png"
       class="w-20 mx-auto mb-3">
        <p>No jobs available</p>
        <p>There are no jobs in this section</p>
      </div>`;
    return;
  }

  container.innerHTML = filtered.map(job => `
    <div class="job-card">
      <div class="job-card-header">
        <div class="job-info">
          <p class="job-company">${job.company}</p>
          <p class="job-position">${job.position}</p>
          <div class="job-meta">
            <span>${job.location}</span>
            <span>·</span>
            <span>${job.type}</span>
            <span>·</span>
            <span class="salary">${job.salary}</span>
          </div>
        </div>
        <button class="delete-btn" onclick="deleteJob(${job.id})">Delete</button>
      </div>

      <span class="status-badge ${
        job.status === 'interview' ? 'interview' :
        job.status === 'rejected'  ? 'rejected'  : 'not-selected'
      }">
        ${job.status === 'all' ? 'Not Selected' : capitalize(job.status)}
      </span>

      <p class="job-description">${job.description}</p>

      <div class="job-actions">
        <button class="btn-interview ${job.status === 'interview' ? 'active' : ''}"
                onclick="setStatus(${job.id}, 'interview')">Interview</button>
        <button class="btn-rejected ${job.status === 'rejected' ? 'active' : ''}"
                onclick="setStatus(${job.id}, 'rejected')">Rejected</button>
      </div>
    </div>
  `).join("");
}

function setStatus(id, status) {
  jobs = jobs.map(job => {
    if (job.id === id) job.status = job.status === status ? "all" : status;
    return job;
  });
  updateCounts();
  renderJobs();
}

function deleteJob(id) {
  jobs = jobs.filter(j => j.id !== id);
  updateCounts();
  renderJobs();
}

function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll(".tabBtn").forEach(b => b.classList.remove("activeTab"));
  document.getElementById("tab" + capitalize(tab)).classList.add("activeTab");
  renderJobs();
}

function updateCounts() {
  document.getElementById("totalCount").innerText = jobs.length;
  document.getElementById("interviewCount").innerText = jobs.filter(j => j.status === "interview").length;
  document.getElementById("rejectedCount").innerText = jobs.filter(j => j.status === "rejected").length;
}

function capitalize(w) { return w.charAt(0).toUpperCase() + w.slice(1); }

updateCounts();
renderJobs();
