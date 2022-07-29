import DiscoveryEventsSerch from './discovery-api';
import markupModal from '../templates/modal.hbs';
import Notiflix from 'notiflix';

import { renderEvents } from '../index';

const openModalLiEl = document.querySelector('[data-modal-open]');
const closeModalBtnEl = document.querySelector('[data-modal-close]');
const backdropEl = document.querySelector('[data-modal]');
const modalCardEl = document.querySelector('.js-modal-card');
const btnAuthor = document.querySelector('.modal__more-btn');

const discovery = new DiscoveryEventsSerch();

openModalLiEl.addEventListener('click', openModal);
closeModalBtnEl.addEventListener('click', toggleModal);
backdropEl.addEventListener('click', toggleModal);
btnAuthor.addEventListener('click', onClickBtnAuthor);

// Закриття по Esc
const onEscBtnPush = event => {
  if (event.code !== 'Escape') {
    return;
  }
  backdropEl.classList.toggle('is-hidden');
  backdropEl.classList.remove('tilt-in-fwd-tr');
};
window.addEventListener('keydown', onEscBtnPush);
// Закриття по кліку на backdrop
backdropEl.addEventListener('click', closeModal);

function closeModal(event) {
  if (event.currentTarget === event.target) {
    return;
  }
  backdropEl.classList.toggle('is-hidden');
  backdropEl.classList.remove('tilt-in-fwd-tr');
}
// Закриття по кнопці
function toggleModal() {
  backdropEl.classList.toggle('is-hidden');
  backdropEl.classList.remove('tilt-in-fwd-tr');
}

async function openModal(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  backdropEl.classList.toggle('is-hidden');
  backdropEl.classList.add('tilt-in-fwd-tr');

  const response = await discovery.discoveryModalSerch(event.target.dataset.id);

  const modalConfig = creatParamObj(response.data);

  renderModal(modalConfig);

  try {
    const atribute = response.data._embedded.attractions[0].id;

    btnAuthor.setAttribute('data', atribute);
  } catch (error) {
    Notiflix.Notify.warning('Atantion! This Author has no other events!!!');
    return;
  }
}

function creatParamObj(data) {
  const objModal = {
    info: data.info,
    name: data.name,
    date: data.dates.start.localDate,
    time: data.dates.start.localTime,
    image: data.images[1].url,
    imageBig: data.images[2].url,
    city: data._embedded.venues[0].city.name,
    country: data._embedded.venues[0].country.name,
    location: data._embedded.venues[0].name,
    link: data.url,
    currency: data.priceRanges,
  };

  if (!objModal.info) {
    objModal.info = 'will be avalible soon';
  }

  if (!objModal.currency) {
    objModal.currency = 'will be avalible soon';
  } else {
    objModal.priceMin = data.priceRanges[0].min;
    objModal.priceMax = data.priceRanges[0].max;
    objModal.currency = data.priceRanges[0].currency;
  }

  return objModal;
}

async function renderModal(modalConfig) {
  try {
    modalCardEl.innerHTML = markupModal(modalConfig);
  } catch (err) {
    console.log(err);
  }
}

function onClickBtnAuthor() {
  const valueBtn = btnAuthor.getAttribute('data');

  const promise = discovery.discoveryEventsSerch(valueBtn);
  promise.then(results => {
    if (results.data._embedded === undefined) {
      Notiflix.Notify.failure('Atantion! This Author has no other events!!!');
      return;
    }
    renderEvents(results.data._embedded.events);
  });

  toggleModal();
}
