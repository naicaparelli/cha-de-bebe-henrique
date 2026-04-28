import { useEffect, useState, type FormEvent } from "react";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby7CQg3RaMUc_CIW48-bGXIkN5WXGLQvhugRvFk23aBa7qqwAYckxizc-EdX_vWV6Z0/exec";

type GiftSize = "RN" | "P" | "M" | "G";

const giftLimits: Record<GiftSize, number> = {
  RN: 7,
  P: 10,
  M: 10,
  G: 10,
};

const giftOptions: { value: GiftSize; label: string }[] = [
  { value: "RN", label: "Fralda RN" },
  { value: "P", label: "Fralda P" },
  { value: "M", label: "Fralda M" },
  { value: "G", label: "Fralda G" },
];

export function RsvpForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [quantidade, setQuantidade] = useState<number | "">("");
  const [presente, setPresente] = useState<GiftSize | "">("");

  const [estoque, setEstoque] = useState<Record<GiftSize, number>>({
    RN: 0,
    P: 0,
    M: 0,
    G: 0,
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function loadGifts() {
    try {
      const response = await fetch(`${SCRIPT_URL}?t=${Date.now()}`, {
        method: "GET",
        cache: "no-store",
      });

      const data = await response.json();

      setEstoque({
        RN: Number(data.RN || 0),
        P: Number(data.P || 0),
        M: Number(data.M || 0),
        G: Number(data.G || 0),
      });
    } catch (error) {
      console.error("Erro ao carregar presentes:", error);
    }
  }

  useEffect(() => {
    loadGifts();
  }, []);

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
          presente,
        }),
      });

      if (presente) {
        setEstoque((prev) => ({
          ...prev,
          [presente]: prev[presente] + 1,
        }));
      }

      setStatus("success");
      setNome("");
      setEmail("");
      setQuantidade("");
      setPresente("");
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
          onClick={() => {
            setStatus("idle");
            loadGifts();
          }}
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

      <div className="rounded-3xl bg-foam/80 border-2 border-border p-5">
        <p className="font-display text-lg font-semibold text-ocean-deep mb-1">
          Sugestão de presente
        </p>
        <p className="text-sm text-muted-foreground mb-4">
          Opcional — escolha uma opção disponível 💙
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {giftOptions.map((gift) => {
            const selectedCount = estoque[gift.value];
            const limit = giftLimits[gift.value];
            const isSoldOut = selectedCount >= limit;

            return (
              <label
                key={gift.value}
                className={`flex cursor-pointer items-center justify-between rounded-2xl border-2 px-4 py-3 transition-all ${
                  presente === gift.value
                    ? "border-primary bg-white shadow-bubble"
                    : "border-border bg-white/70"
                } ${isSoldOut ? "cursor-not-allowed opacity-50" : "hover:border-primary/60"}`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="presente"
                    value={gift.value}
                    disabled={isSoldOut}
                    checked={presente === gift.value}
                    onChange={(e) => setPresente(e.target.value as GiftSize)}
                    className="h-4 w-4 accent-primary"
                  />

                  <span className="font-semibold text-ocean-deep">{gift.label}</span>
                </div>

                <span className="text-xs font-semibold text-muted-foreground">
                  {isSoldOut ? "Esgotado" : `${selectedCount}/${limit}`}
                </span>
              </label>
            );
          })}
        </div>

        {presente && (
          <button
            type="button"
            onClick={() => setPresente("")}
            className="mt-4 text-sm font-semibold text-primary hover:underline"
          >
            Remover seleção de presente
          </button>
        )}
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