import DiscoveryEventsSerch from './js/discovery-api';
import gallary from './templates/gallary.hbs';

const discovery = new DiscoveryEventsSerch();

//отрисовка main-list
responseSerch();
const form = document.querySelector('form');

const gallaryList = document.querySelector('.gallery-list-js');

form.addEventListener('submit', onInputSearch);

async function onInputSearch(event) {
  event.preventDefault();
  discovery.query = event.currentTarget.elements.search_event.value;

  discovery.queryCountry = event.currentTarget.elements.search_country.value;
  try {
    responseSerch();
  } catch (error) {
    console.log(error);
  }
}

function renderEvents(results) {
  const event = gallary(results);
  gallaryList.innerHTML = event;
}

function responseSerch() {
  const response = discovery.discoveryEventsSerch();
  response.then(results => {
    if (!results.data._embedded) {
      return console.log('Error');
    }
    const serchParam = results.data._embedded.events;
    console.log(results.data._embedded.events);

    renderEvents(serchParam);
  });
}
