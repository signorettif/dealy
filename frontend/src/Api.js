import {API_ROUTE} from './config/globals';
import axios from 'axios';


/**
 * This is the main point of interaction with Laravel
 */
class Api {


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