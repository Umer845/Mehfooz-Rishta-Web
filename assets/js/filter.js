function applyFilter() {
    // Get all checkboxes
    const checkboxes = document.querySelectorAll('#filterCheckbox input[type="checkbox"]');

    // Create an array to store the checked values
    const filterValues = [];

    // Loop through checkboxes and get the checked ones
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            filterValues.push(checkbox.value);
        }
    });

    // Get all rows in the table
    const rows = document.querySelectorAll('#example tbody tr');

    // Loop through rows and hide/show based on filter
    rows.forEach(row => {
        const cellValue = row.cells[1].innerText; // Assuming the type is in the second column
        if (filterValues.includes(cellValue)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function clearInput() {
    document.getElementById('filter-input').value = '';
    const checkboxes = document.querySelectorAll('#filterCheckbox input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.checked = false);
    applyFilter(); // Optionally, you can also clear the filter when clearing the input
}