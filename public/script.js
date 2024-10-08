document.addEventListener('DOMContentLoaded', function () {
    fetchPersonalInfo();
    fetchEducation();
    fetchWorkExperience();
    fetchSkills();
    fetchProjects();

    document.getElementById('contact-form').addEventListener('submit', function (e) {
        e.preventDefault();
        sendContactForm();
    });
});

function fetchPersonalInfo() {
    fetch('/api/personal-info')
        .then(response => response.json())
        .then(data => {
            const personalInfoDiv = document.getElementById('personal-info');
            if (data.length > 0) {
                const info = data[0]; // Assuming there's only one entry
                personalInfoDiv.innerHTML = `
                    <p>Name: ${info.name}</p>
                    <p>Contact: ${info.contact}</p>
                    <p>Bio: ${info.bio}</p>
                `;
            } else {
                personalInfoDiv.innerHTML = '<p>No personal information available.</p>';
            }
        })
        .catch(error => console.error('Error fetching personal info:', error));
}

function fetchEducation() {
    fetch('/api/education')
        .then(response => response.json())
        .then(data => {
            const educationInfoDiv = document.getElementById('education-info');
            if (data.length > 0) {
                const educationItems = data.map(item => `<p>${item.degree} from ${item.institution} (Completed: ${item.year_completed})</p>`).join('');
                educationInfoDiv.innerHTML = educationItems;
            } else {
                educationInfoDiv.innerHTML = '<p>No education information available.</p>';
            }
        })
        .catch(error => console.error('Error fetching education:', error));
}

function fetchWorkExperience() {
    fetch('/api/work-experience')
        .then(response => response.json())
        .then(data => {
            const workInfoDiv = document.getElementById('work-info');
            if (data.length > 0) {
                const workItems = data.map(item => `<p>${item.job_title} at ${item.company} (${item.year_started} - ${item.year_ended})</p>`).join('');
                workInfoDiv.innerHTML = workItems;
            } else {
                workInfoDiv.innerHTML = '<p>No work experience available.</p>';
            }
        })
        .catch(error => console.error('Error fetching work experience:', error));
}

function fetchSkills() {
    fetch('/api/skills')
        .then(response => response.json())
        .then(data => {
            const skillsInfoDiv = document.getElementById('skills-info');
            if (data.length > 0) {
                const skillsList = data.map(item => `<li>${item.skill_name}</li>`).join('');
                skillsInfoDiv.innerHTML = `<ul>${skillsList}</ul>`;
            } else {
                skillsInfoDiv.innerHTML = '<p>No skills available.</p>';
            }
        })
        .catch(error => console.error('Error fetching skills:', error));
}

function fetchProjects() {
    fetch('/api/projects')
        .then(response => response.json())
        .then(data => {
            const projectsInfoDiv = document.getElementById('projects-info');
            if (data.length > 0) {
                const projectItems = data.map(item => `<p><strong>${item.project_name}</strong>: ${item.description}</p>`).join('');
                projectsInfoDiv.innerHTML = projectItems;
            } else {
                projectsInfoDiv.innerHTML = '<p>No projects available.</p>';
            }
        })
        .catch(error => console.error('Error fetching projects:', error));
}

function sendContactForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
    })
        .then(response => {
            if (response.ok) {
                alert('Message sent successfully!');
                document.getElementById('contact-form').reset();
            } else {
                alert('Failed to send message.');
            }
        })
        .catch(error => console.error('Error sending contact form:', error));
}
