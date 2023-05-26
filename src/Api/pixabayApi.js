import axios from "axios";

class PixabayApi {
  static BASE_URL = 'https://pixabay.com/api/';
  static MY_KEY = '35701954-d3f8d7cc947bf41ee0f7da05c';

  per_page = 12;

  getImages(findName, page) {
    const options = {
      params: {
        q: findName,
        key: PixabayApi.MY_KEY,
        page: page,
        per_page: this.per_page,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      }
    }

    return axios.get(`${PixabayApi.BASE_URL}?`, options);
  }
}

export default PixabayApi;