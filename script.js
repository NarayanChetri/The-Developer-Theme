// List of images from your GitHub repository
const images = [
  "https://raw.githubusercontent.com/NarayanChetri/projectImages/refs/heads/main/1.jpg",
  "https://raw.githubusercontent.com/NarayanChetri/projectImages/refs/heads/main/2.jpg",
  "https://raw.githubusercontent.com/NarayanChetri/projectImages/refs/heads/main/3.jpg",
  "https://raw.githubusercontent.com/NarayanChetri/projectImages/refs/heads/main/4.jpg",
  "https://raw.githubusercontent.com/NarayanChetri/projectImages/refs/heads/main/5.jpg",
  "https://raw.githubusercontent.com/NarayanChetri/projectImages/refs/heads/main/6.jpg",
  "https://raw.githubusercontent.com/NarayanChetri/projectImages/refs/heads/main/7.jpg",
  "https://raw.githubusercontent.com/NarayanChetri/projectImages/refs/heads/main/8.jpg",
  "https://raw.githubusercontent.com/NarayanChetri/projectImages/refs/heads/main/9.jpg",
  "https://raw.githubusercontent.com/NarayanChetri/projectImages/refs/heads/main/10.jpg",
];
/* ===============================
   * Random image Logic here  !
   =============================== */

function getRandomImage() {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}

// Preload remote image and replace the fallback image when loaded
function updateImage() {
  const randomImageUrl = getRandomImage();
  const imgElement = document.getElementById("randomImage");

  // Show fallback image first
  imgElement.src = "fallback.jpg"; // Replace with your local image path

  // Preload the remote image
  const img = new Image();
  img.src = randomImageUrl;

  img.onload = () => {
    // Replace fallback with remote image once it’s loaded
    imgElement.src = randomImageUrl;
  };

  img.onerror = () => {
    console.error("Error loading remote image, keeping fallback.");
  };
}

/* ===============================
   * Google search Logic here  !
   =============================== */

document.getElementById("searchForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default form submission
  const query = document.getElementById("searchQuery").value;
  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(
    query
  )}`;
  window.location.href = googleSearchUrl; // Redirect to Google search results
});

// Call the function to update the image on new tab load
updateImage();

/* ===============================
   * to-do app Logic here  !
   =============================== */

const inputBox = document.querySelector("#input-box");
const listContainer = document.querySelector("#list-container");

function addTask() {
  if (inputBox.value == "") {
    alert("you must write something !");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7"; // hexadecimal code for x
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
}

inputBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

listContainer.addEventListener(
  "click",
  (e) => {
    if (e.target.tagName == "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName == "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

// store data so it doesn't vanish
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

// show saved data when browser is opened
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

/* ===============================
   * Programming joke logic here !
   =============================== */

async function fetchProgrammingJoke() {
  const jokeElement = document.getElementById("randomJoke");

  // Show loading message while fetching the joke
  jokeElement.textContent = "Loading joke...";

  try {
    const response = await fetch(
      "https://v2.jokeapi.dev/joke/Programming?type=single"
    );
    const jokeData = await response.json();

    // Check if the joke is successfully retrieved
    if (jokeData.joke) {
      jokeElement.textContent = jokeData.joke;
    } else {
      jokeElement.textContent =
        "Oops! Couldn't fetch a joke. Please try again.";
    }
  } catch (error) {
    console.error("Error fetching the joke:", error);
    jokeElement.textContent =
      "Failed to fetch joke. Check your internet connection.";
  }
}

// Call the function to fetch and display the joke on new tab load
fetchProgrammingJoke();


/* ===============================
   * Ask Question Logic with limit here !
   =============================== */

   function fetchQuestion(retries = 3) {
    fetch(
      "https://opentdb.com/api.php?amount=1&category=18&difficulty=medium&type=multiple"
    )
      .then((response) => response.json())
      .then((data) => {
        const question = data.results[0];
        document.getElementById("question").innerText = question.question;
  
        const optionsList = document.getElementById("options");
        optionsList.innerHTML = ""; // Clear previous options
  
        const allOptions = [
          ...question.incorrect_answers,
          question.correct_answer,
        ].sort(() => Math.random() - 0.5);
  
        allOptions.forEach((option) => {
          const li = document.createElement("li");
          li.innerText = option;
          li.addEventListener("click", () => {
            const resultText =
              option === question.correct_answer ? "Correct!" : "Incorrect!";
            document.getElementById("result").innerText = resultText;
          });
          optionsList.appendChild(li);
        });
  
        document.getElementById("result").innerText = ""; // Reset result on new question
      })
      .catch((error) => {
        if (retries > 0) {
          console.warn("Retrying... attempts left: ", retries);
          fetchQuestion(retries - 1); // Retry fetching the question
        } else {
          console.error("Error fetching question:", error);
          document.getElementById("question").innerText =
            "Error loading question. Please try again.";
        }
      });
  }
  
  function getQuestionCount() {
    const storedData = localStorage.getItem("questionCountData");
    const today = new Date().toDateString();
  
    if (storedData) {
      const { date, count } = JSON.parse(storedData);
      if (date === today) {
        return count;
      }
    }
    return 0;
  }
  
  function incrementQuestionCount() {
    const today = new Date().toDateString();
    const currentCount = getQuestionCount();
    localStorage.setItem(
      "questionCountData",
      JSON.stringify({ date: today, count: currentCount + 1 })
    );
  }
  
  function canAskQuestion() {
    return getQuestionCount() < 5;
  }
  
  // Ensure the question is fetched on page load and when clicking 'Change Question'
  document.addEventListener("DOMContentLoaded", function () {
    if (canAskQuestion()) {
      fetchQuestion();
    } else {
      document.getElementById("question").innerText =
        "You have reached your limit of 5 questions for today. Come back tomorrow!";
    }
  
    document
      .getElementById("changeQuestionBtn")
      .addEventListener("click", function () {
        if (canAskQuestion()) {
          incrementQuestionCount();
          fetchQuestion();
        } else {
          document.getElementById("question").innerText =
            "You have reached your limit of 5 questions for today. Come back tomorrow!";
        }
      });
  });
  
/* ===============================
   * min width 500px !
   =============================== */
  
  // Function to change text when width is smaller than 500px
function checkWidth() {
  if (window.matchMedia("(max-width: 500px)").matches) {
      document.querySelector("h1").textContent = "Bhai itna close toh wo bhi nahi aati thi 😑";
  } else {
      document.querySelector("h1").textContent = "The Developer Theme";
  }
}

// Call the function initially
checkWidth();

// Add event listener to detect window resize and apply changes
window.addEventListener("resize", checkWidth);


/* ===============================
   * Clock Logic here !
   =============================== */

   function updateClock() {
    const timeElement = document.getElementById('time');
    const now = new Date();
    
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // If hours = 0, set to 12
    hours = String(hours).padStart(2, '0');
  
    const day = now.toLocaleString('default', { weekday: 'long' });
    const date = now.getDate();
    const month = now.toLocaleString('default', { month: 'long' });
  
    timeElement.textContent = `${hours}:${minutes} ${ampm} | ${date} ${month}, ${day}`;
  }
  
  setInterval(updateClock, 1000);
  updateClock();
  