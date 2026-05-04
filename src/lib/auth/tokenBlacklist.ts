// token → timestamp de expiración (ms)
const blacklist = new Map<string, number>();

export function blacklistToken(token: string, expiresAt: number) {
  blacklist.set(token, expiresAt);
  // Limpiar entradas vencidas para no acumular memoria
  const now = Date.now();
  for (const [t, exp] of blacklist) {
    if (now > exp) blacklist.delete(t);
  }
}

export function isBlacklisted(token: string): boolean {
  const exp = blacklist.get(token);
  if (exp === undefined) return false;
  if (Date.now() > exp) {
    blacklist.delete(token);
    return false;
  }
  return true;
}
