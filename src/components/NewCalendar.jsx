import React, { useEffect, useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
// import { PickersDay } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
// import { Badge } from "@mui/icons-material";

export function NewCalendar() {
  const [value, setValue] = useState(new Date());

  return (
    <div className="flex items-center justify-center p-5">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker
          orientation="portrait"
          openTo="day"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => (
            <TextField
              className="bg-black"
              {...params}
              // renderDay={(day, _value, DayComponentProps) => {
              //   const isSelected =
              //     !DayComponentProps.outsideCurrentMonth &&
              //     HighlightedDays.indexOf(day.getDate()) > 0;
              //     return (
              //       <Badge 
              //       key={day.toString()}
              //       overlap='circular'
              //       badgeContent={isSelected? '<3':undefined}>
              //         <PickersDay {...DayComponentProps}/>
              //       </Badge>
              //     )
              // }}
            />
          )}
        />
      </LocalizationProvider>
      {console.log(value)}
    </div>
  );
}
