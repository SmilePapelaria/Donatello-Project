document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const adminUser = document.getElementById('admin-user');
    const adminPassword = document.getElementById('admin-password');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const user = adminUser.value.toLowerCase();  
        const password = adminPassword.value;

        if (user === 'admin' && password === '123456') {
            localStorage.setItem('isAdminLogged', 'true');
            window.location.href = 'admin-dashboard.html';
        } else {
            errorMessage.style.display = 'block';
        }
    });
});
