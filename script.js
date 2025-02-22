const scriptURL = "https://script.google.com/macros/s/AKfycbwMhUi6WsEHgkt9zgAM6AJUJK_x4bbW5IMxcn7gm6LlRV4lAN0HzOqRw4JoBGXXROlavw/exec";
const form = document.forms['submit-to-google-sheet'];
const successMessage = document.getElementById("success-message"); // ელემენტი შეტყობინებისთვის

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // ფორმის სტანდარტული გაგზავნის თავიდან აცილება
    const formData = new FormData(form); // მონაცემების შეგროვება
    
    try {
        let response = await fetch(scriptURL, { method: 'POST', body: formData });
        let text = await response.text(); // მიიღე response-ის ტექსტი
        console.log("Server Response:", text); // ბეჭდავს კონსოლში

        if (response.ok) {
            successMessage.innerText = "✅ Your message has been sent! You will receive a reply at your email.";
            successMessage.style.color = "green"; // ფერის შეცვლა წარმატებისას
            form.reset(); // ფორმის გასუფთავება
        } else {
            throw new Error("Network response was not ok");
        }
    } catch (error) {
        successMessage.innerText = "❌ Error: Message could not be sent.";
        successMessage.style.color = "red"; // შეცდომის ფერის შეცვლა
        console.error('შეცდომა:', error);
    }
});

// მენიუს ფუნქციონალი
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");
};
