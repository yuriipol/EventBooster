import DiscoveryEventsSerch from './js/discovery-api';
import gallary from './templates/gallary.hbs';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const discovery = new DiscoveryEventsSerch();

const container = document.getElementById('tui-pagination-container');
const instance = new Pagination(container, {
  totalItems: 0,
  itemsPerPage: discovery.size,
  visiblePages: 5,
});
instance.on('afterMove', event => {
  const currentPage = event.page;

  discovery.page = currentPage;
  responseSerch();
});

//отрисовка main-list

responseSerch();

const form = document.querySelector('form');

const gallaryList = document.querySelector('.gallery-list-js');

form.addEventListener('submit', onInputSearch);

async function onInputSearch(event) {
  event.preventDefault();
  discovery.page = 1;
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
    console.log(results.data.page);

    instance.setTotalItems(results.data.page.totalElements);
    instance._paginate(discovery.page);

    renderEvents(serchParam);
  });
}
