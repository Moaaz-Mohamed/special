// Local Storage
let mainColors = localStorage.getItem("color-option");
if (mainColors !== null) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color-option")
  );
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    //  Add Active class
    if (element.dataset.color === mainColors) element.classList.add("active");
  });
}
//  Variables for Background
let backgroundOption = true;
let backgroundInterval;
// Local storage for background
let backgroundLocalItem = localStorage.getItem("background_option");
// check in local Storage
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  // Remove active from all spans
  document.querySelectorAll(".random-backgrounds span").forEach((ele) => {
    ele.classList.remove("active");
  });
  if (backgroundLocalItem === "true") {
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

// Toggle
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("open");
};

// Switch Colors

const colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // Local Storage
    localStorage.setItem("color-option", e.target.dataset.color);
    // Remove Active
    handleActive(e);
  });
});

// Switch backgrounds options

const randomBackEl = document.querySelectorAll(".random-backgrounds span");
randomBackEl.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

// Select landing page
let landingPage = document.querySelector(".landing-page");
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
// Random Background option
function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      landingPage.style.backgroundImage = `url("imgs/${imgsArray[randomNumber]}")`;
    }, 1000);
  }
}
// Select Skills Selector
let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
  // Skills offset Top
  let skillsOffsetTop = ourSkills.offsetTop;
  // Outer Height
  let skillsOuterHeight = ourSkills.offsetHeight;
  // Window Height
  let windowHeight = this.innerHeight;
  // window scroll Top
  let windowScrollTop = this.pageYOffset;
  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(".skill-box .progress span");
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};
// Create PopUp with the images
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create overLay element
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    // append overlay to the body
    document.body.appendChild(overlay);
    // Create the popup
    let popupBox = document.createElement("div");
    // Add class to popup box
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // Create Heading
      let imgHeading = document.createElement("h3");
      // create Text for Heading
      let imgText = document.createTextNode(img.alt);
      // Append the Text to the heading
      imgHeading.appendChild(imgText);
      // Append the Heading to the popUp
      popupBox.appendChild(imgHeading);
    }
    // Create the img
    let popupImage = document.createElement("img");
    // set image source
    popupImage.src = img.src;
    // add img to popup box
    popupBox.appendChild(popupImage);
    // append popup box to the body
    document.body.appendChild(popupBox);
    //  Create Close Span
    let closeButton = document.createElement("span");
    // create the close button text
    let closeButtonText = document.createTextNode("X");
    // Append the Text to The Close Button
    closeButton.appendChild(closeButtonText);
    // Add class to Close Button
    closeButton.className = "close-button";
    // Add Close button to the popup Box
    popupBox.appendChild(closeButton);
  });
});

// Close Popup
document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    // Remove the pop up

    e.target.parentNode.remove();
    // Remove Overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// Select ALl Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
// Select ALl Links
const allLinks = document.querySelectorAll(".links a");

function scrollTo(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollTo(allBullets);
scrollTo(allLinks);
// Handle Active Stats
function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  // Add Active
  ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option");
if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
    handleActive(e);
  });
});


// Reset Button 

document.querySelector(".reset-options").onclick = function (){

  localStorage.clear();
  window.location.reload();

}

// Toggle menu 
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");


toggleBtn.onclick = function (e){
    e.stopPropagation();
    this.classList.toggle("menu-active");
    tLinks.classList.toggle("open");
}
document.addEventListener('click' , (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    if(tLinks.classList.contains("open")){
      toggleBtn.classList.toggle("menu-active");
      tLinks.classList.toggle("open");
    }


  }
  

  });
  
  tLinks.onclick = function (e){
    e.stopPropagation();
  }