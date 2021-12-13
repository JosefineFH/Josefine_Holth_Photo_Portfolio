/* -------------------------------- API Call -------------------------------- */
const lastPostUrl = 'https://josefineholth.one/photographer-josefineholth/wp-json/wp/v2/posts?_embed&per_page=3&page=';
const nextPosts = document.querySelector(".next_posts");
const prevPosts = document.querySelector(".prev_posts");
let postCarousel = document.querySelector('.blog_post_carousel');
const currentUrl = document.location.pathname;
localStorage.setItem('oldUrl', currentUrl)

let pageCount = 1;
let imageIndex = 0;
let totalPageWithPosts

/* -------------------------------- slideshow ------------------------------- */

function autoSlideshow() {
    let slideImages = document.querySelectorAll(".slide");

    for (let i = 0; i < slideImages.length; i++) {
        slideImages[i].style.display = "none";
    }

    imageIndex++;
    if (imageIndex > slideImages.length) {
        imageIndex = 1
    }
    slideImages[imageIndex - 1].style.display = "block";
    setTimeout(autoSlideshow, 8000);
}
autoSlideshow();

/* --------------------------- Latest Post Section -------------------------- */

getLatestPost()

function getLatestPost() {
    fetch(lastPostUrl + pageCount)
        .then(response => {
            totalPageWithPosts = response.headers.get('x-wp-totalpages');

            return response.json()
        })
        .then(data => {
            const postData = data

            for (let i = 0; i < postData.length; i++) {
                let altText = postData[i]._embedded['wp:featuredmedia'];
                let postFeaturedMedia = postData[i]._embedded['wp:featuredmedia'];
                let blogTitle = postData[i].title.rendered;
                let blogId = postData[i].id
                let blogPostCategories = postData[i]._embedded['wp:term'][0]
                
                if (postFeaturedMedia === undefined) {
                    postFeaturedMedia = '/images/Image_is_missing.png'
                } else {
                    postFeaturedMedia = postFeaturedMedia[0].source_url
                }
                if (altText === undefined) {
                    altText = 'alt text is missing'
                } else {
                    altText = altText[0].alt_text
                }
                postCarousel.innerHTML += `
                <div class="post_card">
                    <a href="/blogContent.html?id=${blogId}">
                        <img class="post_feature_img" src="${postFeaturedMedia}" alt="${altText}">
                        <div class="post_text">
                        <p>${blogPostCategories[0].name}</p>
                        <hr class="h1">
                        <h3>${blogTitle} &#x27F6;</h3>
                        </div>
                    </a>
                </div>
                `
            }
        })
        .catch(error => console.error(error));
}

nextPosts.addEventListener('click', () => {
    if (pageCount != totalPageWithPosts) {
        postCarousel.innerHTML = ''
        pageCount++
        prevPosts.disabled = false
        getLatestPost();
    }
})
prevPosts.addEventListener('click', () => {
    if (pageCount === 1) {
        prevPosts.disabled = true
    } else {
        postCarousel.innerHTML = ''
        pageCount--
        getLatestPost();
        prevPosts.disabled = false
    }
})