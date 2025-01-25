
document.addEventListener("DOMContentLoaded", () => {
    let display = document.querySelector(".display");
    let days = document.querySelector(".days");
    let previous = document.querySelector(".left");
    let next = document.querySelector(".right");
    let selected = document.querySelector(".selected");

    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();

    function displayCalendar() {
        let formattedDate = `${date.toLocaleString("en-US", { month: "long" })} ${year}`;
        display.innerHTML = formattedDate;

        const firstDay = new Date(year, month, 1);
        const firstDayIndex = firstDay.getDay();
        const lastDay = new Date(year, month + 1, 0);
        const numberOfDays = lastDay.getDate();

        days.innerHTML = ""; // Clear previous days

        // Add empty divs for padding before the first day of the month
        for (let x = 0; x < firstDayIndex; x++) {
            const div = document.createElement("div");
            days.appendChild(div);
        }

        // Add divs for each day of the current month
        for (let i = 1; i <= numberOfDays; i++) {
            let div = document.createElement("div");
            let currentDate = new Date(year, month, i);
            div.dataset.date = currentDate.toDateString();
            div.innerHTML = i;
            days.appendChild(div);

            // Highlight the current date
            if (
                currentDate.getFullYear() === new Date().getFullYear() &&
                currentDate.getMonth() === new Date().getMonth() &&
                currentDate.getDate() === new Date().getDate()
            ) {
                div.classList.add("current-date");
            }
        }

        displaySelected(); // Add click listeners to days
    }

    function displaySelected() {
        const dayElements = document.querySelectorAll(".days div");
        dayElements.forEach((day) => {
            day.addEventListener("click", (e) => {
                const selectedDate = e.target.dataset.date;
                selected.innerHTML = `Selected Date: ${selectedDate}`;
            });
        });
    }

    displayCalendar();

    previous.addEventListener("click", () => {
        if (month === 0) {
            month = 11;
            year -= 1;
        } else {
            month -= 1;
        }
        date.setMonth(month);
        displayCalendar();
    });

    next.addEventListener("click", () => {
        if (month === 11) {
            month = 0;
            year += 1;
        } else {
            month += 1;
        }
        date.setMonth(month);
        displayCalendar();
    });
});
