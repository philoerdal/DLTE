// Set up the formatted introductory text
const introText = `
<strong>Course:</strong> <br> 
"Set up a FaceTime call with your family." <br><br>

<strong>Let’s make it happen together!</strong> <br><br>

<strong>Steps:</strong> <br>
1. <strong>Install FaceTime</strong> and ensure you have an Apple ID. <br>
2. <strong>Check your internet connection.</strong> <br>
3. <strong>Get the Apple ID</strong> of the family member you want to call. <br><br>

Feel free to ask me any questions, and I'll guide you step by step! <br><br>
`;

// Display the formatted introductory text in the popup
document.getElementById('introText').innerHTML = introText;

// Event listener for the Ask button
document.getElementById('askBtn').addEventListener('click', async () => {
  const userQuery = document.getElementById('userInput').value.trim();
  const responseDiv = document.getElementById('response');
  responseDiv.textContent = "Thinking...";

  if (!userQuery) {
    responseDiv.textContent = "Please enter a question.";
    return;
  }

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer ###INSERT API KEY HERE"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { "role": "system", "content": "You are a helpful and friendly assistant. Your responses must be short, simple, well-formatted, and friendly. Provide helpful information without overcomplicating." },
          { "role": "assistant", "content": introText },
          { "role": "user", "content": userQuery }
        ]
      })
    });

    const data = await res.json();
    if (data && data.choices && data.choices.length > 0) {
      responseDiv.textContent = data.choices[0].message.content.trim();
    } else {
      responseDiv.textContent = "No response received.";
    }
  } catch (error) {
    console.error(error);
    responseDiv.textContent = "Error fetching response.";
  }
});

// Event listener for the Understand button
document.getElementById('understandBtn').addEventListener('click', () => {
  document.body.innerHTML = `
    <div class="container" style="text-align: center;">
      <h1 style="font-size: 32px; color: #4CAF50;">Congratulations!</h1>
      <p style="font-size: 20px; color: #333;">Congratulations on completing the FaceTime set up course!</p>
      <p style="font-size: 20px; color: #333;">Keep up the good work!</p>
      <button id="profileBtn" style="margin-top: 20px; padding: 10px 20px; font-size: 16px; font-weight: bold; background-color: #2196F3; color: #ffffff; border: none; border-radius: 8px; cursor: pointer; transition: background-color 0.3s ease;">Go to your profile and check out your progress!</button>
    </div>
  `;

  document.getElementById('profileBtn').addEventListener('click', () => {
    // Redirect to the profile page or perform any other action
    window.location.href = '/profile'; // Change this URL to the actual profile page URL
  });
});
