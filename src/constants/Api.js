import axios from 'axios';
export default class Api {
  async getData() {
    try {
      const res = await axios.get('https://jcess.herokuapp.com/api/user');

      const data = res.data;

      // console.log(data, 'the value of the data from the response');

      return data;
    } catch (e) {
      //console.log(e.message);
      throw e;
    }
  }
  async postData(formData) {
    console.log(formData, 'hai hai');
    try {
      const postReq = await axios.post(
        'https://jcess.herokuapp.com/api/user/register',
        formData,
      );
      console.log(postReq, 'khai tah ');
    } catch (e) {
      throw e;
    }
  }
}
