// src/components/Calendar.tsx
import { useEffect, useRef, useState } from "react";

interface CalendarProps {
  onSelect: (dates: Date[]) => void;
}

const Calendar = ({ onSelect }: CalendarProps) => {
  const today = new Date();

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth()); // 0-11
  const [selectedDates, setSelectedDates] = useState<Date[]>([today]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const todayRef = useRef<HTMLButtonElement>(null);

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const daysOfWeek = ["LU", "MA", "MI", "JU", "VI", "SA", "DO"];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay(); // 0 domingo - 6 sábado
  const adjustedStart = startDay === 0 ? 6 : startDay - 1;

  const daysArray = Array.from(
    { length: adjustedStart + daysInMonth },
    (_, i) =>
      i < adjustedStart ? null : new Date(year, month, i - adjustedStart + 1),
  ).filter(Boolean) as Date[];

  const toggleSelect = (date: Date) => {
    const exists = selectedDates.some(
      (d) => d.toDateString() === date.toDateString(),
    );
    let newSelected;
    if (exists) {
      newSelected = selectedDates.filter(
        (d) => d.toDateString() !== date.toDateString(),
      );
    } else {
      newSelected = [date]; // solo un día a la vez
    }
    setSelectedDates(newSelected);
    onSelect(newSelected);
  };

  // Scroll automático al día actual
  useEffect(() => {
    if (todayRef.current && scrollRef.current) {
      const offset =
        todayRef.current.offsetLeft -
        scrollRef.current.clientWidth / 2 +
        todayRef.current.clientWidth / 2;
      scrollRef.current.scrollTo({ left: offset, behavior: "smooth" });
    }
  }, [month, year]);

  return (
    <div className="bg-white rounded-2xl w-full max-w-3xl mx-auto">
      {/* Mes y año grandes */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2 items-end">
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="bg-transparent text-zinc-950 text-4xl font-medium focus:outline-none"
          >
            {months.map((m, i) => (
              <option key={i} value={i} className="text-black text-base">
                {m}
              </option>
            ))}
          </select>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="bg-transparent text-zinc-950 text-xl font-medium focus:outline-none"
          >
            {Array.from({ length: 10 }, (_, i) => year - 5 + i).map((y) => (
              <option key={y} value={y} className="text-black text-base">
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Scroll horizontal */}
      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto pb-2 scrollbar-none"
      >
        {daysArray.map((date) => {
          const isToday = date.toDateString() === today.toDateString();
          const isSelected = selectedDates.some(
            (d) => d.toDateString() === date.toDateString(),
          );
          return (
            <button
              key={date.toISOString()}
              ref={isToday ? todayRef : null}
              onClick={() => toggleSelect(date)}
              className={`flex flex-col items-center min-w-[50px] py-2 rounded-2xl transition-all
                ${
                  isToday || isSelected
                    ? "bg-black text-white"
                    : "text-zinc-600 hover:text-black"
                }
              `}
            >
              <span className="text-xs font-light">
                {daysOfWeek[date.getDay() === 0 ? 6 : date.getDay() - 1]}
              </span>
              <span className="text-2xl font-medium">{date.getDate()}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
