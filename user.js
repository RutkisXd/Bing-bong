const pageWrapper = document.querySelector('#page-content')

async function userProfile() {
  const querryParams = location.search
  const urlParams = new URLSearchParams(querryParams)
  const userId = urlParams.get('user-id')

  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
  const profile = await res.json()

  const profileWrapper = document.createElement('div')
  profileWrapper.classList.add('profile-wrapper')


  const profileFullName = document.createElement('div')
  profileFullName.textContent = profile.name

  const profileUsername = document.createElement('div')
  profileUsername.textContent = profile.username

  const profileEmail = document.createElement('div')
  profileEmail.textContent = profile.email

  const addressWrapper = document.createElement('div')
  addressWrapper.classList.add('address-wrapper')

  const addressStreet = document.createElement('div')
  addressStreet.textContent = profile.address.street

  const addressSuite = document.createElement('div')
  addressSuite.textContent = profile.address.suite

  const addressCity = document.createElement('div')
  addressCity.textContent = profile.address.city 

  const addressZipcode = document.createElement('div')
  addressZipcode.textContent = profile.address.zipcode

  addressWrapper.append(addressStreet, addressSuite, addressCity, addressZipcode)

  const profilePhone = document.createElement('div')
  profilePhone.textContent = profile.phone

  const profileWebsite = document.createElement('div')
  profileWebsite.textContent = profile.website 

  const companyWrapper = document.createElement('div')
  companyWrapper.classList.add('company-wrapper')

  const companyStreet = document.createElement('div')
  companyStreet.textContent = profile.company.name

  const companySuite = document.createElement('div')
  companySuite.textContent = profile.company.catchPhrase

  const companyCity = document.createElement('div')
  companyCity.textContent = profile.company.bs 

  companyWrapper.append(companyStreet, companySuite, companyCity)
  profileWrapper.append(profileFullName, profileUsername, profileEmail, profilePhone, addressWrapper, profileWebsite, companyWrapper)

  pageWrapper.append(profileWrapper)
}

async function getUserPosts() {
  const querryParams = location.search
  const urlParams = new URLSearchParams(querryParams)
  const userId = urlParams.get('user-id')
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
  const posts = await res.json()

  const postList = document.createElement('ul')
  postList.classList.add('posts-list')

  pageWrapper.after(postList)

  for (const post of posts) {
    const postId = post.id
    const postTitle = post.title

    const postItem = document.createElement('li')
    postItem.classList.add('post-item')
    postItem.innerHTML = `
      <a href="./post.html?post-id=${postId}">${postTitle}</a>
    `

    postList.append(postItem)
  }
}


async function getUserAlbums() {
const querryParams = location.search
const urlParams = new URLSearchParams(querryParams)
const userId = urlParams.get('user-id')
  const res = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
  const albums = await res.json()

  const albumList = document.createElement('ul')
  albumList.classList.add('albums-list')

  pageWrapper.after(albumList)

  for (const album of albums) {
    const albumId = album.id
    const albumTitle = album.title

    const albumItem = document.createElement('li')
    albumItem.classList.add('album-item')
    albumItem.innerHTML = `
      <a href="./album.html?album-id=${albumId}">${albumTitle}</a>
    `

    albumList.append(albumItem)
  }
}


userProfile()
getUserPosts()
getUserAlbums()

