export const useTransformIpDetails = (data) => {
  const transformed = {
    country: data.country,
    countryCode: data.country_code_iso3,
    countryName: data.country_name,
    region: data.region,
    regionCode: data.region_code,
    timezone: data.timezone,
    utcOffset: data.utc_offset,
    os: data.os,
    currencyName: data.currency_name,
    currency: data.currency,
    city: data.city,
    continentCode: data.continent_code,
    callingCode: data.country_calling_code,
    lat: data.latitude,
    long: data.longitude,
    languages: data.languages,
    inEu: data.in_eu,
    postalCode: data.postal,
    org: data.org,
    ip: data.ip,
  };
  return transformed;
};
