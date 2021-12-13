const url = 'https://josefineholth.one/photographer-josefineholth/wp-json/wp/v2';
const embed = '/posts?_embed&per_page=100&slug=';

const categoryUrl = 'https://josefineholth.one/photographer-josefineholth/wp-json/wp/v2/categories?per_page=100';

const tagUrl = 'https://josefineholth.one/photographer-josefineholth/wp-json/wp/v2/tags';

const currentUrl = document.location.pathname;
localStorage.setItem('oldUrl', currentUrl);

let selectedCategory;

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
let urlCategory = params.get("category");

const getAdventureImages = document.querySelector('#adventure');
const getElopementsImages = document.querySelector('#elopements');
const getMaternityImages = document.querySelector('#maternity');
const getFamilyPortraitImages = document.querySelector('#family_portrait');
const getPortraitsImages = document.querySelector('#portraits');

const galleriesPosts = document.querySelector('.gallery_content');

let categoryId;
let tagId;
getTags();

function getTags() {
    fetch(tagUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(tag => {
                if (tag.name === 'gallery') {
                    tagId = tag.id;
                    getGalleryPosts();
                    getPostCategory();
                }
            });
        })
}

function getPostCategory() {
    fetch(categoryUrl)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                
                let postsInCategory = data[i].count;

                if (urlCategory === data[i].slug) {
                    if (postsInCategory === 0) {
                        galleriesPosts.innerHTML += `<h1 style="text-align: center;">This gallery is empty</h1>`;
                    } else {
                        categoryId = data[i].id;
                        getGalleryPosts(categoryId);
                    }
                }

            }
        })
}

function getGalleryPosts(categoryId) {
    fetch(url + embed)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                data[i].tags.forEach(element => {
                    if (element === tagId) {
                        
                        let postCategoryId = data[i].categories;
                        let featuredImg = data[i]._embedded['wp:featuredmedia'];
                        const title = data[i].title.rendered;
                        const blogId = data[i].id;
                        
                        if (featuredImg === undefined) {
                            featuredImg = "/images/Image_is_missing.png";
                        } else {
                            featuredImg = featuredImg[0].source_url;
                        }
                        if (urlCategory === null && categoryId === undefined) {
                            
                            galleriesPosts.innerHTML += `
                            <a class="card" href="/blogContent.html?id=${blogId}">
                            <div class="frame" style="background-image: url('${featuredImg}')">
                            </div>
                            <h2>${title}</h2>
                            </a>`;
                        } else {
                            if (postCategoryId == categoryId) {

                                galleriesPosts.innerHTML += `
                            <a class="card" href="/blogContent.html?id=${blogId}">
                            <div class="frame" style="background-image: url('${featuredImg}')">
                            </div>
                            <h2>${title}</h2>
                            </a>`;
                            }
                        }
                    }
                });
            }
        })
        .catch((error) => {
            galleriesPosts.innerHTML = `
            <h1 style="text-align: center;">This gallery is empty</h1>`;
        })
}

getAdventureImages.addEventListener('click', function () {
    urlCategory = 'adventure';
    document.title = "Gallery full of Adventures";
    galleriesPosts.innerHTML = '';
    getPostCategory();
})

getElopementsImages.addEventListener('click', function () {
    urlCategory = 'elopements';
    document.title = "Gallery full of elopements";
    galleriesPosts.innerHTML = '';
    getPostCategory();
})
getMaternityImages.addEventListener('click', function () {
    urlCategory = 'maternity';
    document.title = "Gallery full of Maternity portraits";
    galleriesPosts.innerHTML = '';
    getPostCategory();
})
getFamilyPortraitImages.addEventListener('click', function () {
    urlCategory = 'family_portrait';
    document.title = "Gallery full of beautiful family portraits";
    galleriesPosts.innerHTML = '';
    getPostCategory();
})
getPortraitsImages.addEventListener('click', function () {
    urlCategory = 'portraits';
    document.title = "Gallery full of portraits";
    galleriesPosts.innerHTML = '';
    getPostCategory();
})