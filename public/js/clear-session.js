window.addEventListener("beforeunload", async () => {
    await fetch("/api/clear-session", {
        method: "POST",
    });
});