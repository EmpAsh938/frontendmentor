const features = [
    {
        image: "./images/illustration-features-tab-1.svg",
        title: "Bookmark in one click",
        description: "Organize your bookmarks however you like. Our simple drag-and-drop interface gives you complete control over how you manage your favourite sites."
    },
    {
        image: "./images/illustration-features-tab-2.svg",
        title: "Intelligent search",
        description: "Our powerful search feature will help you find saved sites in no time at all. No need to trawl through all of your bookmarks."
    },
    {
        image: "./images/illustration-features-tab-3.svg",
        title: "Share your bookmarks",
        description: "Easily share your bookmarks and collections with others. Create a shareable link that you can send at the click of a button."
    }
]

const featureImage = document.querySelector('.feature-img');
const featureTitle = document.querySelector('.feature-title');
const featureDesc = document.querySelector('.feature-desc');
const featuresButton = document.querySelector('.features-btn');
const faqQuestion = document.querySelector('.faq-container');
const closeMenu = document.querySelector('.close-menu');
const activeMenu = document.querySelector('.active-menu');
const menu = document.querySelector('.aside-menu');

function featureLoad(index){
    const {image,title,description} = features[index];
    featureImage.src = image;
    featureTitle.textContent = title;
    featureDesc.textContent = description;
    setButtonActive(index+1);
}

function setButtonActive(index){
    featuresButton.childNodes.forEach(item => {
        if(item.tagName == 'BUTTON' && item.dataset.id == index){
            item.classList.add('active');
        } else if (item.tagName == 'BUTTON') {
            item.classList.remove('active');
        }
    })
}

function toggleFaq(elem){
    elem.classList.toggle('showhide');
}

function triggerMenu(){
    menu.classList.toggle('active-aside-menu')
}

window.addEventListener('DOMContentLoaded', () => featureLoad(0));
closeMenu.addEventListener('click', triggerMenu);
activeMenu.addEventListener('click', triggerMenu);
faqQuestion.addEventListener('click', (e) => {
    let elem = e.target;
    if(elem.classList.contains('faq-question')){
        toggleFaq(elem.nextElementSibling);
    } else if(elem.parentElement.classList.contains('faq-question')){
        toggleFaq(elem.parentElement.nextElementSibling);
    }   
})
featuresButton.addEventListener('click', (e) => {
    let index = parseInt(e.target.dataset.id); 
    if(index >=1){
        featureLoad(index-1);
    }
})
