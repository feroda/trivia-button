document.addEventListener("DOMContentLoaded", function() {
  const logForm = document.getElementById("logForm");
  const userNameInput = document.getElementById("userName");
  const logList = document.getElementById("log");

  // Function to fetch and update the log data
  function updateLog() {
    fetch("/log")
      .then(response => response.json())
      .then(data => {
        logList.innerHTML = ""; // Clear the existing list
        data.forEach(entry => {
          const listItem = document.createElement("li");
          listItem.textContent = entry;
          logList.appendChild(listItem);
        });
      });
  }

  // Update the log when the page loads
  updateLog();

  logForm.addEventListener("submit", function(e) {
    e.preventDefault();
    let userName = userNameInput.value;

    fetch(`/log?userName=${userName}`, { method: "POST" })
      .then(() => {
        userNameInput.value = ""; // Clear the input field
        updateLog(); // Update the log after the button press
      });
  });
});
