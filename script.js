const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0; 
let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = 'VCzZ9Y9xnHtADTpft9Pt-VWCDu8dDW-8Sk57jMG50_w';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if each image is loaded into DOM
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}
// Helper Function to Set Attributes on Dom Elements
function setAttributes(element, attributes){
    const attributesObj = Object.entries(attributes);
    for (const [name, attr] of attributesObj){
        element.setAttribute(name, attr);
    }
}
// Create Elements for Links & Photos and add to Dom
function displayPhotos(){
    totalImages = totalImages + photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item,{
            href:photo.links.html,
            target:'_blank'
        })
        // Create Image for photo
        const img = document.createElement('img');
        setAttributes(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description
        });
        img.addEventListener('load',imageLoaded);
        // Put image inside <a> then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}
async function getPhotosFromUnsplashApi(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }
    catch(e){
        console.log(e);
    }
}
// Check to see if scrolling near bottom of page, Load More photos
window.addEventListener('scroll', () => {    
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotosFromUnsplashApi();
    }
});
// On load
getPhotosFromUnsplashApi();
