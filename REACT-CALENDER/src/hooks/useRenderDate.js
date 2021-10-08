import React from "react";
import { useSelector } from "react-redux";
import Date from "../components/Date";

const useRenderDate = (start, now, current) => {
  const mode = useSelector((state) => state.calendar.mode);
  const schedules = useSelector((state) => state.calendar.scheduleList) || [];
  const nowFormat = now.clone().format("YYYYMMDD");
  return (
    <>
      {[...Array(42)].map((n, idx) => {
        let target = start.clone().add(idx, "d");
        let today = target.clone().format("YYYYMMDD") === nowFormat;
        let thisMonth =
          target.clone().format("YYYYMM") === current.clone().format("YYYYMM");
        let targetList =
          mode === "all"
            ? schedules.filter(
                (schedule) =>
                  schedule.date === parseInt(target.format("YYYYMMDD"))
              )
            : schedules.filter(
                (schedule) =>
                  schedule.date === parseInt(target.format("YYYYMMDD")) &&
                  schedule.isCompleted === true
              );
        return (
          <Date key={idx} list={targetList} today={today} thisMonth={thisMonth}>
            {target.format("D")}
          </Date>
        );
      })}
    </>
  );
};

export default useRenderDate;
