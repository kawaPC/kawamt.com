import dayjs from "dayjs";

dayjs.locale("ja");

export function formatKanjiYYYYMMDD(date: string): string {
  return dayjs(date).format("YYYY年MM月DD日");
}
