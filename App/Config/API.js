'use strict';
// const TestServer = 'http://cmtest.littlesailing.com/index.php?r=';
// const proructServer = 'https://www.chanmao.ca/index.php?r=rrclient/';
const proructServer ='https://www.cmapi.ca/cm_backend/index.php/api/restaurant/v1/';
const qaServer = 'https://www.cmapi.ca/cm_qa_lumen/backend/index.php/api/restaurant/v1/';
const Server = proructServer;
const APIConstants ={

    //CreateOrder
    // API_AREACHECK: Server + 'areacheck',
    // API_ORDERSUBMIT: Server + 'ordersubmit',

    //Login
    API_LOGIN: Server + 'rr_login',
    API_AUTH: Server + 'auth',

    //Home
    API_ORDERHANDLE: Server + 'handle_order',
    API_FETCHORDER: Server + 'fetch_order',
    //OrderDetail
    API_GET_ORDER_DETAIL: Server + 'order_detail',
    API_HANDLE_ORDER: Server + 'handle_order',

    //PaymentHistory
    API_GET_BILLING: Server + 'get_billing',
    API_GET_SUMMARY: Server + 'get_summary',

    //Google
    GOOGLE_API_KEY: 'AIzaSyDpms3QxNnZNxDq5aqkalcRkYn16Kfqix8',
}
module.exports = APIConstants;
