export const getNestedValue = (obj: any, value: any) => {
  const valueArr = value.split(".");
  
  if (valueArr.length > 1) {
    return valueArr.reduce((acc: any, curr: any) => {
      return acc ? acc[curr] : acc
    }, obj);
  }
  return obj[value];
};
