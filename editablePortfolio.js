document.addEventListener('DOMContentLoaded', async () => {
    const personalInfoId = localStorage.getItem('personalInfoId'); // Get the ID from local storage
    const response = await fetch(`/api/personal-info/${personalInfoId}`);
    const data = await response.json();

    // Populate the form with existing data
    document.getElementById('name').value = data.name;
    document.getElementById('email').value = data.email;
    document.getElementById('bio').value = data.bio;

    // Handle form submission
    document.getElementById('editPortfolioForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const updatedInfo = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            bio: document.getElementById('bio').value
        };

        // Send updated data to the server
        const updateResponse = await fetch(`/api/personal-info/${personalInfoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedInfo)
        });

        if (updateResponse.ok) {
            alert('Portfolio updated successfully!');
            window.location.href = 'portfolio.html'; // Redirect back to the portfolio page
        } else {
            alert('Error updating portfolio.');
        }
    });
});
