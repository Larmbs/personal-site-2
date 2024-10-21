
/**
 * Represents the starting slide of the carousel
 */
const StartingPosition = {
    Left: "left",
    Right: "right",
    Center: "center",
}

/**
 * Represents the end behavior of carousel once it reaches the end
 */
const EndBehavior = {
    Jump: "jump",
    Wrap: "wrap",
    Stop: "stop",
}

class Carousel {
    constructor() {
        this.current_slide = 0;
        this.slide_count = 5;
    }

    /**
     * Slides the carousel to the left
     */
    slideLeft() {
        this.current_slide -= 1;
        this.showSlide(this.current_slide);
    }

    /**
     * Slides the carousel to the right
     */
    slideRight() {
        this.current_slide += 1;
        this.showSlide(this.current_slide);
    }

    /**
     * Switches the slide to the side of the number provided
     * @param {number} num 
     */
    showSlide(num) {

    }
}