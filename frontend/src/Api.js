import {API_ROUTE} from './config/globals';
import axios from 'axios';
import Store from './Store';


/**
 * This is the main point of interaction with Laravel
 */
class Api {

    // Helper functions
    static dataToFormdata(data) {
        let formData = new FormData();
        for (let key of Object.keys(data)) {
          formData.append(key, data[key]);
        }
        return formData;
      }

    // Common response handling
  
    static handleResponse(response) {
        if (response.status === 401) {
            console.log('User login expired');
            Store.setUser(null);
        }
        return response.data
    }

    static handleError(error) {
        console.log(error);
    }

  // User API

    static userAuthenticate(data) {

        return axios.post(API_ROUTE+'/login', this.dataToFormdata(data))
            .then(function (response) {
                return this.handleResponse(response);
            }.bind(this))
            .catch(function (error) {
                this.handleError(error);;
            }.bind(this));
    }

    static userRegister(data) {
        return axios.post(API_ROUTE+'/createUser', this.dataToFormdata(data))
            .then(function (response) {
                return this.handleResponse(response);
            }.bind(this))
            .catch(function (error) {
                this.handleError(error);;
            }.bind(this));
    }


    //GET Offers APIs
    static getAllOffers() {
        return axios.get(API_ROUTE+'/offers')
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    static getOfferById(id) {
        return axios.get(API_ROUTE+'/offers/'+id)
        .then(function (response) {
            // console.log(response.data)
            return response.data
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    static getPaginatedOffers(itemsPerPage, page) {
        return axios.get(API_ROUTE+'/paginatedOffers/'+itemsPerPage+'?page='+page)
        .then(function (response) {
            // console.log(response.data);
            return response.data
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    static getLastDayOffers(orderBy){
        return axios.get(API_ROUTE+'/lastOffers?orderBy='+orderBy)
        .then(function (response) {
            // console.log(response.data);
            return response.data
        })
        .catch(function (error) {
        console.log(error);
        });
    }


    //POST Offers APIs
    static postOffer(offer) {
        axios.post(API_ROUTE+'/offers', offer)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }



}

export default Api;