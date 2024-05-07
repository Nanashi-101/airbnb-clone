import countries from 'world-countries'

const formattedCountriesData = countries.map((item) => ({
    value: item.cca2,
    label: item.name.common,
    flag: item.flag,
    latLang: item.latlng,
    region: item.region,
}));

// Custom hook to access the countries data
export const useCountries = () => {
    // Return all countries
    const getAllCountries = () => formattedCountriesData;


    // Return a country by its value
    const getCountryByValue = (value: string) => {
        return formattedCountriesData.find((item) => item.label === value);
    }

    return {
        getAllCountries,
        getCountryByValue,
    }
}