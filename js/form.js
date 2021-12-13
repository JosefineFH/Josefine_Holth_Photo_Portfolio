const url = 'https://josefineholth.one/photographer-josefineholth/wp-json/contact-form-7/v1/contact-forms/252/feedback'

const form = document.querySelector("form");
const fullName = document.querySelector("#your-name");
const email = document.querySelector("#your-email");
const subject = document.querySelector("#your-subject");
const message = document.querySelector("#your-message");

const messageSection = document.querySelector('.message_section');
const fullNameError = document.querySelector(".fullName_error");
const emailError = document.querySelector('.email_error');
const subjectError = document.querySelector(".subject_error");
const messageError = document.querySelector(".message_error")

function submitContactFormHandler(event) {
    event.preventDefault();
    let formData = new FormData(form);
    
    fetch(url, {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        const status = data.status
        const message = data.message
        const invalidFields = data.invalid_fields

        messageError.innerHTML = "";
        fullNameError.style.display = "none";
        emailError.style.display = "none";
        subjectError.style.display = "none";
        messageError.style.display = "none";
        
            if (status === 'validation_failed') {
                messageSection.style.display = 'block'
                messageSection.innerHTML = `
                <div>
                <p>${message}</p>
                </div>
                `;

                for (let i = 0; i < invalidFields.length; i++) {
                    const errorId = invalidFields[i].error_id;
                    const errorMessage = invalidFields[i].message;
                    
                    if (errorId === '-ve-your-name') {
                        fullNameError.style.display = "inline";
                        fullNameError.innerHTML = errorMessage;
                    } 
                    if (errorId === '-ve-your-email') {
                        emailError.style.display = "inline";
                        emailError.innerHTML = errorMessage;
                    }
                    if (errorId === '-ve-your-subject') {
                        subjectError.style.display = "inline";
                        subjectError.innerHTML = errorMessage;
                    }
                    if (errorId === '-ve-your-message') {
                        messageError.style.display = "inline";
                        messageError.innerHTML = errorMessage;
                    }
                }
            } else {
                messageSection.innerHTML = `
                <div class="success">
                    <p>Thank you for message, i will be in contact with you soon.</p>
                </div>`;

                setTimeout(function () {
                    form.submit()
                    location.reload();
                }, 500)
            }
            if(fullName.value.trim().length, 5 > true){
                fullNameError.innerHTML += " The name is to short, it has to contain less then 5 symbols. ";
            }
            if(message.value, 25 > true){
                messageError.innerHTML += " It has to contain less then 25 symbols. ";
            }
        })
}
form.addEventListener("submit", submitContactFormHandler);
