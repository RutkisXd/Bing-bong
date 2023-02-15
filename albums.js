async function getAlbums() {
  const res = await fetch('https://jsonplaceholder.typicode.com/albums?_expand=user&_embed=photos&_limit=30')
  const albums = await res.json()

  const pageWrapper = document.querySelector('#page-content')

  const albumsList = document.createElement('div')
  albumsList.classList.add('albums-list')

  for (const album of albums) {
    const title = album.title
    const name = album.user.name
    const photosCount = album.photos.length
    const randomIndex = Math.floor(Math.random() * album.photos.length)
    const randomPhoto = album.photos[randomIndex]
    const randomPhotoUrl = randomPhoto.url
    const randomPhotoTitle = randomPhoto.title

    const albumItem = document.createElement('div')
    albumItem.classList.add('album-item')

    const albumItemLink = document.createElement('a')
    albumItemLink.href = `./album.html?album-id=${album.id}`

    const photoElement = document.createElement('img')
    photoElement.src = randomPhotoUrl;
    photoElement.title = randomPhotoTitle

    const albumTitle = document.createElement('h2')
    albumTitle.textContent = `${title} (${photosCount}), author: ${name}`

    albumItemLink.append(photoElement, albumTitle)
    albumItem.append(albumItemLink)
    albumsList.append(albumItem)
  }

  pageWrapper.append(albumsList)
}

getAlbums();
