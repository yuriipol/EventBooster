import DiscoveryEventsSerch from './js/discovery-api';
import gallary from './templates/gallary.hbs';
import customSelect from 'custom-select';
import 'custom-select/build/custom-select.css';
import Notiflix from 'notiflix';
const discovery = new DiscoveryEventsSerch();
const mySelect = customSelect(document.querySelector('#mySelect'));

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


  discovery.query = event.currentTarget.elements.search_event.value;
  discovery.queryCountry = event.currentTarget.elements.search_country.value;
  try {
    if (discovery.query === '') {
      return;
    }

    responseSerch();
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

    const currentPage = results.data.page.number;
    let allPage = '';
    if (results.data.page.totalElements <= 1000) {
      allPage = results.data.page.totalPages - 1;
    } else {
      allPage = 62;
    }
    createPagination(allPage, currentPage);
    renderEvents(serchParam);
  });
}

const spanSelect = document.querySelector('.custom-select-opener');
const selectOptions = document.querySelectorAll('.custom-select-option');
const selectPanelEl = document.querySelector('.custom-select-panel');
const divEl = document.querySelector('.custom-select-container');

divEl.classList.add('designed');
spanSelect.classList.add('desine');
selectOptions.forEach(el => el.classList.add('desinse'));
selectPanelEl.classList.add('decor');


const galleryListEl = document.querySelector('.gallery-page__list');
galleryListEl.addEventListener('click', onClickTaketPAge);

function onClickTaketPAge(evt) {
  if (!evt.target.classList.contains('gallery-page__item')) {
    return;
  }
  discovery.page = Number(evt.target.textContent);
  responseSerch();
}

function createPagination(totalPages, page) {
  let gallaryItems = '';
  let activeClass;
  let beforePage = page - 1;
  let afterPage = page + 1;
  if (page > 2) {
    gallaryItems += `<li class="gallery-page__item">1</li>`;
    if (page > 3) {
      gallaryItems += `<li class="gallery-page__dots">...</li>`;
    }
  }
  if (page === totalPages) {
    beforePage -= 2;
  } else if (page === totalPages - 1) {
    beforePage -= 1;
  }
  if (page === 1) {
    afterPage += 3;
  } else if (page === 2) {
    afterPage += 2;
  } else if (page === 3) {
    afterPage += 1;
  }
  for (let i = beforePage; i <= afterPage; i += 1) {
    if (i > totalPages) {
      continue;
    }
    if (i === 0) {
      i = +1;
    }
    if (page === i) {
      activeClass = 'active';
    } else {
      activeClass = '';
    }
    gallaryItems += `<li class="gallery-page__item ${activeClass}">${i}</li>`;
  }
  if (page < totalPages - 1) {
    if (page < totalPages - 2) {
      gallaryItems += `<li class="gallery-page__dots">...</li>`;
    }
    gallaryItems += `<li class="gallery-page__item">${totalPages}</li>`;
  }
  galleryListEl.innerHTML = gallaryItems;
  return gallaryItems;
}

