// 当前时间转化为美东时间
export default function EDTtime(): Date {
  const localeDate = new Date();
  // 本时区的时差,并转换为毫秒：
  const localeOffset = localeDate.getTimezoneOffset() * 60 * 1000;
  // 本时区的当前时间：
  const localeNow = localeDate.getTime();
  // 此时西4区的时差,并转换为毫秒：
  const meidongOffset = (-4 * 60) * 60 * 1000 ;
  return new Date(localeNow + localeOffset + meidongOffset);
}