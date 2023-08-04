import imagePing from 'tui-pagination';
import { pagination } from './pagination';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '37518101-4c8b383dea2a151ad4bc810e7';
const list = document.querySelector('.list');
const page = pagination.getCurrentPage();
const form = document.querySelector(".form");
let query = '';
form.addEventListener('submit', onFormSubmit)
const backDrop = document.querySelector(".backdrop");
const modal = document.querySelector(".modal");

list.addEventListener('click', onElementClick)
backDrop.addEventListener('click', () => {
    backDrop.classList.add("is-hidden");
    
})
function onElementClick(e) {
    backDrop.classList.remove("is-hidden")
    const id = e.target.id;
    console.log(id)
    getEventById(id)
}

function onFormSubmit(event) {
    event.preventDefault();
    list.innerHTML = '';
    query = event.target.elements.searchQuery.value;
    getFirstPageEvents(page, query);
    
}

function fetchDataId(id) {
     return fetch(${BASE_URL}?q=cat&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12).then(
    resp => {
      console.log(resp);
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    }
  );
} 


function fetchData(page, query) {
  return fetch(${BASE_URL}events.json?apikey=${API_KEY}&page=${page}&keyword=${query}).then(
    resp => {
      console.log(resp);
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    }
  );
}

function renderEventsById(data) {
    console.log(data)
const markup = ` <img src=" ${data[0].images[0].url}" alt=""  width="300" height="300" />
<p> ${data[0].name}</p>
<p> ${data[0].info}</p> `
    modal.innerHTML = markup;
}

function getEventById(id) {
    fetchDataId(id).then((data) => {
        console.log(data);
        renderEventsById(data._embedded.events)
    }).catch(error => console.log(error))
}


function renderEvents(data) {
  const markup = data
    .map(({ id, name }) => <li id="${id}"><p id="${id}">${name}</p></li>)
    .join('');
  list.innerHTML = markup;
}

function getFirstPageEvents(page, query) {
  fetchData(page, query)
      .then(data => {
          if (!data.page.totalElements) {
              alert('нічого не знайдено')
          }
      console.log(data._embedded);
      console.log(data.page);
      pagination.reset(data.page.totalElements);
      renderEvents(data._embedded.events);
    })
    .catch(err => console.log('Error'));
}

getFirstPageEvents(page,query);

function getEvents(page,query) {
  fetchData(page,query)
    .then(data => {
      // console.log(data._embedded);
      // console.log(data.page);
      renderEvents(data._embedded.events);
    })
    .catch(err => console.log('Error'));
}

pagination.on('afterMove', event => {
  const currentPage = event.page;
  console.log(currentPage);
  getEvents(currentPage, query);
});