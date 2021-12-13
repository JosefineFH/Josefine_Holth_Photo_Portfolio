const readMoreButton = document.querySelector(".read_more");
const errorMessage = document.querySelector('.errorMessage');
const section = document.querySelector(".blog_content");
const url = "https://josefineholth.one/photographer-josefineholth/wp-json/wp/v2/posts?_embed&tags=29&page=";
let pageCount = 1;

const currentUrl = document.location.pathname;
localStorage.setItem('oldUrl', currentUrl);

window.addEventListener('load', getPostsData());

function getPostsData() {
    fetch(url + pageCount)
        .then(response => response.json())
        .then(data => {
            const postsData = data;
            if (postsData.data === undefined) {
                for (let i = 0; i < postsData.length; i++) {

                            const postSummary = postsData[i].excerpt.rendered;
                            const imgLink = postsData[i]._embedded['wp:featuredmedia'];
                            let blogId = postsData[i].id;
                            let postTitle = postsData[i].title.rendered;

                            let img;
                            if (imgLink === undefined) {
                                img = "/images/Image_is_missing.png";
                            } else {
                                img = imgLink[0].source_url;
                            }

                            let alt_text = postsData[i]._embedded['wp:featuredmedia'];
                            if (alt_text === undefined) {
                                alt_text = "there is no info about this image";
                            } else {
                                alt_text = alt_text[0].alt_text;
                            }

                        section.innerHTML += `<article>                        
                        <div class="featured_Image" style="background-image: url('${img}');" aria-label="featured image - ${alt_text}">
                        </div>
                        <div class="content">
                        <h2>${postTitle}</h2>
                        <div>${postSummary}</div>
                        <a class="read_more" href="/blogContent.html?id=${blogId}">Read More</a>
                        </div>
                        </article>`
                }

            } else {
                errorMessage.innerHTML += "There is no more posts to load for now";
            }
        })
        .catch(err => {
            section.innerHTML = `<p>
            Something went wrong when loading the blog post.
            </p>`
        })
}

readMoreButton.addEventListener("click", () => {
    pageCount++
    getPostsData();
});