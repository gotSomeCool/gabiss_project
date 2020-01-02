function getDate (sourDate: Date, time:boolean = false): string {
  const Y = sourDate.getFullYear();
  const M = sourDate.getMonth() + 1;
  const D = sourDate.getDate();
  if (time) {
    const h = sourDate.getHours();
    const m = sourDate.getMinutes();
    const s = sourDate.getSeconds();
    return `${Y} 年 ${M} 月 ${D} 日 ${h} 时 ${m} 分 ${s} 秒`
  } else {
    return  `${Y} 年 ${M} 月 ${D} 日`
  }
}

export default getDate;