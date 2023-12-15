const registerForm = async (event) => {
    event.preventDefault();

    const username = document.querySelector("#username-register").value.trim();
    const password = document.querySelector("#password-register").value.trim();

    if (username && password) {
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