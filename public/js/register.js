const registerForm = async (event) => {
    event.preventDefault();

    const username = document.querySelector("#username-register").value.trim();
    const password = document.querySelector("#password-register").value.trim();

    if (password.length < 8) {
        alert('Password not strong enough!');
        return;
    };

    if (username && password) {
        const checkUser = await fetch(`/api/users/check-availability?username=${encodeURIComponent(username)}`);
        if (!checkUser.ok) {
            alert('Enter a username!');
            return;
        }

        const usernameData = await checkUser.json();
        if (!usernameData.available) {
            alert('Username already registered!');
            return;
        };

        const response = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({username, password}),
            headers: {"Content-Type": "application/json"},
        });

        if (response.ok) {
            document.location.replace("/");
        } else {
            alert("Failed to register!");
        };
    };
};

document.querySelector("#register-form").addEventListener("submit", registerForm);
