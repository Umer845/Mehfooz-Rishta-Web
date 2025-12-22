/*---===== Radio Button Single Selection & Error Clear =======---*/


document.querySelectorAll(".Radio-group, .radio-group").forEach(group => {

    const groupId = group.id;
    const errorSpan = document.getElementById(groupId + "Error");

    group.querySelectorAll("input[type='radio']").forEach(radio => {

        radio.addEventListener("change", function () {

            // Force single selection inside this group
            group.querySelectorAll("input[type='radio']").forEach(r => {
                if (r !== this) r.checked = false;
            });

            // Clear error message
            if (errorSpan) {
                errorSpan.textContent = "";
            }
        });

    });

});


/*---================ validate Function =================---*/

const validate = {

    alcohol: () => {
        const radios = document
            .getElementById("alcohol")
            .querySelectorAll("input[type='radio']");

        const error = document.getElementById("alcoholError");

        let checked = false;

        radios.forEach(radio => {
            if (radio.checked) checked = true;
        });

        if (!checked) {
            error.textContent = "Please select one option.";
            return false;
        }

        error.textContent = "";
        return true;
    },


    smoke: () => {
        const radios = document
            .getElementById("smoke")
            .querySelectorAll("input[type='radio']");

        const error = document.getElementById("smokeError");

        let checked = false;

        radios.forEach(radio => {
            if (radio.checked) checked = true;
        });

        if (!checked) {
            error.textContent = "Please select one option.";
            return false;
        }

        error.textContent = "";
        return true;
    },

    Food: () => {
        const radios = document
            .getElementById("Food")
            .querySelectorAll("input[type='radio']");

        const error = document.getElementById("FoodError");

        let checked = false;

        radios.forEach(radio => {
            if (radio.checked) checked = true;
        });

        if (!checked) {
            error.textContent = "Please select one option.";
            return false;
        }

        error.textContent = "";
        return true;
    },

    Faith: () => {
        const container = document.querySelector(".chips");
        const error = document.getElementById("FaithError");
        const selected = container.querySelectorAll("span.active").length;

        if (selected === 0) {
            error.textContent = "Please select at least one faith practice.";
            return false;
        }

        if (selected > 8) {
            error.textContent = "You can select up to 8 options only.";
            return false;
        }

        error.textContent = "";
        return true;
    },

    Religion: () => {
        const radios = document
            .getElementById("Religion")
            .querySelectorAll("input[type='radio']");

        const error = document.getElementById("ReligionError");

        let checked = false;

        radios.forEach(radio => {
            if (radio.checked) checked = true;
        });

        if (!checked) {
            error.textContent = "Please select one option.";
            return false;
        }

        error.textContent = "";
        return true;
    },

    BornMuslim: () => {
        const radios = document
            .getElementById("BornMuslim")
            .querySelectorAll("input[type='radio']");

        const error = document.getElementById("BornMuslimError");

        let checked = false;

        radios.forEach(radio => {
            if (radio.checked) checked = true;
        });

        if (!checked) {
            error.textContent = "Please select one option.";
            return false;
        }

        error.textContent = "";
        return true;
    }


};


/*---================ OnLoad Function =================---*/

function LoadData() {

    let isValid = true;

    isValid &= validate.BornMuslim();
    isValid &= validate.Religion();
    isValid &= validate.Faith();
    isValid &= validate.Food();
    isValid &= validate.smoke();
    isValid &= validate.alcohol();

    if (isValid) {
        setTimeout(() => {
            window.location.href = "/Lifestyle.html";
        }, 500);
    }
}

/*---================ Chips Selection =================---*/

document.querySelectorAll(".chips span").forEach(chip => {
    chip.addEventListener("click", function () {
        this.classList.toggle("active");
    });
});
