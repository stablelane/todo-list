

document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault()
    const name = document.getElementById('name').value
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const errorMessageElement = document.getElementById('error-message'); // Add an element for displaying errors
    errorMessageElement.textContent = '';

    try {
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                name,
                username,
                password
            })
        })
        const result = await response.json()
        if(response.ok) {
            window.location.href = '/login'
        } else {
            errorMessageElement.textContent = result.error || 'Signup failed. Please try again.';
            console.log('signup failed', result.error)
        }
    } catch (error) {
        console.log(error)
    }
})