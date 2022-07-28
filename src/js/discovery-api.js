import axios from 'axios';

//созаем и экспортируем класс по дефолту
export default class DiscoveryEventsSerch {
  //объявляем приватные переменные
  #BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events.json?';
  #SECOND_URL = 'https://app.ticketmaster.com/discovery/v2/events';
  #API_KEY = 'VpANaFCX5QJo9RhKSicdCJOJBDASVgJi';
  //создаем конструктор и обьявляем перемменные
  constructor() {
    this.searchQuery = '';
    this.searchQueryCountry = '';
    this.page = 1;
    this.size = 16;
    this.serchId = '';
    // this.totalHits = null;
  }

  //создаем метод (делаем его асинхронным), с помощью которого будем делать запросы на сервер
  async discoveryEventsSerch() {
    //с помощью бибиотеки axios, делаем запрос, в котором 2-м аргументом прокидываем параметры запроса
    const request = await axios.get(`${this.#BASE_URL}`, {
      params: {
        apikey: this.#API_KEY,
        keyword: this.searchQuery,
        countryCode: this.searchQueryCountry,
        size: this.size,
      },
    });
    return request;
  }
  // ф-я для модалки
  async discoveryModalSerch() {
    
    const request = await axios.get(`${this.#SECOND_URL}/k7vGF9anxhJp5`, {
      params: {
        apikey: this.#API_KEY,
        attractionId: this.serchId,
      },
    });
    return request;
  }
  //создаем метод увелчения страниц на 1
  incrementPage() {
    this.page += 1;
  }
  //метод сброса страниц
  resetPage() {
    this.page = 1;
  }
  //создаем метод для проверки, когда все картинки загрузились
  //тек.кол.страниц * кол.стр.при выводе <= общ.кол.стр.
  isNextDataExsist() {
    return this.page * this.dataPerPage <= this.totalHits;
  }
  //геттер и сеттер нужного значения query
  get query() {
    return this.searchQuery;
  }
  set query(newquery) {
    this.searchQuery = newquery;
  }
  get queryCountry() {
    return this.searchQueryCountry;
  }
  set queryCountry(newQueryCountry) {
    this.searchQueryCountry = newQueryCountry;
  }

  // get id() {
  //   return this.serchId;
  // }

  // set id(newId) {
  //   this.serchId = newId;
  // }
}
