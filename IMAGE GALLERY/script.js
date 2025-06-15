const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const captionText = document.getElementById("caption");
const closeBtn = document.querySelector(".close");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const images = document.querySelectorAll(".gallery-item");
let currentIndex = 0;

function showModal(index) {
    modal.style.display = "block";
    modalImg.src = images[index].src;
    captionText.textContent = images[index].alt;
    currentIndex = index;
}

images.forEach((img, index) => {
    img.addEventListener("click", () => showModal(index));
});

closeBtn.onclick = () => modal.style.display = "none";

prevBtn.onclick = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showModal(currentIndex);
};

nextBtn.onclick = () => {
    currentIndex = (currentIndex + 1) % images.length;
    showModal(currentIndex);
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

const fullscreenBtn = document.getElementById("fullscreenBtn");

fullscreenBtn.onclick = () => {
    const modalContent = modalImg;

    if (!document.fullscreenElement) {
        if (modalContent.requestFullscreen) {
            modalContent.requestFullscreen();
        } else if (modalContent.webkitRequestFullscreen) { // Safari
            modalContent.webkitRequestFullscreen();
        } else if (modalContent.msRequestFullscreen) { // IE/Edge
            modalContent.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { // Safari
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
    }
};

