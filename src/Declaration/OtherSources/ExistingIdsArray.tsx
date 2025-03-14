export function AllFormIdFunc() {
  let existingallFormIds: string[] = [];
  
  const allFormData = localStorage.getItem("allFormData");
  if (allFormData) {
    existingallFormIds = JSON.parse(allFormData).map((item: any) => item.id);
  }
  
  return existingallFormIds;
}