import ProvinceData from "../../../data/vietnam-province-district.json";

let ProvincesArray: { districtKey: string; value: string; label: string }[] =
  [];

for (let provinceObjectKey in ProvinceData) {
  const key = provinceObjectKey as keyof typeof ProvinceData;
  ProvincesArray.push({
    districtKey: provinceObjectKey,
    value: ProvinceData[key]?.name,
    label: ProvinceData[key]?.name,
  });
}

export default ProvincesArray;
