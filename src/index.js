import DiscoveryEventsSerch from './js/discovery-api';

const discovery = new DiscoveryEventsSerch();

const response = discovery.discoveryEventsSerch();

response.then(results => console.log(results.data._embedded.events));
