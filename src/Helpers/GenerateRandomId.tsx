const generateUniqueId = () => {
    return `_${Math.random().toString(36).substr(2, 5)}`;
  };
  
  const ensureUniqueId = (
    id: string,
    existingArray: any[],
    idGenerator: () => string
  ): string => {
    while (existingArray.some((item) => item.id === id)) {
      id = idGenerator();
    }
    return id;
  };
  
  export function assignIdToObject(obj: any, referenceArray: any[]): any {
    const uniqueId = ensureUniqueId(generateUniqueId(), referenceArray, generateUniqueId);
    return { ...obj, id: uniqueId };
  }
  