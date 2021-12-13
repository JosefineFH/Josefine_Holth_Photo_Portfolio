console.log('archive')
const url = `https://josefineholth.one/photographer-josefineholth/wp-json/wp/v2/posts?_embed&per_page=100`;
const categoryUrl = `https://josefineholth.one/photographer-josefineholth/wp-json/wp/v2/categories?per_page=100`
let blogList = document.querySelector('.blog_list')

const inputValue = document.querySelector('.search_field')
let categoryId;

fetchPosts();

function fetchPosts() {

    fetch(url)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                const collectionTitle = data[i].title.rendered;
                let altText = data[i]._embedded['wp:featuredmedia'];
                let postFeaturedMedia = data[i]._embedded['wp:featuredmedia'];
                // let blogTitle = postData[i].title.rendered;
                let blogId = data[i].id
                let blogPostCategories = data[i]._embedded['wp:term'][0]
                
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
                if (categoryId === undefined) {
                    blogList.innerHTML += `
                    <div class="post_card">
                    <a href="/blogContent.html?id=${blogId}">
                        <img class="post_feature_img" src="${postFeaturedMedia}" alt="${altText}">
                        <div class="post_text">
                        <p>${blogPostCategories[0].name}</p>
                        <hr class="h1">
                        <h3>${collectionTitle} &#x27F6;</h3>
                        </div>
                    </a>
                </div>
                `
                } else {
                    if (categoryId == data[i].categories) {
                        console.log(collection)
                        blogList.innerHTML += `
                <p class="listItem">
                <a>${data[i].title.rendered}</a>
                </p>
                `
                    }
                }
                const listItems = document.querySelectorAll('.listItem');
                let textValue;
                inputValue.addEventListener('input', (e) => {
                    let filter = inputValue.value.toLowerCase();
                    for (let l = 0; l < listItems.length; l++) {
                        a = listItems[l].getElementsByTagName('a')[0]
                        textValue = a.textContent || a.innerText;
                        if (textValue.toLowerCase().indexOf(filter) > -1) {

                            listItems[l].style.display = "";
                        } else {
                            listItems[l].style.display = 'none'
                        }
                    }
                })
            }
        })
}

const categoryList = document.querySelector(".category_list ul")
fetch(categoryUrl)
    .then(response => response.json())
    .then(data => {
        data.forEach(value => {
            if (!value.count == 0) {
                categoryList.innerHTML += `
                <li class="category" value="${value.id}">${value.name}</li>
                `

                const category = document.querySelectorAll('.category')
                category.forEach(element => {
                    element.addEventListener('click', function () {
                        categoryId = element.value
                        blogList.innerHTML = ''
                        fetchPosts();
                    })
                })
            }
        });
    })