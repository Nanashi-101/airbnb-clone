"use client";

import React, { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { eachDayOfInterval } from "date-fns";

function SelectCalender({
  availableDates,
  reservation,
}: {
  availableDates: number;
  reservation:
    | {
        startDate: Date | null;
        endDate: Date | null;
      }[]
    | undefined;
}) {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  let disabledDates: Date[] = [];
  reservation?.forEach((item) => {
    const dateRange = eachDayOfInterval({
      start: new Date(item.startDate as Date),
      end: new Date(item.endDate as Date),
    });

    disabledDates = [...disabledDates, ...dateRange];
  });

  // console.log(disabledDates);
  return (
    <>
      <input
        type="hidden"
        name="startDate"
        value={state[0].startDate.toISOString()}
      />
      <input
        type="hidden"
        name="endDate"
        value={state[0].endDate.toISOString()}
      />
      <DateRange
        date={new Date()}
        showDateDisplay={false}
        rangeColors={["#FF5A5F"]}
        ranges={state}
        onChange={(item) => setState([item.selection] as any)}
        minDate={new Date()}
        maxDate={
          new Date(new Date().setDate(new Date().getDate() + availableDates))
        }
        direction="vertical"
        disabledDates={disabledDates}
      />
    </>
  );
}

export default SelectCalender;
