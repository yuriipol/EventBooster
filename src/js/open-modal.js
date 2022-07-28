import DiscoveryEventsSerch from './discovery-api';
import markupModal from '../templates/modal.hbs';

const openModalLiEl = document.querySelector('[data-modal-open]');
const closeModalBtnEl = document.querySelector('[data-modal-close]');
const backdropEl = document.querySelector('[data-modal]');
const modalCardEl = document.querySelector('.js-modal-card');
const modalEl = document.querySelector('modal');

const discovery = new DiscoveryEventsSerch();

openModalLiEl.addEventListener('click', openModal);
closeModalBtnEl.addEventListener('click', toggleModal);
backdropEl.addEventListener('click', toggleModal);
// Закриття по Esc
const onEscBtnPush = event => {
  if (event.code !== 'Escape') {
    return;
  }
  backdropEl.classList.toggle("is-hidden");
};
window.addEventListener('keydown', onEscBtnPush);

// Закриття по кліку на backdrop
backdropEl.addEventListener('click', closeModal);
function closeModal(event) {
  if (event.currentTarget === event.target)
  {return}
  backdropEl.classList.toggle("is-hidden");
}
// Закриття по кнопці
function toggleModal() {
  backdropEl.classList.toggle('is-hidden');
}

const objModal = {};
function openModal(event) {
  //  if (event.target.nodeName !== 'IMG') {
  //    return;
  //  }
  backdropEl.classList.toggle('is-hidden');
  
  creatParamObj();

  renderModal();
}
function creatParamObj() {
  const response = discovery.discoveryModalSerch();
  response.then(results => {
    objModal.info = results.data.info;
    objModal.name = results.data.name;
    objModal.date = results.data.dates.start.localDate;
    objModal.time = results.data.dates.start.localTime;
    objModal.image = results.data.images[1].url;
    objModal.imageBig = results.data.images[2].url;
    objModal.city = results.data._embedded.venues[0].city.name;
    objModal.country = results.data._embedded.venues[0].country.name;
    objModal.location = results.data._embedded.venues[0].name;
    objModal.link = results.data.url;
    objModal.priceMin = results.data.priceRanges;
    if (!objModal.currency) {
      objModal.currency = 'will be avalible soon';
    } else {
      objModal.priceMin = results.data.priceRanges[0].min;
      objModal.priceMax = results.data.priceRanges[0].max;
      objModal.currency = results.data.priceRanges[0].currency;
    }

    if (!objModal.info) {
      objModal.info = 'will be avalible soon';
    }

    console.log(objModal);
    return objModal;
  });
}
console.log(objModal);

async function renderModal() {
  try {
    const response = await discovery.discoveryModalSerch();
    console.log(response);

    modalCardEl.innerHTML = markupModal(objModal);
  } catch (err) {
    console.log(err);
  }
}
