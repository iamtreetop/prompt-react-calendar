import { useEffect, useState } from "react";

export const useDate = (appointments, currentMonth) => {
  // month year display
  const [dateDisplay, setDateDisplay] = useState("");
  // store day obvjects
  const [days, setDays] = useState([]);

  const appointmentForDate = (date) =>
    appointments.filter((e) => e.date === date);

  useEffect(() => {
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date();

    if (currentMonth !== 0) {
      date.setMonth(new Date().getMonth() + currentMonth);
    }

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const firstOfMonth = new Date(year, month, 1);
    // month + 1, 0 goes to last day of last month
    // number of squares
    const daysInMonth = new Date(year, month + 1, 0).getDate();


    // Ex. Friday, 1/1/2021
    const dateString = firstOfMonth.toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

    setDateDisplay(
      `${date.toLocaleDateString("en-us", { month: "long" })} ${year}`
    );

    const fillerDays = weekdays.indexOf(dateString.split(", ")[0]);

    // build days array
    const daysArray = [];
    for (let i = 1; i <= fillerDays + daysInMonth; i++) {
      const dayString = `${month + 1}/${i - fillerDays}/${year}`;

      if (i > fillerDays) {
        // not filler day; push day objects
        daysArray.push({
          value: i - fillerDays,
          isCurrentDay: i - fillerDays === day && currentMonth === 0,
          date: dayString,
          appointments: appointmentForDate(dayString),
        });
        // filler day
      } else {
        daysArray.push({
          value: "filler",
          isCurrentDay: false,
          date: "",
          appointments: null,
        });
      }
    }

    setDays(daysArray);
  }, [appointments, currentMonth]);

  return {days, dateDisplay};
};