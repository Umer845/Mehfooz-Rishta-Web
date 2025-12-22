/* =====================================================
   CLEAR ERROR ON INPUT
===================================================== */
document.querySelectorAll(".InputClick, .inputClick").forEach(input => {
    input.addEventListener("input", function () {
        const error = document.getElementById(this.id + "Error");
        if (error) error.textContent = "";
    });
});


/* =====================================================
   RADIO BUTTON SINGLE SELECTION (Gender)
===================================================== */
document.querySelectorAll(".radio-group").forEach(group => {
    group.querySelectorAll("input[type='radio']").forEach(radio => {
        radio.addEventListener("change", function () {
            group.querySelectorAll("input[type='radio']").forEach(r => {
                if (r !== this) r.checked = false;
            });
        });
    });
});


/* =====================================================
   VALIDATION OBJECT
===================================================== */
const validate = {

    FName: () => {
        const input = document.getElementById("FName");
        const error = document.getElementById("FNameError");

        if (!input.value.trim()) {
            error.textContent = "Please enter your first name.";
            return false;
        }

        error.textContent = "";
        return true;
    },

    LName: () => {
        const input = document.getElementById("LName");
        const error = document.getElementById("LNameError");

        if (!input.value.trim()) {
            error.textContent = "Please enter your last name.";
            return false;
        }

        error.textContent = "";
        return true;
    },

    DOB: () => {
        const input = document.getElementById("DOB");
        const error = document.getElementById("DOBError");

        if (!input.value.trim()) {
            error.textContent = "Please enter your date of birth.";
            return false;
        }

        const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
        if (!regex.test(input.value)) {
            error.textContent = "Date format should be MM/DD/YYYY.";
            return false;
        }

        error.textContent = "";
        return true;
    },

    ContactNo: () => {
        const input = document.getElementById("ContactNo");
        const error = document.getElementById("ContactNoError");

        if (!input.value.trim()) {
            error.textContent = "Please enter your phone number.";
            return false;
        }

        if (input.value.length < 7) {
            error.textContent = "Invalid phone number.";
            return false;
        }

        error.textContent = "";
        return true;
    },

    Email: () => {
        const input = document.getElementById("Email");
        const error = document.getElementById("EmailError");
        const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        if (!input.value.trim()) {
            error.textContent = "Please enter your email.";
            return false;
        }

        if (!regex.test(input.value)) {
            error.textContent = "Invalid email address.";
            return false;
        }

        error.textContent = "";
        return true;
    }

};


/* =====================================================
   SUBMIT HANDLER
===================================================== */
function LoadData() {

    let isValid = true;

    isValid &= validate.FName();
    isValid &= validate.LName();
    isValid &= validate.DOB();
    isValid &= validate.ContactNo();
    isValid &= validate.Email();

    if (isValid) {
        // move to next step
        window.location.href = "/Background.html";
    }
}



/* =====================================================
   SELECT2 INIT + VALIDATION (FINAL)
===================================================== */

// Initialize Select2 (safe)
document.addEventListener("DOMContentLoaded", function () {
    if (window.jQuery && $.fn.select2) {
        $(".select2").select2({
            width: "100%",
            allowClear: true
        });
    }
});


/* =====================================================
   CLEAR ERROR ON CHANGE (IMPORTANT)
===================================================== */
$(document).on("change", ".select2", function () {
    const error = document.getElementById(this.id + "Error");
    if (error) error.textContent = "";
});
