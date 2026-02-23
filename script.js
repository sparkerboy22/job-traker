let jobs = [];

// Load jobs from HTML template
const template =
document.getElementById("jobsData");

let elements =
template.content.children;

for(let el of elements){

  jobs.push({

    id:Number(el.dataset.id),
    company:el.dataset.company,
    position:el.dataset.position,
    location:el.dataset.location,
    type:el.dataset.type,
    salary:el.dataset.salary,
    description:el.dataset.description,
    status:el.dataset.status

  });

}


let currentTab="all";


// Render Jobs
function renderJobs(){

const container =
document.getElementById("jobContainer");

let filteredJobs;

if(currentTab==="all"){
filteredJobs=jobs;
}
else{
filteredJobs=
jobs.filter(job=>
job.status===currentTab);
}


// Update tab count
document.getElementById("tabCount").innerText =
filteredJobs.length + " jobs";


// Empty state
if(filteredJobs.length===0){

container.innerHTML=`

<div class="bg-white p-10 text-center rounded shadow">

<img src="jobs.png"
class="w-20 mx-auto mb-3">

<p class="font-semibold">
No jobs available
</p>

<p class="text-gray-500 text-sm">
There are no jobs in this section
</p>

</div>

`;

return;

}


// Render Cards
container.innerHTML =
filteredJobs.map(job=>`

<div class="bg-white p-4 rounded shadow">

<div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">

<div>

<h3 class="font-bold">
${job.company}
</h3>

<p class="text-gray-500">${job.position}</p> 
<br>
<div class="flex">
<p class="text-gray-500 text-sm">
${job.location}
</p> -  
 <p class="text-gray-500"> ${job.type}</p> - 
   ${job.salary}</p>
</div>


</div>

<button onclick="deleteJob(${job.id})"
class="text-red-500 font-bold">
Delete
</button>

</div>


<div class="mt-2 text-sm space-y-1">

<p class="font-semibold mt-1">

<span class="${
job.status==="interview"
? "bg-green-600 text-white p-2"
: job.status==="rejected"
? "bg-red-600 text-white p-2"
: "bg-gray-200 p-2"
}">

${
job.status==="all"
? "Not Selected"
: capitalize(job.status)
}

</span>

</p>
<br>
<p>${job.description}</p>


</div>


<div class="flex flex-col sm:flex-row gap-2 mt-3">

<button
onclick="setStatus(${job.id},'interview')"
class="px-3 py-1 text-white rounded
${job.status==="interview"
? "bg-green-700"
: "bg-green-500"}">

Interview

</button>


<button
onclick="setStatus(${job.id},'rejected')"
class="px-3 py-1 text-white rounded
${job.status==="rejected"
? "bg-red-700"
: "bg-red-500"}">

Rejected

</button>

</div>

</div>

`).join("");

}



// Set Status
function setStatus(id,status){

jobs = jobs.map(job=>{

if(job.id===id){

if(job.status===status){
job.status="all";
}
else{
job.status=status;
}

}

return job;

});

updateCounts();
renderJobs();

}


// Delete Job
function deleteJob(id){

jobs =
jobs.filter(job=>
job.id!==id);

updateCounts();
renderJobs();

}


// Switch Tab
function switchTab(tab){

currentTab=tab;

document.querySelectorAll(".tabBtn")
.forEach(btn=>{
btn.classList.remove("activeTab");
});

document.getElementById(
"tab"+capitalize(tab)
).classList.add("activeTab");

renderJobs();

}


// Update Dashboard Counts
function updateCounts(){

document.getElementById("totalCount")
.innerText=jobs.length;

document.getElementById("interviewCount")
.innerText=
jobs.filter(job=>
job.status==="interview").length;

document.getElementById("rejectedCount")
.innerText=
jobs.filter(job=>
job.status==="rejected").length;

}


// Capitalize
function capitalize(word){

return word.charAt(0).toUpperCase()
+ word.slice(1);

}


// Initial Load
updateCounts();
renderJobs();