const usersUrl = 'https://jsonplaceholder.typicode.com/users';
const postsUrl = 'https://jsonplaceholder.typicode.com/posts?_expand=user';
const albumsUrl = 'https://jsonplaceholder.typicode.com/albums?_expand=user';

async function getRandomData(url, size) {
  const response = await fetch(url);
  const data = await response.json();
  const sample = [];
  while (sample.length < size) {
    const randomItem = data[Math.floor(Math.random() * data.length)];
    if (!sample.includes(randomItem)) {
      sample.push(randomItem);
    }
  }
  return sample;
}

async function generateIndexPage() {
  const users = await getRandomData(usersUrl, 5);
  const posts = await getRandomData(postsUrl, 5);
  const albums = await getRandomData(albumsUrl, 5);

  const pageContent = document.querySelector('#page-content');

  // Add Home heading
  const homeHeader = document.createElement('h2');
  homeHeader.textContent = 'Home';
  pageContent.appendChild(homeHeader);

  // Add Users section
  const usersWrapper = document.createElement('div')
  usersWrapper.classList.add('users-wrapper')
  const usersHeading = document.createElement('h4');
  usersHeading.textContent = '5 new authors';
  usersWrapper.appendChild(usersHeading);
  pageContent.append(usersWrapper)

  const usersList = document.createElement('ul');
  users.forEach(user => {
    const userItem = document.createElement('li');
    const userLink = document.createElement('a');
    userLink.textContent = `${user.name} (${user.email})`;
    userLink.href = `./user.html?user-id=${user.id}`;
    userItem.appendChild(userLink);
    usersList.appendChild(userItem);
  });
  usersWrapper.appendChild(usersList);

  // Add Posts section
  const postsWrapper = document.createElement('div')
  postsWrapper.classList.add('posts-wrapper')
  const postsHeading = document.createElement('h4');
  postsHeading.textContent = '5 new posts';
  postsWrapper.appendChild(postsHeading);

  const postsList = document.createElement('ul');
  posts.forEach(post => {
    const postItem = document.createElement('li');
    const postLink = document.createElement('a');
    postLink.textContent = `${post.title} by ${post.user.name}`;
    postLink.href = `./post.html?post-id=${post.id}`;
    postItem.appendChild(postLink);
    postsList.appendChild(postItem);
  });
  postsWrapper.appendChild(postsList);
  pageContent.append(postsWrapper)

  // Add Albums section
  const albumsWrapper = document.createElement('div')
  albumsWrapper.classList.add('albums-wrapper')
  const albumsHeading = document.createElement('h4');
  albumsHeading.textContent = '5 new albums';
  albumsWrapper.appendChild(albumsHeading);

  const albumsList = document.createElement('ul');
  albums.forEach(album => {
    const albumItem = document.createElement('li');
    const albumLink = document.createElement('a');
    albumLink.textContent = `${album.title} by ${album.user.name}`;
    albumLink.href = `./album.html?album-id=${album.id}`;
    albumItem.appendChild(albumLink);
    albumsList.appendChild(albumItem);
  });
  albumsWrapper.appendChild(albumsList);
  pageContent.append(albumsWrapper)
}

generateIndexPage();
