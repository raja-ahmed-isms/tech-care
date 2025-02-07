  // Sample patient data
        const patients = [
            {name: 'Emily Williams', gender: 'Female', age: '18'},
            {name: 'Ryan Johnson', gender: 'Male', age: '45'},
            {name: 'Brandon Mitchell', gender: 'Male', age: '36'},
            {name: 'Jessica Taylor', gender: 'Female', age: '28', active: true},
            {name: 'Samantha Johnson', gender: 'Female', age: '56'},
            {name: 'Ashley Martinez', gender: 'Female', age: '54'},
            {name: 'Olivia Brown', gender: 'Female', age: '32'},
            {name: 'Tyler Davis', gender: 'Male', age: '19'},
            {name: 'Kevin Anderson', gender: 'Male', age: '30'},
            {name: 'Dylan Thompson', gender: 'Male', age: '36'},
            {name: 'Nathan Evans', gender: 'Male', age: '58'},
            {name: 'Mike Nolan', gender: 'Male', age: '31'},
            {name: 'Samantha Johnson', gender: 'Female', age: '56'},
            {name: 'Ashley Martinez', gender: 'Female', age: '54'},
            {name: 'Olivia Brown', gender: 'Female', age: '32'},
            {name: 'Tyler Davis', gender: 'Male', age: '19'},
            {name: 'Kevin Anderson', gender: 'Male', age: '30'},
            {name: 'Dylan Thompson', gender: 'Male', age: '36'},
            {name: 'Nathan Evans', gender: 'Male', age: '58'},
            {name: 'Mike Nolan', gender: 'Male', age: '31'}
        ];

        // Populate patient list
        const patientList = document.getElementById('patientList');
        patients.forEach(patient => {
            const div = document.createElement('div');
            div.className = `patient-item mr-1 ${patient.active ? 'active' : ''}`;
            div.innerHTML = `
                <div class="patient-avatar"><img src="https://fedskillstest.ct.digital/4.png" alt="${patient.name}"></div>
                <div class="patient-info">
                    <div class="font-weight-bold py-1">${patient.name}</div>
                    <small>${patient.gender}, ${patient.age}</small>

                </div>
              <div><img src="assets/img/more_horiz_FILL0_wght300_GRAD0_opsz24.svg"></div>
            `;
            patientList.appendChild(div);
        });

        // Initialize blood pressure chart
        const ctx = document.createElement('canvas');
        document.querySelector('.chart-area').appendChild(ctx);
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Oct 2023', 'Nov 2023', 'Dec 2023', 'Jan 2024', 'Feb 2024', 'Mar 2024'],
                datasets: [{
                    label: 'Systolic',
                    data: [120, 118, 160, 115, 145, 150],
                    borderColor: '#E66FD2',
                    tension: 0.4
                }, {
                    label: 'Diastolic',
                    data: [105, 65, 108, 85, 65, 78],
                    borderColor: '#8C6FE6',
                    tension: 0.4
                }]
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
            display: false, // Set to false to hide
            
        }
    },
                    y: {
                        grid: {
            color: '#CBC8D4', 
            
        },
                        beginAtZero: false,
                        min: 60,
                        max: 180
                    }
                }
            }
        });