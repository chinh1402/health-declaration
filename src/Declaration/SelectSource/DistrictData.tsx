import ProvinceRawData from "../../../data/vietnam-province-district.json";

export default function (ProvinceData: {
    districtKey: string;
    value: string;
    label: string;
}[], province: string) {

    // cam provinceData, tim province nao co value = value de lay ra key. Tu key do lay ra cities
    const provinceItem = ProvinceData.find((item) => item.value === province);
    const cities = ProvinceRawData[provinceItem?.districtKey as keyof typeof ProvinceRawData]?.cities;

    let citiesArray: { value: string; label: string }[] = [];

    for (let cityObjectKey in cities) {
        const key = cityObjectKey as keyof typeof cities
        citiesArray.push({
            value: cities[key],
            label: cities[key]
        })
    }

    return citiesArray;
};