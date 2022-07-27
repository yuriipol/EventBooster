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
  objModal.image = results.data.images[6];
  objModal.info = 'will be avalible soon';

  //  objModal = {
  //   name: results.data.name,
  //   date: results.data.dates.start.localDate,
  //   time: results.data.dates.start.localTime,
  //   image: results.data.images[6],
  //   info: 'will be avalible soon',

  // }
  console.log(objModal)
  return objModal;
  //  results.data._embedded.events
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