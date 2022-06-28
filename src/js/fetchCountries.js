const refs = {
  baseURL: 'https://restcountries.com/v3.1/',
  param: 'name,capital,population,flags,languages',
};

export default function fetchCountries(name) {
  const data = fetch(`${refs.baseURL}name/${name}?fields=${refs.param}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
  return data;
}
