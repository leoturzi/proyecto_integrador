const logoutBtn = document.querySelector('#logout');

logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    sessionStorage.clear();
    window.location.href = `http://localhost:3033/users/logout`;
});
