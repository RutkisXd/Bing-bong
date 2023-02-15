const pageWrapper = document.querySelector('#page-content');

async function getAlbum() {
  const albumRes = await fetch(`https://jsonplaceholder.typicode.com/albums/5?_expand=user&_expand=userId&_embed=photos`);
  const album = await albumRes.json();

  const albumTitle = document.createElement('h4');
  albumTitle.textContent = album.title;

  const authorLink = document.createElement('a');
  authorLink.textContent = `Author: ${album.user.name}`;
  authorLink.href = `./author.html?id=${album.user.id}`;

  const photosWrapper = document.createElement('div');
  photosWrapper.classList.add('my-gallery');

  album.photos.forEach(photo => {
    const photoLink = document.createElement('a');
    photoLink.href = photo.url;
    photoLink.title = photo.title;

    const photoImg = document.createElement('img');
    photoImg.src = photo.thumbnailUrl;

    photoLink.appendChild(photoImg);
    photosWrapper.appendChild(photoLink);
  });

  pageWrapper.append(albumTitle, authorLink, photosWrapper);

  const gallery = new PhotoSwipe(document.querySelector('.my-gallery'), PhotoSwipeUI_Default, album.photos, {
    index: 0,
    bgOpacity: 0.9,
    history: false,
    showHideOpacity: true
  });
  gallery.init();
}

getAlbum();
