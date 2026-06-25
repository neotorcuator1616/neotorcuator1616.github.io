const moodButton = document.getElementById("moodButton");
const portraitShell = document.getElementById("portraitShell");
const currentYear = document.getElementById("currentYear");
const toast = document.getElementById("toast");
const contactForm = document.getElementById("contactForm");

const moods = [
    {
        label: "Mood: Focused"
    },
    {
        label: "Mood: Creative"
    },
    {
        label: "Mood: Shipping"
    }
];

let moodIndex = 0;

function applyMood(index) {
    const mood = moods[index];
    if (moodButton) {
        const moodLabel = moodButton.querySelector("#moodLabel") || moodButton;
        moodLabel.textContent = mood.label;
    }
}

if (moodButton) {
    moodButton.addEventListener("click", () => {
        moodIndex = (moodIndex + 1) % moods.length;
        applyMood(moodIndex);
    });
}

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
    }
);

revealItems.forEach((item, idx) => {
    item.style.transitionDelay = `${Math.min(idx * 40, 220)}ms`;
    observer.observe(item);
});

const navLinks = document.querySelectorAll(".nav-links a");
const sections = [...document.querySelectorAll("main section[id]")];
const contactEmailLink = document.querySelector(".mail-link");

function setActiveLink() {
    const viewportCenter = window.innerHeight * 0.5;
    let currentId = sections[0]?.id || "home";
    let closestDistance = Number.POSITIVE_INFINITY;

    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);

        if (rect.top <= viewportCenter + 40 && rect.bottom >= 80 && distance < closestDistance) {
            closestDistance = distance;
            currentId = section.id;
        }
    });

    navLinks.forEach((link) => {
        const target = link.getAttribute("href")?.slice(1);
        link.classList.toggle("active", target === currentId);
    });
}

window.addEventListener("scroll", setActiveLink, { passive: true });
window.addEventListener("resize", setActiveLink, { passive: true });
window.addEventListener("hashchange", setActiveLink);
setActiveLink();

if (contactForm && toast) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get("name")?.toString().trim() || "";
        const email = formData.get("email")?.toString().trim() || "";
        const message = formData.get("message")?.toString().trim() || "";
        const targetEmail = contactEmailLink?.getAttribute("href")?.replace("mailto:", "") || "neotorcuator1616@gmail.com";

        const subject = encodeURIComponent(`Portfolio inquiry from ${name || "your website"}`);
        const body = encodeURIComponent([
            `Name: ${name}`,
            `Email: ${email}`,
            "",
            message
        ].join("\n"));

        window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;

        toast.textContent = "Opening your email app with a prefilled message.";
        toast.classList.add("show");

        contactForm.reset();

        window.setTimeout(() => {
            toast.classList.remove("show");
        }, 2400);
    });
}
