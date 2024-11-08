document.getElementById("create-space-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Elements for status messages
    const resultMessage = document.getElementById("resultMessage");
    const loadingIndicator = document.getElementById("loadingIndicator");

    // Get the space name and type values from the input
    const spaceName = document.getElementById("spaceName").value.trim();
    const spaceType = document.getElementById("spaceType").value.trim();
    const isPrivate = document.getElementById("isPrivate").checked;

    // Validate inputs
    if (!spaceName || !spaceType) {
        resultMessage.textContent = "Please provide both a name and a type for the space.";
        resultMessage.style.color = "red";
        return;
    }

    // Hugging Face API endpoint (API key should be stored securely)
    const API_URL = "https://huggingface.co/api/repos/create";
    const API_KEY = "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";  // Should be stored in server-side code

    // Prepare the request payload
    const payload = {
        name: spaceName,
        type: spaceType,
        private: isPrivate,
        sdk: "docker"
    };

    // Show loading indicator and clear any previous message
    loadingIndicator.style.display = "block";
    resultMessage.textContent = "";

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

        // Hide loading indicator
        loadingIndicator.style.display = "none";

        if (response.ok) {
            resultMessage.innerHTML = `Space "<a href="https://huggingface.co/spaces/${spaceName}" target="_blank">${spaceName}</a>" created successfully!`;
            resultMessage.style.color = "green";
        } else {
            // Display error with detailed response message
            resultMessage.textContent = `Failed to create space: ${result.error || "Unknown error"} (HTTP ${response.status})`;
            resultMessage.style.color = "red";
        }
    } catch (error) {
        // Hide loading indicator and display network error
        loadingIndicator.style.display = "none";
        resultMessage.textContent = `Error: ${error.message}. Check your internet connection.`;
        resultMessage.style.color = "red";
    }
});
