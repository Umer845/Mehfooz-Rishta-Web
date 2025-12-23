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

        const chips = document.querySelectorAll(".chips");
        if (this.closest(".chips") === chips[0]) {
            document.getElementById("ethnicityError").textContent = "";
        }
        if (this.closest(".chips") === chips[1]) {
            document.getElementById("InterestsError").textContent = "";
        }
    });
});


/* =====================================================
   PHOTO UPLOAD LOGIC + THUMBNAILS + VERIFY SECTION
===================================================== */
const fileInput = document.createElement("input");
fileInput.type = "file";
fileInput.accept = "image/png, image/jpeg";
fileInput.multiple = true;
fileInput.style.display = "none";
document.body.appendChild(fileInput);

const uploadBox = document.getElementById("photo");
const photoList = document.querySelector(".photo-list"); // NEW
const photoText = document.querySelector(".photo-text");
const photoError = document.getElementById("photoError");
const verifySection = document.querySelector(".photo-verification");


if (verifySection) verifySection.style.display = "none";

uploadBox.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", function () {

    const files = Array.from(fileInput.files);

    for (let file of files) {

        if (uploadedPhotos.length >= MAX_PHOTOS) {
            photoError.textContent = "You can upload up to 6 photos only.";
            break;
        }

        if (!["image/jpeg", "image/png"].includes(file.type)) {
            photoError.textContent = "Only JPG and PNG images are allowed.";
            continue;
        }

        if (file.size > MAX_SIZE) {
            photoError.textContent = "Each image must be less than 5MB.";
            continue;
        }

        uploadedPhotos.push(file);
        renderPhoto(file);
    }

    updatePhotoText();
    toggleVerification();

    if (uploadedPhotos.length >= MIN_PHOTOS) {
        photoError.textContent = "";
    }

    fileInput.value = "";
});


function renderPhoto(file) {
    const reader = new FileReader();

    reader.onload = function (e) {
        const wrapper = document.createElement("div");
        wrapper.className = "photo-thumb";

        wrapper.innerHTML = `
            <img src="${e.target.result}">
            <button class="remove-photo">✕</button>
        `;

        wrapper.querySelector(".remove-photo").addEventListener("click", () => {
            const index = [...photoList.children].indexOf(wrapper);
            uploadedPhotos.splice(index, 1);
            wrapper.remove();
            updatePhotoText();
            toggleVerification();
        });

        // ✅ ADD OUTSIDE UPLOAD BOX
        photoList.appendChild(wrapper);
    };

    reader.readAsDataURL(file);
}



function updatePhotoText() {
    photoText.textContent =
        `Uploaded ${uploadedPhotos.length} of ${MAX_PHOTOS} photos (minimum ${MIN_PHOTOS} required)`;
}


function toggleVerification() {
    if (!verifySection) return;

    verifySection.style.display =
        uploadedPhotos.length >= MIN_PHOTOS ? "flex" : "none";
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
        if (uploadedPhotos.length < MIN_PHOTOS) {
            photoError.textContent = "Please upload at least 3 photos.";
            return false;
        }
        photoError.textContent = "";
        return true;
    }
};


/* =====================================================
   RADIO VALIDATION HELPER
===================================================== */
function radioValidate(id) {
    const radios = document.getElementById(id).querySelectorAll("input[type='radio']");
    const error = document.getElementById(id + "Error");

    let checked = false;
    radios.forEach(r => checked ||= r.checked);

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
