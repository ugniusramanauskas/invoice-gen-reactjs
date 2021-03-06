import axios from "axios";

const countriesInEU = [
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
];

export const countryIsInEU = (alpha2Code) => {
  return countriesInEU.includes(alpha2Code);
};

export async function getVatRate(alpha2Code) {
  // populate the list of countries from an API
  let config = {
    method: "get",
    url: `https://api.vatstack.com/v1/rates?country_code=${alpha2Code}`,
    headers: {
      "X-API-KEY": "pk_live_7130bca996a2e918c68fd6b59cb5c46e",
    },
  };
  return axios(config).then((response) => {
    return response.data.rates[0].standard_rate;
  });
}

export function fetchCountryList() {
  return axios
    .get("https://restcountries.eu/rest/v2/all?fields=name;alpha2Code")
    .then((response) => {
      return response;
    });
}

const isTrue = (status) => status === "Yes";

export function shouldVatBeAppliedForInvoice(
  serviceProviderIsVatPayer,
  serviceProviderCountry,
  clientIsVatPayer,
  clientCountry
) {
  /**
   * a number of conditions to check if VAT should be applied
   * */
  if (!isTrue(serviceProviderIsVatPayer)) return false;
  if (!countryIsInEU(clientCountry)) return false;
  if (clientCountry !== serviceProviderCountry && isTrue(clientIsVatPayer))
    return false;
  return true;
}

export const roundTo2Decimals = (float) => Math.round(float * 100) / 100;
