(() => {
    const refs = {
      openModalLi: document.querySelector("[data-modal-open]"),
      closeModalBtn: document.querySelector("[data-modal-close]"),
      modal: document.querySelector("[data-modal]"),
    };
  
    refs.openModalLi.addEventListener("click", toggleModal);
    refs.closeModalBtn.addEventListener("click", toggleModal);
  
    function toggleModal() {
      refs.modal.classList.toggle("is-hidden");
      renderModal();
    }
  })();

const objModal = {};

  import DiscoveryEventsSerch from './discovery-api';

const discovery = new DiscoveryEventsSerch();

const response = discovery.discoveryModalSerch();

response.then(results => {
  objModal.name = results.data.name;
  objModal.date = results.data.dates.start.localDate;
  objModal.time = results.data.dates.start.localTime;
  objModal.image = results.data.images[1].url;
  objModal.imageBig = results.data.images[7].url;
  // objModal.info = 'will be avalible soon';
  // if (!objModal.info) {
  //   objModal.info = 'will be avalible soon';
  // } 
  objModal.info = results.data.info;
  objModal.city = results.data._embedded.venues[0].city.name;
  objModal.country = results.data._embedded.venues[0].country.name;
  objModal.location = results.data._embedded.venues[0].name;
  // if (!objModal.priceMin) {
  //   objModal.priceMin = 'will be avalible soon';
  // }
  objModal.priceMin = results.data.priceRanges[0].min;
  objModal.priceMax = results.data.priceRanges[0].max;
  objModal.currency = results.data.priceRanges[0].currency;
  objModal.link = results.data.url;

// else {
//   objModal.info = results.data.info;
// }
//  else {
//   objModal.priceMin = results.data.priceRanges[0].min;
// }

  console.log(objModal)
  return objModal;
});



const modalEl = document.querySelector('.js-modal-card');
import markupModal from '../templates/modal.hbs';

async function renderModal() {
  try {
    const response = await discovery.discoveryModalSerch() ;
    console.log(response);

    // якщо немає інфо 'will be avalible soon'
    
    modalEl.innerHTML = markupModal(objModal);
  
}

catch (err) {
    console.log(err);
  }
}
// console.log(response.data)
// const abc = Object.values(response.data.page)
// console.log(abc)
// function renderCountry(countries) {
//   countries.languages = Object.values(countries.languages).join(', ');
//   const country = templateCountry(countries);
//   countryInfo.innerHTML = country;