//authentication

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password})
        })
        const result = await response.json()
        console.log(response.status)
        if(response.ok) {
            localStorage.setItem('token', result.accessToken)
            console.log(result.accessToken)
            window.location.href = '/index'

        } else {
            console.log('login failed', result.message)
        }
        
        
    } catch (error) {
        console.log('error')
        console.log(error)
    }
})