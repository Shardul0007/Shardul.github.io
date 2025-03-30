//q1
const modals = {
    knowMore: document.getElementById("knowMoreModal"),
    education: document.getElementById("educationModal"),
    hobbies: document.getElementById("hobbiesModal"),
    footballQuiz: document.getElementById("footballQuizModal"),
    artGallery: document.getElementById("artGalleryModal"),
    photoGallery: document.getElementById("photoGalleryModal")
};

const buttons = {
    knowMore: document.getElementById("knowMoreBtn"),
    education: document.getElementById("educationBtn"),
    hobbies: document.getElementById("hobbiesBtn"),
    footballQuiz: document.getElementById("footballQuiz"),
    openGallery: document.getElementById("openGallery"),
    photos: document.getElementById("photosBtn")
};

const footballAnswerInput = document.getElementById("footballAnswer");
const footballResult = document.getElementById("footballResult");

const closeBtns = document.querySelectorAll(".close");

function openModal(modal) {
    Object.values(modals).forEach(m => (m.style.display = "none"));
    modal.style.display = "block";
}

buttons.knowMore.addEventListener("click", () => openModal(modals.knowMore));
buttons.education.addEventListener("click", () => openModal(modals.education));
buttons.hobbies.addEventListener("click", () => openModal(modals.hobbies));
buttons.footballQuiz.addEventListener("click", () => openModal(modals.footballQuiz));
buttons.openGallery.addEventListener("click", () => openModal(modals.artGallery));
buttons.photos.addEventListener("click", () => openModal(modals.photoGallery));

document.getElementById("submitFootballAnswer").addEventListener("click", () => {
    const answer = footballAnswerInput.value.trim().toLowerCase();
    
    if (["messi", "lionel", "lionel messi"].includes(answer)) {
        footballResult.innerHTML = `
            ✅ Correct! Messi is the GOAT! <br>
            <video id="footballAnswerVideo" class="messi-video" width="100%" controls autoplay>
                <source src="Ankara Messi 😇.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
    } else {
        footballResult.innerHTML = `
            ❌ Wrong answer! 
            <div class="wrong_ans_buttons">
                <button id="retryBtn">Retry</button>
                <button id="viewAnswerBtn">View Answer</button>
            </div>
        `;

        document.getElementById("retryBtn").addEventListener("click", () => {
            footballAnswerInput.value = ""; 
            footballAnswerInput.focus();
            footballResult.innerHTML = ""; 
        });

        document.getElementById("viewAnswerBtn").addEventListener("click", () => {
            footballResult.innerHTML = `
                <p>The correct answer is the GOAT: Messi!</p>
                <video id="footballAnswerVideo" class="messi-video" width="100%" controls autoplay>
                    <source src="Ankara Messi 😇.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
        });
    }
});

closeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        Object.values(modals).forEach(m => (m.style.display = "none"));
    });
});

window.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
        Object.values(modals).forEach(m => (m.style.display = "none"));
    }
});

const swiper = new Swiper('.swiper', {
    speed: 800,
    parallax: true,
    mousewheel: true,
    keyboard: true,
    on: { slideChange: updateSlideClass }
});

function updateSlideClass() {
    document.body.className = document.body.className.replace(/slide-\d+/g, '');
    document.body.classList.add(`slide-${swiper.activeIndex}`);
}

window.addEventListener('load', updateSlideClass);

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        swiper.slideTo(parseInt(item.dataset.slide));
    });
});

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        document.documentElement.style.setProperty('--color1', '#B4121B');
        document.documentElement.style.setProperty('--color2', '#000000');
        document.documentElement.style.setProperty('--color3', '#000000');
    } else {
        updateSlideClass();
    }
}

async function typeText(element, text, speed = 50) {
    return new Promise(resolve => {
        let index = 0;
        element.textContent = "";
        const interval = setInterval(() => {
            if (index < text.length) {
                element.textContent += text[index++];
            } else {
                clearInterval(interval);
                resolve();
            }
        }, speed);
    });
}

window.addEventListener('load', () => {
    const loadingOverlay = document.querySelector('.loading-overlay');
    loadingOverlay.style.opacity = '0';

    setTimeout(() => {
        loadingOverlay.remove();
        document.querySelectorAll('[data-original-text]').forEach(async heading => {
            await typeText(heading, heading.dataset.originalText);
        });
    }, 1000);
});

document.querySelectorAll('.nav-item, .contact-item').forEach(item => {
    item.classList.add('interactive-highlight', 'animated-underline');
});

document.addEventListener("DOMContentLoaded", function() {
    const photosBtn = document.getElementById("photosBtn");
    const photoGalleryModal = document.getElementById("photoGalleryModal");
    const galleryClose = document.querySelector(".gallery-close");

    photosBtn.addEventListener("click", function() {
        photoGalleryModal.style.display = "flex";
    });

    galleryClose.addEventListener("click", function() {
        photoGalleryModal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target === photoGalleryModal) {
            photoGalleryModal.style.display = "none";
        }
    });
});



//q2
function setupEventTracking() {
    document.addEventListener('click', function(event) {
        const target = event.target;
        const tagName = target.tagName.toLowerCase();
        let elementType = 'unknown';
        
        if (target.classList.contains('nav-item')) elementType = 'navigation';
        else if (tagName === 'img') elementType = 'image';
        else if (tagName === 'a') elementType = 'link';
        else if (tagName === 'button') elementType = 'button';
        else if (tagName === 'input' || tagName === 'textarea') elementType = 'input';
        else if (target.classList.contains('modal')) elementType = 'modal';
        
        console.log(`${new Date().toISOString()}, click, ${elementType} (${tagName})`);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                let elementType = 'section';
                
                if (target.classList.contains('swiper-slide')) {
                    const slideIndex = Array.from(target.parentElement.children).indexOf(target);
                    elementType = `slide-${slideIndex}`;
                }
                
                console.log(`${new Date().toISOString()}, view, ${elementType}`);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.swiper-slide, section').forEach(section => {
        observer.observe(section);
    });

    document.querySelectorAll('a[href$=".pdf"]').forEach(link => {
        link.addEventListener('click', () => {
            console.log(`${new Date().toISOString()}, download, cv-pdf`);
        });
    });
}

document.addEventListener('DOMContentLoaded', setupEventTracking);


//q3
const modal = document.getElementById("textAnalysisModal");
const btn = document.getElementById("openTextAnalysis");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function setupTextAnalysis() {
    const textInput = document.getElementById('textInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const resultsDiv = document.getElementById('analysisResults');

    analyzeBtn.addEventListener('click', function() {
        const text = textInput.value;
        const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;

        if (wordCount < 10000) {
            alert(`Please enter at least 10,000 words for analysis.\n(Current word count: ${wordCount})`);
            return;
        }

        const letterCount = text.replace(/[^a-zA-Z]/g, '').length;
        const spaceCount = (text.match(/\s/g) || []).length;
        const newlineCount = (text.match(/\n/g) || []).length;
        const specialCharCount = text.replace(/[a-zA-Z0-9\s]/g, '').length;

        const pronouns = ['i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them',
            'my', 'your', 'his', 'its', 'our', 'their', 'mine', 'yours', 'hers', 'ours', 'theirs',
            'myself', 'yourself', 'himself', 'herself', 'itself', 'ourselves', 'yourselves', 'themselves',
            'this', 'that', 'these', 'those', 'who', 'whom', 'whose', 'which', 'what'
        ];
        
        const prepositions = ['about', 'above', 'across', 'after', 'against', 'along', 'among', 'around', 'at',
            'before', 'behind', 'below', 'beneath', 'beside', 'between', 'beyond', 'by',
            'down', 'during', 'for', 'from', 'in', 'inside', 'into', 'like', 'near',
            'of', 'off', 'on', 'out', 'outside', 'over', 'past', 'since', 'through',
            'to', 'toward', 'under', 'until', 'up', 'upon', 'with', 'within', 'without'
        ];
        
        const articles = ['a', 'an', 'the'];

        const pronounCounts = countOccurrences(text, pronouns);
        const prepositionCounts = countOccurrences(text, prepositions);
        const articleCounts = countOccurrences(text, articles);

        resultsDiv.innerHTML = `
            <div class="analysis-section">
                <h3>Basic Text Statistics</h3>
                <p><strong>Letters:</strong> ${letterCount}</p>
                <p><strong>Words:</strong> ${wordCount}</p>
                <p><strong>Spaces:</strong> ${spaceCount}</p>
                <p><strong>Newlines:</strong> ${newlineCount}</p>
                <p><strong>Special Characters:</strong> ${specialCharCount}</p>
            </div>
            
            <div class="analysis-section">
                <h3>Pronoun Counts</h3>
                <div class="count-grid">
                    ${formatCounts(pronounCounts)}
                </div>
            </div>
            
            <div class="analysis-section">
                <h3>Preposition Counts</h3>
                <div class="count-grid">
                    ${formatCounts(prepositionCounts)}
                </div>
            </div>
            
            <div class="analysis-section">
                <h3>Article Counts</h3>
                <div class="count-grid">
                    ${formatCounts(articleCounts)}
                </div>
            </div>
        `;
    });

    function countOccurrences(text, wordList) {
        const counts = {};
        wordList.forEach(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            const matches = text.match(regex);
            counts[word] = matches ? matches.length : 0;
        });
        return counts;
    }

    function formatCounts(counts) {
        let html = '';
        for (const [word, count] of Object.entries(counts)) {
            if (count > 0) {
                html += `<div class="count-item">${word}: <strong>${count}</strong></div>`;
            }
        }
        return html;
    }
}

document.addEventListener('DOMContentLoaded', setupTextAnalysis);
