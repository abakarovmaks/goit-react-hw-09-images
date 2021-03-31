const KEY = '19178590-f2f628b09a5664f3e2bf6a47d';
const BASE_URL = 'https://pixabay.com/api/';

async function fetchImages(searchQuery, page) {
  const url = `${BASE_URL}?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  return getData(url).then((response) => {
    return response;
  });
}

async function getData(url) {
  const images = await fetch(url);
  const response = await images.json();
  return response;
}

const api = {
  fetchImages,
};

export default api;
