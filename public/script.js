document.addEventListener("DOMContentLoaded", function () {
  const logForm = document.getElementById("logForm");
  const userNameInput = document.getElementById("userName");
  const logList = document.getElementById("log");
  const button = document.getElementById("submitButton");

  // Function to fetch and update the log data
  function updateLog() {
    fetch("/log")
      .then((response) => response.json())
      .then((data) => {
        logList.innerHTML = ""; // Clear the existing list

        // Retrive only the last 10 entries
        data = data.slice(-10);

        // Invert the order of the entries
        data.reverse();

        // Add each entry to the list
        data.forEach((entry) => {
          const listItem = document.createElement("li");
          listItem.textContent = entry;
          logList.appendChild(listItem);
        });
      });
  }

  // Update the log when the page loads
  updateLog();

  logForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let userName = userNameInput.value;

    // If the user name is empty, add an error class to the input field
    if (userName === "") {
      userNameInput.classList.add("error");
      setTimeout(function () {
        userNameInput.classList.remove("error");
      }, 3000);

      return;
    } else {
      // Make field read-only
      userNameInput.setAttribute("readonly", true);
    }

    // If the button is disabled, don't do anything
    if (button.classList.contains("disabled")) {
      return;
    }

    // Turn of button for 5 seconds
    button.classList.add("disabled");
    setTimeout(function () {
      button.classList.remove("disabled");
    }, 5000);

    // Send request to server
    fetch(`/log?userName=${userName}`, { method: "POST" }).then(() => {
      updateLog(); // Update the log after the button press
    });
  });
});
