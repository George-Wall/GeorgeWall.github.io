// Menu toggle for responsive navigation
const menuToggle = document.querySelector(".menu-toggle");
const primaryMenu = document.getElementById("primary-menu");

menuToggle.addEventListener("click", () => {
   const expanded = menuToggle.getAttribute("aria-expanded") === "true";
   menuToggle.setAttribute("aria-expanded", !expanded);
   primaryMenu.classList.toggle("active");
});


// Modified Project card click handler to redirect to project details page
projectCards.forEach((card) => {
   card.addEventListener("click", () => {
      // Retrieve the URL from the data attribute
      const url = card.getAttribute('data-project-url'); // Assuming you add data-project-url to your HTML
      // Redirect to the URL
      window.location.href = url;
   });
});

// Placeholder for form submission validation
// Add this inside a form submit event listener if you have a form
function validateForm(formData) {
   // Perform validation checks on formData
   // Return true if valid, false otherwise
   return true; // Placeholder return
}

// Example animation for hover effects (expand upon as needed)
const hoverableElements = document.querySelectorAll(".hover-effect");

hoverableElements.forEach((element) => {
   element.addEventListener("mouseover", () => {
      // Apply animation or effect
      element.classList.add("animated");
   });
   element.addEventListener("mouseout", () => {
      // Remove animation or effect
      element.classList.remove("animated");
   });
});

// Example function to add an animated class
function addAnimationClass(element, animationClass) {
   element.classList.add(animationClass);
   element.addEventListener("animationend", () => {
      element.classList.remove(animationClass);
   });
}
