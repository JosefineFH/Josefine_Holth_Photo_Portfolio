const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const url = `https://josefineholth.one/photographer-josefineholth/wp-json/wp/v2/posts/${id}?_embed`;

const blogContent = document.querySelector(".blog_content");
const goBackLink = document.querySelector(".go_back_link");

const oldUrlStorage = localStorage.getItem('oldUrl');

if (oldUrlStorage === '/index.html') {
    goBackLink.style.display = 'none';
} else {
    goBackLink.style.display = 'block';
}

goBackLink.innerHTML = `<a href="${oldUrlStorage}"> Go Back</a>`;
fetch(url)
    .then(response => response.json())
    .then(data => {
        let blogPostData = data.content.rendered;
        let blogPostTitle = data.title.rendered;
        let blogPostDate = data.date.slice(-20, -9 );
        document.title = `${blogPostTitle}`;
        
        blogContent.innerHTML += `
        <p style="text-align: end;">${blogPostDate}</p>
            <h1>${blogPostTitle}</h1>
            ${blogPostData}`;


        /* ------------------------------- Image model ------------------------------ */
        let modal = document.querySelector(".modal");
        let img = document.querySelectorAll('figure img');
        let modalImg = document.querySelector(".modal_content");
        let altText = document.querySelector(".alt_text");
        img.forEach((item, i) => {
            img[i].addEventListener('click', () => {
                
                modal.style.display = "block";
                modalImg.src = img[i].src;
                altText.innerHTML = img[i].alt;
            })
        })
        modal.addEventListener('click', () => {
            modal.style.display = "none";
        })
    })