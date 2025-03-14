const convertDateFormat = (date: string): string => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };
  
export default convertDateFormat;