import {API_ROUTE} from './config/globals';
import axios from 'axios';


/**
 * This is the main point of interaction with Laravel
 */
class Api {

    static getAllOffers() {
        axios.get(API_ROUTE+'/offers')
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
        console.log(error);
        });
    }

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