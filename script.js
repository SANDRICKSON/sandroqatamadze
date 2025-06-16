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
document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.getElementById("menu-icon");
    const navbar = document.querySelector(".navbar");

    menuIcon.addEventListener("click", function () {
        navbar.classList.toggle("active");
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const texts = [
        "Full-Stack Developer",
        "Mobile Developer",
        "Narrative Designer",
        "UX/UI Designer",
        "Game Developer"
    ];

    let index = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const delayBetweenTexts = 1000;

    const typingElement = document.getElementById("typing");

    function typeEffect() {
        const currentText = texts[index];

        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        typingElement.textContent = currentText.substring(0, charIndex);

        if (!isDeleting && charIndex === currentText.length) {
            setTimeout(() => isDeleting = true, delayBetweenTexts);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            index = (index + 1) % texts.length;
        }

        setTimeout(typeEffect, isDeleting ? erasingSpeed : typingSpeed);
    }

    setTimeout(typeEffect, 500);
});



// ნავბარის გამოჩენა/გაქრობა



document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.querySelector("#menu-icon");
    const navbar = document.querySelector(".navbar");

    menuIcon.addEventListener("click", () => {
        navbar.classList.toggle("active");

        // Debugging - თუ კონსოლში ჩანს, ესე იგი სკრიპტი მუშაობს
        console.log("Menu toggled!", navbar.classList.contains("active"));
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("theme-toggle");
    const body = document.body;

    // შეამოწმე, იყო თუ არა უკვე გადართული თემა
    if (localStorage.getItem("theme") === "light") {
        body.classList.add("light-theme");
        toggleBtn.textContent = "🌙";
    } else {
        toggleBtn.textContent = "☀️";
    }

    toggleBtn.addEventListener("click", () => {
        body.classList.toggle("light-theme");
        const isLight = body.classList.contains("light-theme");
        toggleBtn.textContent = isLight ? "🌙" : "☀️";
        localStorage.setItem("theme", isLight ? "light" : "dark");
    });
});

// ScrollSpy - აქტიური ლინკის გამოყოფა სკროლის მიხედვით
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar a");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });
});


const images = [

    "images/kompiuteri.jpg",
    "images/pijaki.jpg",
    "images/sandrikela.jpg",
    "images/roboti.jpg",
    "images/cropped_image.png",

    "images/skillwill_graduation.jpg",
    "images/skillwill_certificate.jpg"
];

let currentIndex = 0;
const galleryImage = document.getElementById("gallery-image");

setInterval(() => {
    // დაამატე ფეიდ-აუთი
    galleryImage.classList.add("fade-out");

    setTimeout(() => {
        // სურათის შეცვლა და ფეიდ-ინით დაბრუნება
        currentIndex = (currentIndex + 1) % images.length;
        galleryImage.src = images[currentIndex];

        galleryImage.classList.remove("fade-out");
        galleryImage.classList.add("fade-in");

        setTimeout(() => {
            galleryImage.classList.remove("fade-in");
        }, 500); // დრო უნდა ემთხვეოდეს CSS-ში მითითებულს
    }, 500); // სანამ opacity 0 გახდება
}, 3000); // 3 წამში ერთხელ სლაიდშოუ
