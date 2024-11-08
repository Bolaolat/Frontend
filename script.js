document.getElementById("create-space-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Elements for status messages
    const resultMessage = document.getElementById("resultMessage");

    // Get the space name and type values from the input
    const spaceName = document.getElementById("spaceName").value;
    const spaceType = document.getElementById("spaceType").value;

    // Hugging Face API endpoint and authorization token
    const API_URL = "https://huggingface.co/api/repos/create";
    const API_KEY = "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";

    // Prepare the request payload
    const payload = {
        name: spaceName,
        type: spaceType,
        private: false,
        sdk: "docker"
    };

    try {
        // Send POST request to create the new space
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok) {
            resultMessage.textContent = `Space "${spaceName}" created successfully!`;
            resultMessage.style.color = "green";
        } else {
            resultMessage.textContent = `Failed to create space: ${result.error}`;
            resultMessage.style.color = "red";
        }
    } catch (error) {
        resultMessage.textContent = `Error: ${error.message}`;
        resultMessage.style.color = "red";
    }
});
