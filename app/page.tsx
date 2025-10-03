"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/app/i18n/I18nProvider";

export default function LoginPage() {
  const router = useRouter();
  const { t } = useI18n();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [showPwd, setShowPwd] = useState(false);

  return (
    <main className="mx-auto flex min-h-[70dvh] max-w-sm flex-col justify-center p-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-indigo-600">BODY MASTER</div>
          <h1 className="mt-1 text-xl font-bold tracking-tight text-gray-900">{t("login.title", "Connexion")}</h1>
          <p className="text-xs text-gray-500">{t("login.subtitle", "Veuillez vous connecter pour accéder au tableau de bord.")}</p>
        </div>
        {error && (
          <div className="mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
        )}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setError("");
            setLoading(true);
            try {
              const res = await fetch("/api/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
              });
              if (!res.ok) {
                const j = await res.json().catch(() => ({}));
                throw new Error(j?.error || `HTTP ${res.status}`);
              }
              // success
              localStorage.setItem("loggedIn", "1");
              localStorage.setItem("loggedUser", username);
              router.replace("/dashboard");
            } catch (err: any) {
              setError(err?.message || t("login.error", "Échec de connexion"));
            } finally {
              setLoading(false);
            }
          }}
          className="space-y-3"
        >
          <label className="block text-sm">
            <span className="mb-1 block text-gray-700">{t("login.username", "Identifiant")}</span>
            <input
              className="w-full rounded-md border border-neutral-300 px-3 py-2"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t("login.username.placeholder", "ex: admin")}
              required
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-gray-700">{t("login.password", "Mot de passe")}</span>
            <div className="relative">
              <input
                className="w-full rounded-md border border-neutral-300 px-3 py-2 pr-10"
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={4}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-xs text-gray-500 hover:text-gray-700"
                onClick={() => setShowPwd((v) => !v)}
                aria-label={showPwd ? t("login.hidePassword", "Masquer le mot de passe") : t("login.showPassword", "Afficher le mot de passe")}
              >
                {showPwd ? t("login.hide", "Masquer") : t("login.show", "Afficher")}
              </button>
            </div>
          </label>
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? t("login.loading", "Connexion…") : t("login.submit", "Se connecter")}
          </button>
        </form>
      </div>
    </main>
  );
}

