class Format {
  static ConvertToCamelCase(text){
    const convert = text.replace(/([-_][a-z])/g, 
    (group)=> group.toUpperCase()
    .replace('-', '')
    .replace('_', ''));
    return convert;
  }
  static toTime(duration){
    const seconds = parseInt((duration / 1000) % 60);
    const minutes = parseInt((duration / (1000 * 60)) % 60);
    const hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    if(hours > 0){
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, 0)}`;
    }else{
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  }

  static dateToTime(date, locale ="pt-BR"){
    return date.toLocaleTimeString(locale, {
      hour:'2-digit',
      minute: '2-digit'
    })
  }

  static FormatHours(timeStamp){
    console.log(timeStamp)
    return (timeStamp && typeof timeStamp.toDate ===  'function') 
    ? Format.dateToTime(timeStamp.toDate())
    : '';
  }
}

export default Format;