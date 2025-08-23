// Wait for the page to fully load before starting the animation
document.addEventListener("DOMContentLoaded", function() {

    console.log("Animation script started.");

    // Create a GSAP timeline to handle the sequence of animations
    // This directly corresponds to the flow of the diagram
    let tl = gsap.timeline();

    // { Animate "box1": Move Right: 400px, Duration: 3 seconds }
    tl.to("#box1", {
        x: 400,          // Move 400 pixels on the x-axis
        duration: 3      // Over 3 seconds
    });

    // { Animate "box1": Change Color: Red, Rotate: 90 degrees }
    // This animation starts only after the previous one is complete
    tl.to("#box1", {
        backgroundColor: "red", // Change the color
        rotation: 90,           // Rotate 90 degrees
        duration: 1             // Over 1 second
    });

});