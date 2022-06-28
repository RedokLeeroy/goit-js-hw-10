import './css/styles.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import debounce from 'lodash.debounce';
import './css/styles.css';
import fetchCountries from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;
const referens = {
  countryList: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
  inputB: document.querySelector('#search-box'),
};

referens.inputB.addEventListener(
  'input',
  debounce(hadndlerInput, DEBOUNCE_DELAY)
);
function hadndlerInput(event) {
  event.preventDefault();
  const target = event.target.value.trim();
  fetchCountries(target)
    .then(data => countriesData(data))
    .catch(error => {
      if (target !== '') {
        Notiflix.Notify.failure('There is no country with that name');
      }
    });
}

function markupForList(data) {
  markupList = data
    .map(elem => {
      return `<li class="country">
    <img src="${elem.flags.svg}" /> 
    <p>${elem.name.official}</p>
    </li>`;
    })
    .join('');
  referens.countryList.innerHTML = markupList;
}

function markupForCountry(data) {
  const language = Object.values(data[0].languages);
  const markupCountry = `<div class = 'country'>
                  <img src='${data[0].flags.svg}'/>
                      <div class ='country-body'>
          <h2>${data[0].name.official}</h2>
          <p><b>Capital: </b>${data[0].capital}</p>
          <p><b>Population:</b>${data[0].population.toLocaleString()}</p>
          <p><b>Languages:</b>${language.join(', ')}</p>
          </div>
      </div>
      `;
  referens.info.innerHTML = markupCountry;
}

function countriesData(data) {
  if (data.length > 10) {
    referens.countryList.innerHTML = '';
    Notiflix.Notify.info('YOU PICKED THE WRONG HOUSE FOOL');
  } else if (data.length > 1 && data.length <= 10) {
    referens.countryList.innerHTML = '';
    referens.info.innerHTML = '';
    markupForList(data);
  } else {
    referens.countryList.innerHTML = '';
    referens.info.innerHTML = '';
    markupForCountry(data);
  }
}
