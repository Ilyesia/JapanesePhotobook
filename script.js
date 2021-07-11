const imageContainer = document.getElementById("image-container");
const loader = document.getAnimations("loader");

let ready = false;
let imagesLoad = 0;
let totalImages = 0;
let photosArray = [];

/* Unsplash API */
const count = 30;
const apiKey = "yxVjdABrYPRQv8lrJHjPiEYAG87J1Wm53jJS9NGKgeA";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}&query=japan`;

/* Checks loaded images */
function imageLoad() {
    imagesLoad++;
    if (imagesLoad === totalImages) {
      ready = true;
      loader.hidden = true;
    }
  }

/* Set DOM Elements */
function setAttributes(element, attributes) {
    for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
  }  

/*Create elements for links and photos */
function displayPhotos() {
    totalImages = photosArray.length;
    /* runs function for each object in the photosArray */
    photosArray.forEach((photo) => {
       /*  <a> for Unsplash */
       const item = document.createElement("a");
       setAttributes(item, {
         href: photo.links.html,
         target: "_blank",
       });
       /*  Create image for photos */
       const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    /* Event listener for finished loading */
    img.addEventListener("load", imageLoad)
      /* puts image inside anchor then both inside imageContainer */
      item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

/* Retrive Unsplash API */
async function getPhotos() {
    try {
      const response = await fetch(apiUrl);
      photosArray = await response.json();
      displayPhotos();
    } catch (error) {
      // Catch Error Here
    }
}

/* Loading more photos event listener */
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) { 
        ready = false;
        getPhotos();
    }
});

/* OnLoading */
getPhotos();