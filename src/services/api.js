const axios = require('axios').default;


// const baseURL = 'http://localhost:8080/api/auth';
const baseURL = 'http://192.168.1.4:8080/api/auth';

const api = axios.create({
  baseURL,
  timeout: 5000,
});
const headers = {
    'Content-Type': 'application/json'
  }
const customAxios = {
  get: async (url, params = {}) => {
    try {
      const response = await api.get(url, { params });
      return response.data;
    } catch (error) {
    //   if (!error.response) {
    //     throw new Error('Internet connection error'); // No response means there's no internet connection
    //   }
      throw error; // Other errors (e.g., server errors) are rethrown
    }
  },

  post: async (url, data = {}) => {
    console.log(`url ${baseURL}${url}  ${data.username} ${data.email} ${data.password}`);
    try {
      const response = await api.post(url, {
        username:data.username,
        email:data.email,
        password:data.password
      });
    //   console.log("Ressss",response);
      return response;
    } catch (error) {
    //   if (!error.response) {
    //     throw new Error('Internet connection error');
    //   }
    console.log("post catch",error.message);
      throw error;
    }
  },
  addUserpost: async (url, data = {}) => {
    console.log(`url ${baseURL}${url}  ${data.username} ${data.email} ${data.phone}`);
    try {
      const response = await api.post(url, {
        username:data.username,
        email:data.email,
        phone:data.phone,
        time:data.time,
        lastModified:data.lastModified
      });
    //   console.log("Ressss",response);
      return response;
    } catch (error) {
    //   if (!error.response) {
    //     throw new Error('Internet connection error');
    //   }
    console.log("post catch",error.message);
      throw error;
    }
  },

  put: async (url, data = {}) => {
    try {
      const response = await api.put(url, data);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw new Error('Internet connection error');
      }
      throw error;
    }
  },

  delete: async (url) => {
    try {
      const response = await api.delete(url);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw new Error('Internet connection error');
      }
      throw error;
    }
  },
};

module.exports = customAxios;
