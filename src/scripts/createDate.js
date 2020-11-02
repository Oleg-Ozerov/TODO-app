export function createDate (isNextDay) {
    const fullDate = new Date();

    if(isNextDay) {
        fullDate.setDate(fullDate.getDate() + 1);
    }

    let dd = fullDate.getDate();

    if(dd < 10) {
        dd = '0' + dd;
    }

    let mm = fullDate.getMonth() + 1;

    if (mm < 10) {
        mm = '0' + mm;
    }
    return `${fullDate.getFullYear()}-${mm}-${dd}`;
}