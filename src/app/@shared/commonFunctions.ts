export class CommonFunction {
  formatedDate(date: any) {
    const sDate = date.year + '-' + date.month + '-' + date.day;
    return sDate;
  }
}
export function formatedDate(date: Date) {
  let day = date.getDate().toString();
  if (date.getDate() < 10) {
    day = '0' + day;
  }
  let month = (date.getMonth() + 1).toString();
  if (date.getMonth() < 10) {
    month = '0' + month;
  }
  const sDate = date.getFullYear() + '-' + month + '-' + day;
  return sDate;
}
