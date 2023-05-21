/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/ 

/**
 * Define Global Variables
 * 
*/
// For Getting sections in the document
const sections = document.querySelectorAll("section");

// To access ul element
const ul = document.getElementById("navbar__list");

// Creating an empty document fragment which increases performance
const fragment = document.createDocumentFragment();


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
// Function to check if a section is in the viewport
function isSectionInView(section) {
    const sectionRect = section.getBoundingClientRect();
    return (
      sectionRect.top < window.innerHeight / 2 && 
      sectionRect.bottom >= window.innerHeight / 2
    );
  }

// Add an event listener for scroll event
window.addEventListener("scroll", setActiveSection);

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
// Function to set the active state on the sections and navbar.
function setActiveSection() {
    sections.forEach((section) => {
      const sectionId = section.getAttribute("id");
      const anchor = document.querySelector('a[href="#' + sectionId + '"]');
      if (isSectionInView(section)) {
        anchor.classList.add("active");
        section.classList.add("your-active-class");
      } else {
        anchor.classList.remove("active");
        section.classList.remove("your-active-class");
      }
    });
  }

// build the nav
// Looping through each section
sections.forEach((section) => {
    const liItem = document.createElement("li");
    const link = document.createElement("a");
    link.setAttribute("href", `#${section.id}`);
    link.classList.add("menu__link");
    link.textContent = section.getAttribute("data-nav");

    liItem.appendChild(link);
    fragment.appendChild(liItem);
});
    
// Appending the document fragment to ul Element.
ul.appendChild(fragment);

    
// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event
// Function to handle smooth scrolling to sections
function scrollToSection(event) {
  event.preventDefault();
  if (event.target.tagName === 'A') {
  // Get the target section ID from the href attribute
  const targetId = event.target.getAttribute('href');
  
  // Get the target section element
  const targetSection = document.querySelector(targetId);
  // Scroll smoothly to the target section
  targetSection.scrollIntoView({
    behavior: 'smooth'
  });
}
}
/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu  


// Scroll to section on link click
// Get all the menu links
const menuLinks = document.querySelectorAll(".menu__link");
// Add click event listener to each menu link
menuLinks.forEach((link) => {
  link.addEventListener('click', scrollToSection);
});
