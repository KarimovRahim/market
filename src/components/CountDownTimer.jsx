import React from 'react';
import { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        let { days, hours, minutes, seconds } = prevTime;

        // Уменьшаем секунды
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          // Уменьшаем минуты
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            // Уменьшаем часы
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              // Уменьшаем дни
              if (days > 0) {
                days--;
              } else {
                // Таймер завершен
                clearInterval(timer);
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
              }
            }
          }
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    // Очистка таймера при размонтировании
    return () => clearInterval(timer);
  }, []);

  // Функция для форматирования чисел с ведущим нулем
  const formatNumber = (num) => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  return (
    <div className="w-[300px] h-[50px] flex flex-row justify-center gap-[17px] items-center -mt-5">
      <div className="w-[46px] h-[50px] flex flex-col">
        <label htmlFor="" className="font-medium text-[12px] text-[#000000] mb-[-10px]">Days</label>
        <label htmlFor="" className="font-medium text-[40px] text-[#000000]">{formatNumber(timeLeft.days)}</label>
      </div>
      <label htmlFor="" className="font-medium text-[50px] text-[#E07575]">:</label>
      <div className="w-[46px] h-[50px] flex flex-col">
        <label htmlFor="" className="font-medium text-[12px] text-[#000000] mb-[-10px]">Hours</label>
        <label htmlFor="" className="font-medium text-[40px] text-[#000000]">{formatNumber(timeLeft.hours)}</label>
      </div>
      <label htmlFor="" className="font-medium text-[50px] text-[#E07575]">:</label>
      <div className="w-[46px] h-[50px] flex flex-col">
        <label htmlFor="" className="font-medium text-[12px] text-[#000000] mb-[-10px]">Minutes</label>
        <label htmlFor="" className="font-medium text-[40px] text-[#000000]">{formatNumber(timeLeft.minutes)}</label>
      </div>
      <label htmlFor="" className="font-medium text-[50px] text-[#E07575]">:</label>
      <div className="w-[46px] h-[50px] flex flex-col">
        <label htmlFor="" className="font-medium text-[12px] text-[#000000] mb-[-10px]">Seconds</label>
        <label htmlFor="" className="font-medium text-[40px] text-[#000000]">{formatNumber(timeLeft.seconds)}</label>
      </div>
    </div>
  );
};

export default CountdownTimer;