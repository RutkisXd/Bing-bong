import { renderNavigationAndSearch } from './navigation.js';

const optionArray = ['posts', 'albums', 'authors'];

let hasSearched = false;

async function init() {
  const pageWrapper = document.querySelector('#page-content');
  const navigation = renderNavigationAndSearch();
  pageWrapper.before(navigation);

  if (!hasSearched) {
    await searchResults();
  } else {
    console.log()
    return
  }

  createDetailedSearch(optionArray)
  renderSearchResults();
}

async function searchResults() {
  const pageWrapper = document.querySelector('#page-content');

  const params = new URLSearchParams(window.location.search);
  const searchTerm = params.get('q');

  const userResults = await fetch(`https://jsonplaceholder.typicode.com/users?q=${searchTerm}`).then(res => res.json());
  const postResults = await fetch(`https://jsonplaceholder.typicode.com/posts?q=${searchTerm}&_expand=user`).then(res => res.json());

  const searchResults = document.createElement('div');
  searchResults.classList.add('search-results');

  if (userResults.length === 0 && postResults.length === 0) {
    const noResults = document.createElement('p');
    noResults.textContent = 'No results found for your search.';
    searchResults.appendChild(noResults);
  } else {
    const userResultList = document.createElement('ul');
    userResultList.classList.add('user-result-list');
    const postResultList = document.createElement('ul');
    postResultList.classList.add('post-result-list');

    const userResultHeader = document.createElement('h4');
    userResultHeader.textContent = 'Users results:';
    userResultHeader.classList.add('user-results-header');

    const postResultHeader = document.createElement('h4');
    postResultHeader.textContent = 'Posts results:';
    postResultHeader.classList.add('post-results-header');

    userResultList.appendChild(userResultHeader);
    postResultList.appendChild(postResultHeader);

    for (const result of userResults) {
      const resultItem = document.createElement('li');
      resultItem.classList.add('result-item');

      const resultLink = document.createElement('a');
      resultLink.textContent = `${result.name}`;
      resultLink.href = `./user.html?user-id=${result.id}`;

      resultItem.appendChild(resultLink);
      userResultList.appendChild(resultItem);
    }

    for (const result of postResults) {
      const resultItem = document.createElement('li');
      resultItem.classList.add('result-item');

      const resultLink = document.createElement('a');
      resultLink.textContent = `${result.title}`;
      resultLink.href = `./post.html?post-id=${result.id}`;

      const resultAuthorLink = document.createElement('a');
      resultAuthorLink.textContent = `${result.user.name}`;
      resultAuthorLink.href = `./user.html?user-id=${result.user.id}`;

      resultItem.appendChild(resultLink);
      resultItem.appendChild(document.createTextNode(' - Written by: '));
      resultItem.appendChild(resultAuthorLink);

      postResultList.appendChild(resultItem);
    }

    searchResults.appendChild(userResultList);
    searchResults.appendChild(postResultList);
  }

  const searchWrapper = document.querySelector('.search-wrapper');
  if (searchWrapper) {
    searchWrapper.remove();
  }

  pageWrapper.appendChild(searchResults);

  hasSearched = true;
}

function createOptionElement(arr) {
  const selectElement = document.createElement('select');
  selectElement.classList.add('select-element');

  arr.forEach(item => {
    const optionElement = document.createElement('option');
    optionElement.classList.add('option-element');
    const optionText = item.charAt(0).toUpperCase() + item.slice(1);
    optionElement.textContent = optionText;
    selectElement.appendChild(optionElement);
  });

  return selectElement;
}


function createDetailedSearch(optionArray) {
  const searchWrapper = document.createElement('div');
  searchWrapper.classList.add('search-wrapper');

  const searchForm = document.createElement('form');
  searchForm.classList.add('search-form');
  searchWrapper.appendChild(searchForm);

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.name = 'q';
  searchInput.classList.add('search-input');

  searchForm.append(searchInput);

  const selectElement = createOptionElement(optionArray);
  selectElement.classList.add('select-element');

  searchForm.appendChild(selectElement);

  const searchButton = document.createElement('button');
  searchButton.type = 'submit';
  searchButton.textContent = 'Search';
  searchButton.classList.add('search-button');
  searchForm.appendChild(searchButton);

  return searchWrapper;
}

function renderSearchResults(searchResults) {
  const resultsContainer = document.querySelector('#results-container');
  resultsContainer.innerHTML = '';
  
  if (searchResults.length > 0) {
    const resultList = document.createElement('ul');
    resultList.classList.add('results-list');

    searchResults.forEach(result => {
      const resultItem = document.createElement('li');
      resultItem.classList.add('result-item');

      const resultLink = document.createElement('a');
      resultLink.classList.add('result-link');
      resultLink.href = result.url;
      resultLink.textContent = result.title;

      resultItem.appendChild(resultLink);
      resultList.appendChild(resultItem);
    });

    resultsContainer.appendChild(resultList);

    const optionsList = document.createElement('ul');
    optionsList.classList.add('options-list');

    optionArray.forEach(option => {
      const optionItem = document.createElement('li');
      optionItem.classList.add('option-item');

      const optionLink = document.createElement('a');
      optionLink.classList.add('option-link');
      optionLink.href = option.url;
      optionLink.textContent = option.title;

      optionItem.appendChild(optionLink);
      optionsList.appendChild(optionItem);
    });

    resultsContainer.appendChild(optionsList);
  } else {
    const noResults = document.createElement('p');
    noResults.textContent = 'No results found.';
    resultsContainer.appendChild(noResults);
  }
}


init()


