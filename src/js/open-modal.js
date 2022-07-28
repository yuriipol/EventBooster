import DiscoveryEventsSerch from './discovery-api';
import markupModal from '../templates/modal.hbs';

const openModalLiEl = document.querySelector('[data-modal-open]');
const closeModalBtnEl = document.querySelector('[data-modal-close]');
const backdropEl = document.querySelector('[data-modal]');
const modalCardEl = document.querySelector('.js-modal-card');

const discovery = new DiscoveryEventsSerch();

openModalLiEl.addEventListener('click', openModal);
closeModalBtnEl.addEventListener('click', toggleModal);

// Закриття по Esc
const onEscBtnPush = event => {
  if (event.code !== 'Escape') {
    return;
  }
  backdropEl.classList.toggle('is-hidden');
};

window.addEventListener('keydown', onEscBtnPush);

backdropEl.addEventListener('click', closeModal);
function closeModal(event) {
  if (event.currentTarget === event.target) {
    return;
  }
  backdropEl.classList.toggle('is-hidden');
}

async function openModal(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  backdropEl.classList.toggle('is-hidden');

  const response = await discovery.discoveryModalSerch(event.target.dataset.id);
  console.log('~ response', response);

  const modalConfig = creatParamObj(response.data);

  renderModal(modalConfig);
}
function toggleModal() {
  backdropEl.classList.toggle('is-hidden');
}
function creatParamObj(data) {
  // objModal.info = results.data.info;
  // objModal.name = results.data.name;
  // objModal.date = results.data.dates.start.localDate;
  // objModal.time = results.data.dates.start.localTime;
  // objModal.image = results.data.images[1].url;
  // objModal.imageBig = results.data.images[2].url;
  // objModal.city = results.data._embedded.venues[0].city.name;
  // objModal.country = results.data._embedded.venues[0].country.name;
  // objModal.location = results.data._embedded.venues[0].name;
  // objModal.link = results.data.url;
  // objModal.priceMin = results.data.priceRanges;
  // if (!objModal.currency) {
  //   objModal.currency = 'will be avalible soon';
  // } else {
  // objModal.priceMin = results.data.priceRanges[0].min;
  // objModal.priceMax = results.data.priceRanges[0].max;
  // objModal.currency = results.data.priceRanges[0].currency;
  // }

  // if (!objModal.info) {
  //   objModal.info = 'will be avalible soon';
  // }

  return { image: data.images[1].url, imageBig: data.images[2].url };
}

async function renderModal(modalConfig) {
  try {
    modalCardEl.innerHTML = markupModal(modalConfig);
  } catch (err) {
    console.log(err);
  }
}
