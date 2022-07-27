'use strict';

import { DiscoveryEventsSerch } from './discovery-api';
import markupModal from '../templates/modal.hbs';

const modalEl = document.querySelector('.js-modal-card');

const discoveryEventsSerch = new DiscoveryEventsSerch;

// слухач подій, при кліку на карточку від-ся модал. вікно і рендер

cardEl.addEventListener('click', onCardClick);

async function onCardClick(event) {
    try {
        const response = await DiscoveryEventsSerch.discoveryEventsSerch() ;
        console.log(response);

        // якщо немає інфо 'will be avalible soon'
        
        modalEl.innerHTML = markupModal(response);
    }
    
    catch (err) {
        console.log(err);
      }
}