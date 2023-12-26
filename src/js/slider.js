const initSlider = () => {
    const container = document.querySelector(".container");
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    const handleDragStart = (e) => {
        isDragging = true;
        startX = e.type === "mousedown" ? e.clientX : e.touches[0].clientX;
        scrollLeft = imageList.scrollLeft;
        document.body.style.userSelect = "none";

        // Prevent default touch behavior to avoid scrolling the entire page
        if (e.type === "touchstart") {
            e.preventDefault();
        }
    };

    const handleDragMove = (e) => {
        if (!isDragging) return;

        const clientX = e.type === "mousemove" ? e.clientX : e.touches[0].clientX;
        const deltaX = clientX - startX;
        const newScrollLeft = scrollLeft - deltaX;

        if (newScrollLeft >= 0 && newScrollLeft <= maxScrollLeft) {
            imageList.scrollLeft = newScrollLeft;
        }

        // Prevent default touchmove behavior to avoid scrolling the entire page
        if (e.type === "touchmove") {
            e.preventDefault();
        }
    };

    const handleDragEnd = () => {
        isDragging = false;
        document.body.style.userSelect = "auto";
    };

    container.addEventListener("mousedown", handleDragStart);
    container.addEventListener("touchstart", handleDragStart, { passive: false });
    document.addEventListener("mousemove", handleDragMove);
    document.addEventListener("touchmove", handleDragMove, { passive: false });
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("touchend", handleDragEnd);

    // Handle scrollbar thumb drag
    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        };

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    // Slide images according to the slide button clicks
    slideButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });

    // Show or hide slide buttons based on scroll position
    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
    };

    // Update scrollbar thumb position based on image scroll
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    };

    // Call these two functions when the image list scrolls
    imageList.addEventListener("scroll", () => {
        updateScrollThumbPosition();
        handleSlideButtons();
    });
};

window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);
