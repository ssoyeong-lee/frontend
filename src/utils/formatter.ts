import { format } from "date-fns";

export function dateFormatter(datestring: string): string {
  const date = new Date(datestring);
  if (isNaN(date?.getTime())) return "";
  return format(date, "yyyy-MM-dd HH:mm:ss");
}
