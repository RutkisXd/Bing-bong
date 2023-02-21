const optionArray = ['posts', 'albums', 'authors'];

let hasSearched = false;

async function searchResults() {
  if (hasSearched) {
    return;
  }

  const pageWrapper = document.querySelector('#page-content');
  const searchWrapper = document.querySelector('.search-wrapper');

  pageWrapper.appendChild(searchWrapper);

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

function createDetailedSearch() {
  const searchWrapper = document.createElement('div');
  searchWrapper.classList.add('search-wrapper');

  const searchForm = document.createElement('form');
  searchForm.classList.add('search-form');
  searchWrapper.appendChild(searchForm);

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.name = 'q';
  searchInput.classList.add('search-input');

  searchForm.append(searchInput)

  const selectElement = createOptionElement(optionArray);

  searchForm.appendChild(selectElement);

  const searchButton = document.createElement('button');
  searchButton.type = 'submit';
  searchButton.textContent = 'Search';
  searchButton.classList.add('search-button');
  searchForm.appendChild(searchButton);

  return searchWrapper;
}

async function renderSearchResults() {
  const pageWrapper = document.querySelector('#page-content');
  const categoryElement = document.querySelector('.select-element');

  const searchWrapper = createDetailedSearch();
  pageWrapper.appendChild(searchWrapper);

  const searchResultsContainer = document.createElement('div');
  searchResultsContainer.classList.add('search-results-container');
  searchWrapper.appendChild(searchResultsContainer);

  const params = new URLSearchParams(window.location.search);
  const searchTerm = params.get('q');

  const categoryValue = categoryElement.value;

  if (categoryValue === 'authors') {
    const userResults = await fetch(`https://jsonplaceholder.typicode.com/users?q=${searchTerm}`);
    const userResultsJson = await userResults.json();

    const userResultList = document.createElement('ul');
    userResultList.classList.add('user-result-list');

    const userResultHeader = document.createElement('h4');
    userResultHeader.textContent = 'Users results:';
    userResultHeader.classList.add('user-results-header');

    userResultList.append(userResultHeader);

    for (const result of userResultsJson) {
      const resultItem = document.createElement('li');
      resultItem.classList.add('result-item');

      const resultLink = document.createElement('a');
      resultLink.textContent = `${result.name}`;
      resultLink.href = `./user.html?user-id=${result.id}`;

      resultItem.append(resultLink);
      userResultList.append(resultItem);
    }

    searchResultsContainer.appendChild(userResultList);

  } else if (categoryValue === 'posts') {
    const postResults = await fetch(`https://jsonplaceholder.typicode.com/posts?q=${searchTerm}&_expand=user`);
    const postResultsJson = await postResults.json();

    const postResultList = document.createElement('ul');
    postResultList.classList.add('post-result-list');

    const postResultHeader = document.createElement('h4');
    postResultHeader.textContent = 'Posts results:';
    postResultHeader.classList.add('post-results-header');

    postResultList.append(postResultHeader);

    for (const result of postResultsJson) {
      const resultItem = document.createElement('li');
      resultItem.classList.add('result-item');

      const resultLink = document.createElement('a');
      resultLink.textContent = `${result.title}`;
      resultLink.href = `./post.html?post-id=${result.id}`;

      const resultAuthorLink = document.createElement('a');
      resultAuthorLink.textContent = `${result.user.name}`
      resultAuthorLink.href = `./user.html?user-id=${result.user.id}`

      resultItem.append(resultLink, ' - Written by: ', resultAuthorLink);
      postResultList.append(resultItem);
    }

    searchResultsContainer.appendChild(postResultList);
  
  } else if (categoryValue === 'albums') {
  
    const albumResults = await fetch(
      `https://jsonplaceholder.typicode.com/albums?q=${searchTerm}&_expand=user`
    );
    const albumResultsJson = await albumResults.json();
  
    const albumResultList = document.createElement('ul');
    albumResultList.classList.add('album-result-list');
  
    const albumResultHeader = document.createElement('h4');
    albumResultHeader.textContent = 'Albums results:';
    albumResultHeader.classList.add('album-results-header');
  
    albumResultList.append(albumResultHeader);
  
    for (const result of albumResultsJson) {
      const resultItem = document.createElement('li');
      resultItem.classList.add('result-item');
  
      const resultLink = document.createElement('a');
      resultLink.textContent = `${result.title}`;
      resultLink.href = `./album.html?album-id=${result.id}`;
  
      const resultAuthorLink = document.createElement('a');
      resultAuthorLink.textContent = `${result.user.name}`;
      resultAuthorLink.href = `./user.html?user-id=${result.userId}`;
  
      resultItem.append(resultLink, ' - Created by: ', resultAuthorLink);
      albumResultList.append(resultItem);
    }
  
    searchResultsContainer.appendChild(albumResultList);
  }
  
  // handle the search results
  const searchResults = document.createElement('div');
  searchResults.classList.add('search-results');
  
  if (userResultsJson.length === 0 && postResultsJson.length === 0 && albumResultsJson.length === 0) {
    const noResults = document.createElement('p');
    noResults.textContent = 'No results found for your search.';
    searchResults.append(noResults);
  } else {
    // create a list of search results
    if (userResultsJson.length > 0) {
      searchResults.append(userResultList);
    }
  
    if (postResultsJson.length > 0) {
      searchResults.append(postResultList);
    }
  
    if (albumResultsJson.length > 0) {
      searchResults.append(albumResultList);
    }
  }
  
  // append the search results to the DOM
  pageWrapper.append(searchResults);
}    
