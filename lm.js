// ============================================================
// LOVE MATCH MAKER - lm.js
// Every line has a comment above it that explains what it does.
// ============================================================


// ---------- PART 1: FUNCTIONS THAT WORK OUT THE SCORE ----------

// Create a function called calculateMatch. It receives two names (its inputs, called parameters).
function calculateMatch(name1, name2) {
  // Put the two names in a list, make each one lowercase, sort them A to Z, then glue them into one text.
  // Lowercase means "Grace" and "grace" give the same result; sorting means the order typed does not matter.
  const combined = [name1, name2].map(n => n.toLowerCase()).sort().join("");

  // Make a box called total that starts at 0. We use let because the number will change.
  let total = 0;

  // Loop through the combined text one letter at a time. Each letter is called char.
  for (const char of combined) {
    // Get the number code of the letter (for example a is 97) and add it to total.
    total += char.charCodeAt(0);
  // End of the loop.
  }

  // Divide total by 101 and keep the remainder, so the answer is always from 0 to 100. Send it back.
  return total % 101;
// End of the calculateMatch function.
}

// Create a second function that gives a random score instead of a score from the names.
// It is not used unless you switch to it in PART 4 (see the note there).
function getRandomScore() {
  // Math.random() gives a decimal from 0 up to just under 1. Times 101 makes it 0 to just under 101.
  // Math.floor() rounds down to a whole number, so the result is from 0 to 100. Send it back.
  return Math.floor(Math.random() * 101);
// End of the getRandomScore function.
}


// ---------- PART 2: THE SMALL FLOATING HEARTS ----------

// A list of four different heart emojis. One will be chosen at random for each small heart.
const heartEmojis = ["💖", "💗", "💕", "💘"];

// Stop the function if there are already 150 small hearts on the page. This prevents the page from slowing down.
if (document.querySelectorAll(".small-heart").length > 150) return;

// Create a function called launchHearts. count is how many small hearts to make.
function launchHearts(count) {
  // Repeat the code below count times. i starts at 0 and goes up by 1 each time.
  for (let i = 0; i < count; i++) {
    // Make a new, empty span element in memory. It is not on the page yet.
    const heart = document.createElement("span");

    // Give it the CSS class small-heart, so the .small-heart rules in style.css apply to it.
    heart.className = "small-heart";

    // Pick a random number from 0 up to the length of the list, round it down, and use it to choose an emoji.
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

    // Put the heart at a random place across the screen. vw means a percentage of the screen width.
    // The 95 stops hearts from being cut off at the right edge.
    heart.style.left = Math.random() * 95 + "vw";

    // Make this heart take between 2 and 4 seconds to float up, so the hearts move at different speeds.
    heart.style.animationDuration = 2 + Math.random() * 2 + "s";

    // Make this heart wait up to 0.8 seconds before it starts, so the hearts come out one after another.
    heart.style.animationDelay = Math.random() * 0.8 + "s";

    // Add the heart to the page. This is the moment it appears on the screen.
    document.body.appendChild(heart);

    // Wait until this heart finishes its animation, then run the function inside.
    heart.addEventListener("animationend", function () {
      // Delete the heart from the page, so old hearts do not pile up and slow the page down.
      heart.remove();
    // End of the animationend function.
    });
  // End of the for loop.
  }
// End of the launchHearts function.
}


// ---------- PART 3: FIND THE ELEMENTS ON THE PAGE ----------

// Find the form (id="matchForm" in the HTML) and keep it in a box called form.
const form = document.getElementById("matchForm");

// Find the empty paragraph (id="message") where the result will be written.
const message = document.getElementById("message");


// ---------- PART 4: WHAT HAPPENS WHEN THE FORM IS SUBMITTED ----------

// When the form is submitted (button clicked, or Enter pressed), run the function inside.
// The word e is the event, which holds information about what happened.
form.addEventListener("submit", function (e) {
  // Stop the browser from reloading the page, which is what forms normally do.
  e.preventDefault();

  // Read the first name that was typed. .value is the text, and .trim() removes spaces at the start and end.
  const you = document.getElementById("yourName").value.trim();

  // Read the partner's name in the same way. The id must match the HTML exactly: partnersName.
  const partner = document.getElementById("partnersName").value.trim();

  // Find the big heart in the middle of the screen (id="bigHeart") and keep it in a box.
  const bigHeart = document.getElementById("bigHeart");

  // ----- Validation 1: both names must be filled in -----

  // If the first name is empty OR (||) the partner's name is empty, run the code inside.
  if (you === "" || partner === "") {
    // Show a warning in the message paragraph.
    message.textContent = "⚠️ Please enter both names.";
    // Make the warning red.
    message.style.color = "red";
    // Stop the function here. The score is not worked out and no hearts appear.
    return;
  // End of the empty-names check.
  }

  // ----- Validation 2: the two names must be different -----

  // Turn both names into lowercase and check if they are exactly equal (===). "Grace" and "grace" count as the same.
  if (you.toLowerCase() === partner.toLowerCase()) {
    // Show a warning in the message paragraph.
    message.textContent = "⚠️ Please enter two different names.";
    // Make the warning red.
    message.style.color = "red";
    // Stop the function here, for the same reason as above.
    return;
  // End of the same-name check.
  }

  // ----- Make some small hearts float up the screen -----

  // If the screen is less than 600 pixels wide, make 20 hearts. Otherwise, make 40 hearts.
  launchHearts(window.innerWidth < 600 ? 20 : 40);

  // ----- Work out the score -----

  // Call getRandomScore with the two names and keep the number it gives back in percent.
  // To use a random score instead (as the assignment asks), change this line to: const percent = getRandomScore();
  const percent = getRandomScore(you, partner);

  // Make 15 small hearts float up the screen. This only runs when both validation checks passed.
  launchHearts(60);

  // ----- Show the result -----

  // If the score is 70 or more (>= means greater than or equal to), run the code inside.
  if (percent >= 70) {
    // Write the result in the paragraph. The backticks ` make a template string, and ${percent} inserts the number.
    message.textContent = `${percent}% - Perfect match! 💖`;
    // Make the text green.
    message.style.color = "green";
    // Take the class pop off the big heart. This resets its animation.
    bigHeart.classList.remove("pop");
    // Read a size from the heart and ignore it. This forces the browser to notice the reset,
    // so the animation can restart. Without this line, the big heart would pop only once.
    void bigHeart.offsetWidth; // Trigger reflow to restart animation
    // Add the class pop. The CSS rule #bigHeart.pop now applies, and the big heart pops up.
    bigHeart.classList.add("pop");
  // If the score was below 70, check this next condition: is it 50 or more? (So 50 to 69.)
  } else if (percent >= 50) {
    // Write the orange result with an orange heart.
    message.textContent = `${percent}% - Good match! 🧡`;
    // Make the text orange.
    message.style.color = "orange";
  // If neither test was true, the score is 0 to 49. else has no condition because it catches everything left.
  } else {
    // Write the red result with a broken heart.
    message.textContent = `${percent}% - Not a great match. 💔`;
    // Make the text red.
    message.style.color = "red";
  // End of the if / else if / else.
  }
// End of the submit function. The ) and ; close the addEventListener call.
});