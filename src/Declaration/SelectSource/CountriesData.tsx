import countries from "../../../data/countries.json";
export const CountriesData = countries.map((item: any) => {
    return {
        value: item.name,
        label: item.name
    }
})