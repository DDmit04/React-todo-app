export const DateToString = (date: Date): string => {
    let timestamp = Date.parse(date.toString());
    if (isNaN(timestamp) == false) {
        let jsDate = new Date(timestamp);
        let ye = new Intl.DateTimeFormat('en', {year: '2-digit'}).format(jsDate);
        let mo = new Intl.DateTimeFormat('en', {month: '2-digit'}).format(jsDate);
        let da = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(jsDate);
        return `${da}/${mo}/${ye}`
    } else {
        return date.toString()
    }
}