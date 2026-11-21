/* Auto-login local : décision pure + route, sans modifier l'authentification normale. */
import { expect, test } from "bun:test";
import { decisionAutologin } from "../serveur/auth";
import { SUPER, serveurDeTest } from "./outils-serveur";

const trouver = (email: string) => (email === "local@test" ? { id: "u-local" } : null);
const args = (overrides: Partial<Parameters<typeof decisionAutologin>[0]> = {}) => ({
  ip: "127.0.0.1", jetonRecu: "secret", jetonAttendu: "secret", emailAttendu: "local@test", trouver,
  ...overrides,
});

test("autologin autorisé : boucle + jeton valide + compte existant", () => {
  expect(decisionAutologin(args())).toBe("ok");
});

test("autologin refusé : jeton absent", () => {
  expect(decisionAutologin(args({ jetonRecu: undefined }))).toBe("introuvable");
});

test("autologin refusé : mauvais jeton", () => {
  expect(decisionAutologin(args({ jetonRecu: "faux" }))).toBe("introuvable");
});

test("autologin désactivé : jeton non configuré", () => {
  expect(decisionAutologin(args({ jetonAttendu: "" }))).toBe("introuvable");
});

test("autologin désactivé : email non configuré", () => {
  expect(decisionAutologin(args({ emailAttendu: "" }))).toBe("introuvable");
});

test("autologin refusé : IP non boucle", () => {
  for (const ip of ["192.168.1.10", "10.0.0.1", "example.com", ""]) {
    expect(decisionAutologin(args({ ip }))).toBe("introuvable");
  }
});

test("autologin accepte les formes de boucle IPv4/IPv6", () => {
  for (const ip of ["127.0.0.1", "::1", "::ffff:127.0.0.1"]) {
    expect(decisionAutologin(args({ ip }))).toBe("ok");
  }
});

test("autologin refusé : compte local absent", () => {
  expect(decisionAutologin(args({ emailAttendu: "inconnu@test" }))).toBe("compte-indisponible");
});

test("autologin : aucun compte fantôme créé", () => {
  const d = decisionAutologin(args({ emailAttendu: "inconnu@test" }));
  expect(d).not.toBe("ok");
  expect(trouver("inconnu@test")).toBeNull();
});

test("route /api/auth/autologin désactivée sans configuration => 404", async () => {
  const s = await serveurDeTest();
  const r = await s.requete("/api/auth/autologin?jeton=secret");
  expect(r.status).toBe(404);
});

test("connexion classique conservée (cookie HttpOnly + SameSite Strict)", async () => {
  const s = await serveurDeTest();
  const ok = await s.connexion(SUPER.email, SUPER.motDePasse);
  expect(ok.r.status).toBe(200);
  expect(ok.entete).toContain("HttpOnly");
  expect(ok.entete).toContain("SameSite=Strict");
  const moi = await (await s.requete("/api/auth/moi", { cookie: ok.cookie })).json();
  expect(moi.utilisateur.email).toBe(SUPER.email);
});
