import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

const makeRequest = async (url) => {
    return axios.get(`${API_URL}${url}`).catch(error => {
        const el = document.getElementById('error');
        const header = document.createElement('h2');
        header.innerText = error.name;
        const text = document.createElement('p');
        text.innerText = error.message;
        text.style.color = 'red';
        el.appendChild(header);
        el.appendChild(text);
        el.style.display = 'block';
    });
};

class ApiService {
    static async getAllPosts () {
        return await makeRequest('/posts');
    }

    static async getPostById (id) {
        return await makeRequest(`/posts/${id}`);
    }

    static async getPostComments (postId) {
        return await makeRequest(`/posts/${postId}/comments`);
    }

    static async getAllComments () {
        return await makeRequest(`/comments`);
    }

    static async getCommentById (id) {
        return await makeRequest(`/comments/${id}`);
    }

    static async getAllUserPosts (userId) {
        return await makeRequest(`/posts/?userId=${userId}`);
    }

    static async getAllUsers () {
        return await makeRequest(`/users`);
    }

    static async getUserById (id) {
        return await makeRequest(`/users/${id}`);
    }

    static async getAllAlbums () {
        return await makeRequest(`/albums`);
    }

    static async getAlbumById (id) {
        return await makeRequest(`/albums/${id}`);
    }

    static async getAllPhotos () {
        return await makeRequest(`/photos`);
    }

    static async getPhotoById (id) {
        return await makeRequest(`/photos/${id}`);
    }

    static async getAllTodos () {
        return await makeRequest(`/todos`);
    }

    static async getTodoById (id) {
        return await makeRequest(`/todos/${id}`);
    }
}

export default ApiService;