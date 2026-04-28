import { createFileRoute } from "@tanstack/react-router";
import heroImage from "@/assets/underwater-hero.jpg";
import { RsvpForm } from "@/components/RsvpForm";
import { FloatingDecor } from "@/components/FloatingDecor";
import { Countdown } from "@/components/Countdown";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chá de Bebê do Henrique 🐳 — 06/06/2026" },
      {
        name: "description",
        content:
          "Você está convidado(a) para o chá de bebê do Henrique e os aniversários da mamãe Vanessa e da doguinha Bebel 🐶. Confirme sua presença!",
      },
      { property: "og:title", content: "Chá de Bebê do Henrique 🐳" },
      {
        property: "og:description",
        content: "06/06/2026 — Venha celebrar com a gente! 💙",
      },
      { property: "og:image", content: heroImage },
      { name: "twitter:image", content: heroImage },
    ],
  }),
  component: Invitation,
});

function Invitation() {
  return (
    <main className="min-h-screen bg-gradient-sky">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="relative w-full"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "min(85vh, 720px)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/95" />
          <FloatingDecor />

          <div className="relative z-10 flex min-h-[inherit] flex-col items-center justify-end pb-16 sm:pb-24 px-4 text-center">
            <div className="max-w-2xl rounded-[2rem] bg-white/85 backdrop-blur-md px-6 py-8 sm:px-10 sm:py-10 shadow-soft animate-fade-up">
              <p className="font-display text-sm sm:text-base font-semibold uppercase tracking-[0.2em] text-primary mb-3">
                Você está convidado
              </p>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-ocean-deep leading-tight">
                Chá de Bebê do <br className="sm:hidden" />
                <span className="inline-block">Henrique 🐳</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-foreground/80">
                E comemoração do aniversário da{" "}
                <span className="font-semibold text-coral">Vanessa</span> e da{" "}
                <span className="font-semibold text-coral">Bebel 🐶</span> 🎉
              </p>

              <div className="mt-6 inline-flex flex-col items-center gap-1 rounded-2xl bg-gradient-ocean px-6 py-4 shadow-bubble">
                <span className="text-xs font-semibold uppercase tracking-widest text-white/80">
                  Reserve a data
                </span>
                <time className="font-display text-3xl sm:text-4xl font-bold text-white">
                  06 / 06 / 2026
                </time>
                <span className="text-xs font-semibold uppercase tracking-widest text-white/80">
                  SÁBADO
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MENSAGEM */}
      <section className="px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center animate-fade-up">
          <div className="mb-4 inline-block animate-float-fast text-5xl">💙</div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ocean-deep mb-6">
            Uma mensagem especial
          </h2>
          <p className="text-lg sm:text-xl leading-relaxed text-foreground/80">
            Você está convidado(a) para celebrar esse momento especial com a gente!
            Venha comemorar a chegada do{" "}
            <span className="font-semibold text-primary">Henrique</span> e os aniversários
            da <span className="font-semibold text-coral">Vanessa</span> e da{" "}
            <span className="font-semibold text-coral">Bebel 🐶</span> em um dia cheio de amor
            e alegria. 💙
          </p>
        </div>
      </section>

      {/* CONTAGEM REGRESSIVA */}
      <section className="relative overflow-hidden px-4 pb-20 sm:pb-28">
          <div className="mx-auto max-w-xl">
             <Countdown targetDate="2026-06-06T00:00:00"/>
         </div>
      </section>   

      {/* RSVP */}
      <section className="relative overflow-hidden px-4 pb-20 sm:pb-28">
        <div className="mx-auto max-w-xl">
          <div className="text-center mb-8 animate-fade-up">
            <span className="inline-block text-4xl mb-3 animate-sway">🌊</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ocean-deep mb-2">
              Confirme sua presença
            </h2>
            <p className="text-muted-foreground">
              Sua confirmação ajuda o papai e mamãe a organizarem tudo com carinho ✨
            </p>
          </div>
          <RsvpForm /> 
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gradient-ocean px-4 py-10 text-center">
        <p className="font-display text-xl text-white">Henrique • Vanessa • 🐶 Bebel</p>
        <p className="mt-2 text-sm text-white/80">Com amor, esperamos por você 💙🐳</p>
      </footer>
    </main>
  );
}
