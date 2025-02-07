let patientData = []; // Declare a global variable to store patient data

document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://fedskillstest.coalitiontechnologies.workers.dev"; // API URL
  const username = "coalition";
  const password = "skills-test";

  // Encode username and password in Base64 for Basic Authentication
  const basicAuth = btoa(`${username}:${password}`);

  // Fetch data from API with Basic Authentication
  fetch(apiUrl, {
    method: "GET",
    headers: {
      "Authorization": `Basic ${basicAuth}`,
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      patientData = data; // Store the fetched data
      populatePatientList(data); // Populate the patient list
      if (data.length > 0) {
        populatePatientInfo(data[0]); // Show details of the first patient by default
        populateDiagnosisHistory(data[0].diagnosis_history); // Populate diagnosis history
        populateDiagnosticList(data[0].diagnostic_list); // Populate diagnostic list
        populateLabResults(data[0].lab_results); // Populate lab results
      }
    })
    .catch(error => console.error("Error fetching patient data:", error));
});

// Populate Patient List
function populatePatientList(patients) {
  const patientList = document.getElementById("patientList");
  patientList.innerHTML = patients.map((patient, index) => `
    <div class = "patient-item mr-1 ${patient.active ? 'active' : ''}" onclick="loadPatientData(${index})">
      <div class="patient-avatar"><img src="${patient.profile_picture}" alt="${patient.name}"></div>
        <div class="patient-info">
          <div class="font-weight-bold py-1">${patient.name}</div>
          <small>${patient.gender}, ${patient.age}</small>
        </div>
      <div><img src="assets/img/more_horiz_FILL0_wght300_GRAD0_opsz24.svg"></div>
    </div>
  `).join("");
}



// Load data for a specific patient when selected from the list
function loadPatientData(index) {
  const selectedPatient = patientData[index]; // Use the stored data
  populatePatientInfo(selectedPatient);
  populateDiagnosisHistory(selectedPatient.diagnosis_history);
  populateDiagnosticList(selectedPatient.diagnostic_list);
  populateLabResults(selectedPatient.lab_results);
}
function getGenderIcon(gender) {
    return gender.toLowerCase() === 'female' ? 'assets/img/FemaleIcon.svg' : 'assets/img/MaleIcon.svg';
}
// Populate Patient Info
function populatePatientInfo(patient) {
  const patientInfo = document.getElementById("patientInfo");
  patientInfo.innerHTML = `
    <img src="${patient.profile_picture}" alt="${patient.name}" class="profile-image">
    <h2 class="heading">${patient.name}</h2>
                <div class="info-section">
                    
                     <div class="info-item d-flex">
                        <img src="assets/img/BirthIcon.svg">
                        <div class="px-3">
                        <div class="info-label">Date Of Birth</div>
                        <div class="info-desc">${patient.date_of_birth}</div>
                    </div>
                    </div>

                    <div class="info-item">
                        <div class="info-item d-flex">
                        <img src="${getGenderIcon(patient.gender)}">
                        <div class="px-3">
                        <div class="info-label">Gender</div>
                        <div class="info-desc">${patient.gender}</div>
                        </div>
                    </div>
                </div>
                    <div class="info-item">
                        <div class="info-item d-flex">
                        <img src="assets/img/PhoneIcon.svg">
                        <div class="px-3">
                        <div class="info-label">Contact Info</div>
                        <div class="info-desc">${patient.phone_number}</div>
                    </div>
                    </div>
                </div>
                    <div class="info-item">
                        <div class="info-item d-flex">
                        <img src="assets/img/PhoneIcon.svg">
                        <div class="px-3">
                        <div class="info-label">Emergency Contacts</div>
                        <div class="info-desc">${patient.emergency_contact}</div>
                    </div>
                    </div>
                </div>
                    <div class="info-item">
                        <div class="info-item d-flex">
                        <img src="assets/img/InsuranceIcon.svg">
                        <div class="px-3">
                        <div class="info-label">Insurance Provider</div>
                        <div class="info-desc">${patient.insurance_type}</div>
                    </div>
                    </div>
                </div>
            </div>
                <div>
                    <a href="" class="btn info-btn px-4 mt-3">Show All Information</a>
                </div>
  `;
}
     
                    
                
                
                    

// Populate Diagnosis History with Chart
function populateDiagnosisHistory(diagnosisHistory) {
  const diagnosisHistoryDiv = document.getElementById("diagnosisHistory");
  
  // Extract data for the chart
  const labels = diagnosisHistory.map(diagnosis => `${diagnosis.month.substring(0, 3)} ${diagnosis.year}`);
  const systolicData = diagnosisHistory.map(diagnosis => diagnosis.blood_pressure.systolic.value);
  const diastolicData = diagnosisHistory.map(diagnosis => diagnosis.blood_pressure.diastolic.value);

  // Clear previous content and create chart container
   const diagnosisDhartDiv = document.getElementById("chart");
  diagnosisDhartDiv.innerHTML = `
    <canvas id="diagnosisChart"></canvas>
  `;

  // Initialize Chart.js
  const ctx = document.getElementById("diagnosisChart").getContext("2d");
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Systolic',
          data: systolicData,
          borderColor: '#E66FD2',
          tension: 0.4
        },
        {
          label: 'Diastolic',
          data: diastolicData,
          borderColor: '#8C6FE6',
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          grid: {
            display: false // Set to false to hide
          }
        },
        y: {
          grid: {
            color: '#CBC8D4'
          },
          beginAtZero: false,
          min: 60
        }
      }
    }
  });
}

// Populate Diagnostic List
function populateDiagnosticList(diagnosticList) {
  const diagnosticListBody = document.getElementById("diagnosticList");
  diagnosticListBody.innerHTML = diagnosticList.map(diagnostic => `
    <tr>
      <td>${diagnostic.name}</td>
      <td>${diagnostic.description}</td>
      <td>${diagnostic.status}</td>
    </tr>
  `).join("");
}

// Populate Lab Results
function populateLabResults(labResults) {
  const labResultsDiv = document.getElementById("labResults");
  labResultsDiv.innerHTML = labResults.map(result => `
    <div class="download-item">
      <span>${result}</span>
      <img src="assets/img/download_FILL0_wght300_GRAD0_opsz24 (1).svg" alt="Download">
    </div>
  `).join("");
  
}