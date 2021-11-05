import axios from 'axios';

export default class Query {
  static async getData({ ...param }) {
    const response = await axios.get(
      'http://localhost/react_klockis_backend/readData_GET.php',
      {
        params: param,
      }
    );
    return response;
  }

  static async updData({ ...param }) {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost/react_klockis_backend/updateData_POST.php',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: param,
    });
    return response;
  }

  static async delData({ ...param }) {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost/react_klockis_backend/deleteData_POST.php',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: param,
    });
    return response;
  }

  static async addData({ ...param }) {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost/react_klockis_backend/createData_POST.php',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: param,
    });
    return response;
  }
}
