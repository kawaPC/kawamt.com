import dayjs from "dayjs";

dayjs.locale("ja");

export function formatSlashYYYYMMDD(date: string): string {
  return dayjs(date).format("YYYY/MM/DD");
}
