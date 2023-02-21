export const navigationArr = [
  {
    name: 'Home',
    src: './index.html',
  },
  {
    name: 'Users',
    src: './users.html',
  },
  {
    name: 'Posts',
    src: './posts.html',
  },
  {
    name: 'Albums',
    src: './albums.html',
  },
];


export function createNavigation() {
const navigationList = document.createElement('ul');
navigationList.classList.add('navigation-list');

navigationArr.forEach((item) => {
  const listItem = document.createElement('li');
  listItem.classList.add('navigation-item');

  const link = document.createElement('a');
  link.textContent = item.name;
  link.href = item.src;
  link.classList.add('navigation-link');

  listItem.appendChild(link);
  navigationList.appendChild(listItem);
});

const navigationWrapper = document.createElement('div');
navigationWrapper.classList.add('navigation-wrapper');
navigationWrapper.appendChild(navigationList);

return navigationWrapper;
}

export function createSearch() {
  const searchWrapper = document.createElement('div');
  searchWrapper.classList.add('search-wrapper');

  const searchForm = document.createElement('form');
  searchForm.classList.add('search-form');

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.name = 'q';
  searchInput.classList.add('search-input');
  searchForm.appendChild(searchInput);

  const searchButton = document.createElement('button');
  searchButton.type = 'submit';
  searchButton.textContent = 'Search';
  searchButton.classList.add('search-button');
  searchForm.appendChild(searchButton);

  searchWrapper.appendChild(searchForm);

return searchWrapper;
}

export function renderNavigationAndSearch() {
  const pageContent = document.querySelector('#page-content');

  const navigation = createNavigation();
  const search = createSearch();

  const navigationAndSearchWrapper = document.createElement('div');
  navigationAndSearchWrapper.classList.add('navigation-and-search-wrapper');

  navigationAndSearchWrapper.append(navigation, search);
  pageContent.append(navigationAndSearchWrapper);

  const searchForm = search.querySelector('.search-form');
  const searchInput = search.querySelector('.search-input');

  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchTerm = searchInput.value;
    window.location.href = `./search.html?q=${searchTerm}`;

    searchForm.remove()
    searchInput.remove()
  });
}

renderNavigationAndSearch();
