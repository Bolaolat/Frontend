document.getElementById("create-space-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const resultMessage = document.getElementById("resultMessage");
    const spaceName = document.getElementById("spaceName").value;
    const spaceType = document.getElementById("spaceType").value;

    resultMessage.textContent = "Creating space, please wait...";
    resultMessage.style.color = "blue";

    try {
        const response = await fetch('https://backend-vi04.onrender.com/api/createSpace', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ spaceName, spaceType })
        });

        const result = await response.json();

        if (response.ok) {
            resultMessage.textContent = result.message;
            resultMessage.style.color = "green";
        } else {
            resultMessage.textContent = `Failed: ${result.error}`;
            resultMessage.style.color = "red";
        }
    } catch (error) {
        resultMessage.textContent = `Error: ${error.message}`;
        resultMessage.style.color = "red";
    }
});
