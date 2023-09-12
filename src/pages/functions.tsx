export const formatDate = (inputDate: number): string => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
  
    const date = new Date(inputDate);
    const day = date.getUTCDate();
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    const hours = (date.getUTCHours() < 10 ? "0" : "") + date.getUTCHours();
    const minutes = (date.getUTCMinutes() < 10 ? "0" : "") + date.getUTCMinutes();
  
    return `${day} ${month} ${year}, ${hours}:${minutes}`;
  };

  export const stringToHex = (text: string): string => {
    // console.log(text);
    let hex = '';
    for (let i = 0; i < text.length; i++) {
      hex += text.charCodeAt(i).toString(16).padStart(2, '0');
    }
    // console.log(hex);
    return hex;
  };

  export const hexToString = (hex: string): string => {
    let text = '';
    for (let i = 0; i < hex.length; i += 2) {
      const hexByte = hex.substr(i, 2);
      const charCode = parseInt(hexByte, 16);
      text += String.fromCharCode(charCode);
    }
    return text;
  };
  