import axios from 'axios';

export default class Query {
    static async getData({...param}) {
        const response = await axios.get(
            `http://localhost:5000/KLOCKIS/${param.query}`,
            {
                params: param,
            }
        )
        return response.data?.recordset;
    }

    static async updData({...param}) {
        const response = await axios({
            method: 'POST',
            url: 'http://localhost/react_klockis_backend/updateData_POST.php',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: param,
        });
        return response;
    }

    static async delData({...param}) {
        const response = await axios({
            method: 'POST',
            url: 'http://localhost/react_klockis_backend/deleteData_POST.php',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: param,
        });
        return response;
    }

    static async addData({...param}) {
        const response = await axios({
            method: 'POST',
            url: 'http://localhost/react_klockis_backend/createData_POST.php',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: param,
        });
        return response;
    }
}
