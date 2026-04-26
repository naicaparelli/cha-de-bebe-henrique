import { useEffect, useState } from "react";

type CountdownProps = {
  targetDate: string;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function Countdown({ targetDate }: CountdownProps) {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const items = [
    { label: "Dias", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Seg", value: timeLeft.seconds },
  ];

  const isToday =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  return (
    <section className="w-full rounded-[2rem] bg-white/55 px-4 py-10 text-center shadow-soft backdrop-blur-md sm:px-8">
      <p className="mb-4 font-display text-xs font-semibold uppercase tracking-[0.55em] text-primary">
        Contagem regressiva
      </p>

      <h2 className="mb-10 font-display text-3xl font-bold text-ocean-deep sm:text-4xl">
        A maré{" "}
        <span className="font-display italic text-coral">vira</span>{" "}
        em...
      </h2>

      {isToday ? (
        <div className="rounded-3xl bg-white px-6 py-8 shadow-bubble">
          <p className="font-display text-3xl font-bold text-primary">
            É hoje! 🎉
          </p>
          <p className="mt-2 text-muted-foreground">
            Chegou o grande dia do Henrique 💙
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.label}
              className="rounded-[1.4rem] border border-sky-100 bg-white px-4 py-6 shadow-bubble transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="font-display text-4xl font-bold leading-none text-ocean-deep sm:text-5xl">
                {String(item.value).padStart(2, "0")}
              </div>

              <div className="mt-4 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-primary">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}