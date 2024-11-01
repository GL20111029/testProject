window.onload = () => {
    function padStart(str) {
        return str.toString().padStart(2, 0).split("");
    }
    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    function getDaysInMonth(year, month) {
        const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (month === 1 && isLeapYear(year)) {
            return 29;
        }
        return daysInMonth[month - 1];
    }

    function getDaysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function countdown(endTime, unit = "days") {
        const now = new Date();
        const difference = endTime - now;

        if (difference <= 0) {
            return "已经结束";
        }

        const seconds = Math.floor(difference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        let result = {};

        switch (unit) {
            case "days":
                result = {
                    days: padStart(days),
                    hours: padStart(hours % 24),
                    minutes: padStart(minutes % 60),
                    seconds: padStart(seconds % 60),
                };
                break;

            case "months":
                let years = 0;
                let months = 0;
                let remainingDays = days;

                let currentYear = now.getFullYear();
                let endYear = endTime.getFullYear();

                while (currentYear < endYear) {
                    years++;
                    currentYear++;
                    remainingDays -= getDaysInYear(currentYear);
                }

                let currentMonth = now.getMonth();
                let endMonth = endTime.getMonth();

                while (currentMonth < endMonth) {
                    months++;
                    currentMonth++;
                    remainingDays -= getDaysInMonth(currentYear, currentMonth);
                }

                remainingDays = Math.max(remainingDays, 0);

                result = {
                    years: padStart(years),
                    months: padStart(months),
                    days: padStart(remainingDays),
                    hours: padStart(hours % 24),
                    minutes: padStart(minutes % 60),
                    seconds: padStart(seconds % 60),
                };
                break;

            case "years":
                let totalYears = 0;
                let totalMonths = 0;
                let totalDays = 0;

                currentYear = now.getFullYear();
                endYear = endTime.getFullYear();

                while (currentYear < endYear) {
                    totalYears++;
                    currentYear++;
                    totalDays += getDaysInYear(currentYear);
                }

                currentMonth = now.getMonth();
                endMonth = endTime.getMonth();

                while (currentMonth < endMonth) {
                    totalMonths++;
                    currentMonth++;
                    totalDays -= getDaysInMonth(currentYear, currentMonth);
                }

                totalDays = Math.max(totalDays, 0);

                result = {
                    years: padStart(totalYears),
                    months: padStart(totalMonths),
                    days: padStart(totalDays),
                    hours: padStart(hours % 24),
                    minutes: padStart(minutes % 60),
                    seconds: padStart(seconds % 60),
                };
                break;

            default:
                throw new Error('Invalid unit specified. Valid units are "days", "months", and "years".');
        }

        return result;
    }

    function setElementStyle(obj, key, els) {
        for (let i = 0; i < els.length; i++) {
            els[i].style.transform = `translateY(-${obj[key][i] * 100}%)`;
        }
    }
    const END_TIME = new Date("2024-12-03 19:30:00");

    const second_box_num_box = document.querySelector(".second_box").querySelectorAll(".num_box");
    const minute_box_num_box = document.querySelector(".minute_box").querySelectorAll(".num_box");
    const hour_box_num_box = document.querySelector(".hour_box").querySelectorAll(".num_box");
    const day_box_num_box = document.querySelector(".day_box").querySelectorAll(".num_box");
    setInterval(() => {
        requestAnimationFrame(() => {
            const surplus_time = countdown(END_TIME);
            setElementStyle(surplus_time, "seconds", second_box_num_box);
            setElementStyle(surplus_time, "minutes", minute_box_num_box);
            setElementStyle(surplus_time, "hours", hour_box_num_box);
            setElementStyle(surplus_time, "days", day_box_num_box);
            console.log(1111);
        });
    }, 1000);
};
