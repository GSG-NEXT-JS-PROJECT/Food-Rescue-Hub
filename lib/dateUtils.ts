export function convertLocalToISO(localDateTime: string): string {
  if (!localDateTime) return "";
  const date = new Date(localDateTime);
  return date.toISOString();
}

export function convertISOToLocal(isoDate: string): string {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  const offsetDate = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  );
  return offsetDate.toISOString();
}

export function getLocalISOStringNow(): string {
  const now = new Date();
  const localISOTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
  return localISOTime;
}

export const formatDate = (date: Date): string => {
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};
