import DiscoveryEventsSerch from './js/discovery-api';
import gallary from './templates/gallary.hbs';

const discovery = new DiscoveryEventsSerch();

//отрисовка main-list
const inputSearchEl = document.querySelector('.form-input');
const form = document.querySelector('form');

const gallaryList = document.querySelector('.gallery-list-js');

form.addEventListener('input', onInputSearch);

function onInputSearch(event) {
  discovery.query = event.currentTarget.elements.search_event.value;

  discovery.queryCountry = event.currentTarget.elements.search_country.value;

  const response = discovery.discoveryEventsSerch();
  response.then(results => {
    console.log(results.data._embedded.events);
    // if (discovery.queryCountry === '') {
    //   return;
    // }
    renderEvents(results.data._embedded.events);
  });
}

function renderEvents(results) {
  const event = gallary(results);
  gallaryList.innerHTML = event;
}
