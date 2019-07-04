import('../styles/index.scss');
import('../images/logo.png');
import ApiService from '../js/apiService';

(function () {
    const main = document.getElementById('content');

    const getPost = async () => {
        const response = await ApiService.getPostById(1);

        if (response.data) {
            const { title, body } = response.data;
            const header = document.createElement('h1');
            const p = document.createElement('p');
            header.innerText = title;
            main.appendChild(header);
            p.innerText = body;
            main.appendChild(p);
        }
    };

    getPost();
})();