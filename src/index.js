import DiscoveryEventsSerch from './js/discovery-api';
import gallary from './templates/gallary.hbs';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import customSelect from 'custom-select';
import 'custom-select/build/custom-select.css';
import Notiflix from 'notiflix';

const discovery = new DiscoveryEventsSerch();

const mySelect = customSelect(document.querySelector('#mySelect'));

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
  if (

    discovery.query === event.currentTarget.elements.search_event.value &&

    discovery.queryCountry === event.currentTarget.elements.search_country.value
  ) {
    return;
  }

  discovery.query = event.currentTarget.elements.search_event.value;

  discovery.queryCountry = event.currentTarget.elements.search_country.value;

  try {
    if (discovery.query === '') {
      return;
    }

    responseSerch();

    console.log('FFFFFF');
  } catch (error) {
    console.log(error);
  }
}

export function renderEvents(results) {
  const event = gallary(results);
  gallaryList.innerHTML = event;
}

function responseSerch() {
  const response = discovery.discoveryEventsSerch();
  response.then(results => {
    if (!results.data._embedded) {
      return Notiflix.Notify.warning('In this country no events!');
    }
    const serchParam = results.data._embedded.events;

    instance.setTotalItems(results.data.page.totalElements);
    instance._paginate(discovery.page);

    renderEvents(serchParam);
  });
}

const paginationEl = document.querySelector('.decoration');
const removeClassIsHidden = () => {
  paginationEl.classList.remove('visually-hidden');
};

setTimeout(removeClassIsHidden, 3000);

const spanSelect = document.querySelector('.custom-select-opener');
const selectOptions = document.querySelectorAll('.custom-select-option');
const selectPanelEl = document.querySelector('.custom-select-panel');
const divEl = document.querySelector('.custom-select-container');

divEl.classList.add('designed');
spanSelect.classList.add('desine');
selectOptions.forEach(el => el.classList.add('desinse'));
selectPanelEl.classList.add('decor');
