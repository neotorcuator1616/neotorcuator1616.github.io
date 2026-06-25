const moodButton = document.getElementById("moodButton");
const moodLabel = document.getElementById("moodLabel");
const portraitShell = document.getElementById("portraitShell");
const focusText = document.getElementById("focusText");
const currentYear = document.getElementById("currentYear");
const toast = document.getElementById("toast");
const contactForm = document.getElementById("contactForm");

const moods = [
    {
        label: "Mood: Focused",
        focus: "Design systems + frontend architecture",
        shellBackground: "linear-gradient(145deg, rgba(24, 39, 71, 0.7), rgba(14, 21, 39, 0.8))"
    },
    {
        label: "Mood: Creative",
        focus: "Visual direction and motion prototyping",
        shellBackground: "linear-gradient(145deg, rgba(64, 35, 88, 0.68), rgba(29, 20, 43, 0.78))"
    },
    {
        label: "Mood: Shipping",
        focus: "Handoff polish, QA, and performance tuning",
        shellBackground: "linear-gradient(145deg, rgba(38, 64, 53, 0.72), rgba(13, 31, 24, 0.82))"
    }
];

let moodIndex = 0;

function applyMood(index) {
    const mood = moods[index];
    moodLabel.textContent = mood.label;
    focusText.textContent = mood.focus;
    portraitShell.style.background = mood.shellBackground;
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

function setActiveLink() {
    let currentId = sections[0]?.id || "home";

    sections.forEach((section) => {
        const top = section.offsetTop - 120;
        if (window.scrollY >= top) {
            currentId = section.id;
        }
    });

    navLinks.forEach((link) => {
        const target = link.getAttribute("href")?.slice(1);
        link.classList.toggle("active", target === currentId);
    });
}

window.addEventListener("scroll", setActiveLink, { passive: true });
setActiveLink();

if (contactForm && toast) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        contactForm.reset();
        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 2400);
    });
}

applyMood(moodIndex);
