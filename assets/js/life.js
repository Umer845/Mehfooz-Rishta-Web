/* =====================================================
   GLOBALS (Photos)
===================================================== */
let uploadedPhotos = [];
const MAX_PHOTOS = 6;
const MIN_PHOTOS = 3;
const MAX_SIZE = 5 * 1024 * 1024; // 5MB


/* =====================================================
   CLEAR INPUT ERRORS ON TYPE
===================================================== */
document.querySelectorAll(".inputClick").forEach(input => {
    input.addEventListener("input", function () {
        const error = document.getElementById(this.id + "Error");
        if (error) error.textContent = "";
    });
});


/* =====================================================
   RADIO BUTTON SINGLE SELECT + CLEAR ERROR
===================================================== */
document.querySelectorAll(".radio-group").forEach(group => {

    const groupId = group.id;
    const errorSpan = document.getElementById(groupId + "Error");

    group.querySelectorAll("input[type='radio']").forEach(radio => {
        radio.addEventListener("change", function () {

            group.querySelectorAll("input[type='radio']").forEach(r => {
                if (r !== this) r.checked = false;
            });

            if (errorSpan) errorSpan.textContent = "";
        });
    });
});


/* =====================================================
   CHIPS TOGGLE + CLEAR ERROR
===================================================== */
document.querySelectorAll(".chips span").forEach(chip => {
    chip.addEventListener("click", function () {
        this.classList.toggle("active");

        // Clear related error (ethnicity / interests)
        const container = this.closest(".chips");
        if (container) {
            if (container === document.querySelectorAll(".chips")[0]) {
                document.getElementById("ethnicityError").textContent = "";
            }
            if (container === document.querySelectorAll(".chips")[1]) {
                document.getElementById("InterestsError").textContent = "";
            }
        }
    });
});


/* =====================================================
   PHOTO UPLOAD LOGIC
===================================================== */
const fileInput = document.createElement("input");
fileInput.type = "file";
fileInput.accept = "image/png, image/jpeg";
fileInput.multiple = true;
fileInput.style.display = "none";
document.body.appendChild(fileInput);

document.getElementById("photo").addEventListener("click", function () {
    fileInput.click();
});

fileInput.addEventListener("change", function () {

    const files = Array.from(fileInput.files);
    const error = document.getElementById("photoError");

    for (let file of files) {

        if (uploadedPhotos.length >= MAX_PHOTOS) {
            error.textContent = "You can upload up to 6 photos only.";
            break;
        }

        if (!["image/jpeg", "image/png"].includes(file.type)) {
            error.textContent = "Only JPG and PNG images are allowed.";
            continue;
        }

        if (file.size > MAX_SIZE) {
            error.textContent = "Each image must be less than 5MB.";
            continue;
        }

        uploadedPhotos.push(file);
    }

    updatePhotoText();

    if (uploadedPhotos.length >= MIN_PHOTOS) {
        error.textContent = "";
    }

    fileInput.value = "";
});

function updatePhotoText() {
    document.querySelector(".photo-text").textContent =
        `Uploaded ${uploadedPhotos.length} of ${MAX_PHOTOS} photos (minimum ${MIN_PHOTOS} required)`;
}


/* =====================================================
   VALIDATION OBJECT
===================================================== */
const validate = {

    Profession: () => {
        const input = document.getElementById("Profession");
        const error = document.getElementById("ProfessionError");

        if (!input.value.trim()) {
            error.textContent = "Please enter your profession.";
            return false;
        }
        error.textContent = "";
        return true;
    },

    EducationLevel: () => {
        const select = document.getElementById("EducationLevel");
        const error = document.getElementById("EducationLevelError");

        if (!select.value) {
            error.textContent = "Please select education level.";
            return false;
        }
        error.textContent = "";
        return true;
    },

    tall: () => {
        const input = document.getElementById("tall");
        const error = document.getElementById("tallError");

        if (!input.value.trim()) {
            error.textContent = "Please enter your height.";
            return false;
        }
        error.textContent = "";
        return true;
    },

    nationality: () => {
        const input = document.getElementById("nationality");
        const error = document.getElementById("nationalityError");

        if (!input.value.trim()) {
            error.textContent = "Please enter nationality.";
            return false;
        }
        error.textContent = "";
        return true;
    },

    grow: () => {
        const input = document.getElementById("grow");
        const error = document.getElementById("growError");

        if (!input.value.trim()) {
            error.textContent = "Please enter where you grew up.";
            return false;
        }
        error.textContent = "";
        return true;
    },

    ethnicity: () => {
        const container = document.querySelectorAll(".chips")[0];
        const error = document.getElementById("ethnicityError");
        const selected = container.querySelectorAll("span.active").length;

        if (selected === 0) {
            error.textContent = "Please select at least one ethnicity.";
            return false;
        }
        if (selected > 2) {
            error.textContent = "You can select up to 2 only.";
            return false;
        }
        error.textContent = "";
        return true;
    },

    children: () => radioValidate("children"),
    marriage: () => radioValidate("marriage"),

    Interests: () => {
        const container = document.querySelectorAll(".chips")[1];
        const error = document.getElementById("InterestsError");
        const selected = container.querySelectorAll("span.active").length;

        if (selected === 0) {
            error.textContent = "Please select at least one interest.";
            return false;
        }
        if (selected > 15) {
            error.textContent = "You can select up to 15 interests.";
            return false;
        }
        error.textContent = "";
        return true;
    },

    photo: () => {
        const error = document.getElementById("photoError");

        if (uploadedPhotos.length < MIN_PHOTOS) {
            error.textContent = "Please upload at least 3 photos.";
            return false;
        }
        error.textContent = "";
        return true;
    }
};


/* =====================================================
   RADIO VALIDATION HELPER
===================================================== */
function radioValidate(id) {

    const radios = document
        .getElementById(id)
        .querySelectorAll("input[type='radio']");

    const error = document.getElementById(id + "Error");

    let checked = false;
    radios.forEach(r => { if (r.checked) checked = true; });

    if (!checked) {
        error.textContent = "Please select one option.";
        return false;
    }

    error.textContent = "";
    return true;
}


/* =====================================================
   SUBMIT
===================================================== */
function LoadData() {

    let isValid = true;

    isValid &= validate.Profession();
    isValid &= validate.EducationLevel();
    isValid &= validate.tall();
    isValid &= validate.nationality();
    isValid &= validate.grow();
    isValid &= validate.ethnicity();
    isValid &= validate.children();
    isValid &= validate.marriage();
    isValid &= validate.Interests();
    isValid &= validate.photo();

    if (isValid) {
        setTimeout(() => {
            window.location.href = "/Interest.html";
        }, 500);
    }
}
