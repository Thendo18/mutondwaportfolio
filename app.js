// Fetch personal info
fetch('/api/personal-info')
  .then(response => response.json())
  .then(data => {
    document.getElementById('personal-info').innerHTML = data.map(
      info => `<p>Name: ${info.name}<br>Email: ${info.email}<br>Bio: ${info.bio}</p>`
    ).join('');
  });

// Similar fetch requests for education, work experience, etc.
