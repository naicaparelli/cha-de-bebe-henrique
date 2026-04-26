import { useState, type FormEvent } from "react";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby7CQg3RaMUc_CIW48-bGXIkN5WXGLQvhugRvFk23aBa7qqwAYckxizc-EdX_vWV6Z0/exec";

export function RsvpForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [quantidade, setQuantidade] = useState<number | "">("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!nome.trim() || !email.trim() || !quantidade || Number(quantidade) < 1) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          nome: nome.trim(),
          email: email.trim(),
          quantidade: Number(quantidade),
        }),
      });

      setStatus("success");
      setNome("");
      setEmail("");
      setQuantidade("");
    } catch (err) {
      console.error("Google Sheets error:", err);
      setStatus("error");
      setErrorMsg("Não foi possível enviar agora. Tente novamente em instantes.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl bg-white p-8 sm:p-10 shadow-soft text-center animate-fade-up">
        <div className="text-6xl mb-4 animate-float-fast">💙</div>
        <h3 className="font-display text-2xl sm:text-3xl text-ocean-deep mb-2">
          Presença confirmada!
        </h3>
        <p className="text-muted-foreground">
          Mal podemos esperar para te ver no dia 06/06/2026 🐳
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-primary hover:underline"
        >
          Confirmar mais alguém
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-white p-6 sm:p-8 shadow-soft space-y-5"
    >
      <div>
        <label htmlFor="nome" className="block text-sm font-semibold text-ocean-deep mb-2">
          Nome completo
        </label>
        <input
          id="nome"
          type="text"
          required
          maxLength={120}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Como podemos te chamar?"
          className="w-full rounded-2xl border-2 border-border bg-foam px-4 py-3 text-foreground placeholder:text-muted-foreground/70 outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/15"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-ocean-deep mb-2">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          required
          maxLength={160}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seuemail@exemplo.com"
          className="w-full rounded-2xl border-2 border-border bg-foam px-4 py-3 text-foreground placeholder:text-muted-foreground/70 outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/15"
        />
      </div>

      <div>
        <label htmlFor="quantidade" className="block text-sm font-semibold text-ocean-deep mb-2">
          Quantidade de pessoas{" "}
          <span className="font-normal text-muted-foreground">(incluindo você)</span>
        </label>
        <input
          id="quantidade"
          type="number"
          min={1}
          max={20}
          required
          value={quantidade}
          onChange={(e) =>
            setQuantidade(e.target.value === "" ? "" : Math.max(1, Number(e.target.value)))
          }
          placeholder="1"
          className="w-full rounded-2xl border-2 border-border bg-foam px-4 py-3 text-foreground placeholder:text-muted-foreground/70 outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/15"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-destructive bg-destructive/10 rounded-xl px-4 py-2">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-2xl bg-gradient-ocean px-6 py-4 font-display text-lg font-semibold text-white shadow-bubble transition-all hover:scale-[1.02] hover:shadow-soft active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100"
      >
        {status === "loading" ? "Enviando..." : "Confirmar presença 💙"}
      </button>
    </form>
  );
}