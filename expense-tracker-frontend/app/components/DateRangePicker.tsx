"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import { subDays, startOfWeek, endOfWeek } from "date-fns";

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onChange: (start: Date, end: Date) => void;
}

export default function DateRangePicker({
  startDate,
  endDate,
  onChange,
}: DateRangePickerProps) {
  const [localStart, setLocalStart] = useState(startDate);
  const [localEnd, setLocalEnd] = useState(endDate);

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-sm mb-6 flex flex-wrap gap-3 items-center text-gray-100 relative">
      {/* GLOBAL FIXES — DO NOT REMOVE */}
      <style jsx global>{`
        .react-datepicker {
          z-index: 999999 !important;
        }
        .react-datepicker__portal {
          z-index: 1000000 !important;
        }
        .react-datepicker-popper {
          z-index: 999999 !important;
        }
      `}</style>

      {/* START DATE */}
      <div className="flex flex-col">
        <label className="block text-sm font-semibold mb-1 text-gray-200">
          Start Date
        </label>

        <DatePicker
          selected={localStart}
          onChange={(date) => {
            if (date) {
              // ← NULL CHECK
              setLocalStart(date);
              onChange(date, localEnd);
            }
          }}
          selectsStart
          startDate={localStart}
          endDate={localEnd}
          portalId="datepicker-root"
          popperPlacement="bottom-start"
          popperModifiers={[]}
          className="border border-gray-600 bg-gray-900 text-gray-100 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-700"
        />
      </div>

      {/* END DATE */}
      <div className="flex flex-col">
        <label className="block text-sm font-semibold mb-1 text-gray-200">
          End Date
        </label>

        <DatePicker
          selected={localEnd}
          onChange={(date) => {
            if (date) {
              // ← NULL CHECK
              setLocalEnd(date);
              onChange(localStart, date);
            }
          }}
          selectsEnd
          startDate={localStart}
          endDate={localEnd}
          minDate={localStart}
          portalId="datepicker-root"
          popperPlacement="bottom-start"
          popperModifiers={[]}
          className="border border-gray-600 bg-gray-900 text-gray-100 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-700"
        />
      </div>

      {/* QUICK BUTTONS */}
      <div className="flex gap-2 ml-auto">
        <button
          onClick={() => {
            const s = startOfWeek(new Date());
            const e = endOfWeek(new Date());
            setLocalStart(s);
            setLocalEnd(e);
            onChange(s, e);
          }}
          className="text-blue-300 hover:underline px-3 py-1 rounded-md hover:bg-blue-900/40 cursor-pointer"
        >
          Current Week
        </button>

        <button
          onClick={() => {
            const s = subDays(new Date(), 30);
            const e = new Date();
            setLocalStart(s);
            setLocalEnd(e);
            onChange(s, e);
          }}
          className="text-green-300 hover:underline px-3 py-1 rounded-md hover:bg-green-900/40 cursor-pointer"
        >
          Last 30 Days
        </button>
      </div>
    </div>
  );
}
