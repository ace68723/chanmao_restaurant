'use strict';
// const TestServer = 'http://cmtest.littlesailing.com/index.php?r=';
const proructServer = 'https://www.chanmao.ca/index.php?r=rrclient/';
const Server = proructServer;
const APIConstants ={

    //CreateOrder
    API_AREACHECK: Server + 'areacheck',
    API_ORDERSUBMIT: Server + 'ordersubmit',

    //Login
    API_LOGIN: Server + 'login',
    API_AUTH: Server + 'authorize',

    //Home
    API_ORDERHANDLE: Server + 'handle',

    //OrderDetail
    API_GET_ORDER_DETAIL: Server + 'orderdetail',
    API_HANDLE_ORDER: Server + 'handle',

    //PaymentHistory
    API_GET_BILLING: Server + 'billing',
    API_GET_SUMMARY: Server + 'summary',

    //Google
    GOOGLE_API_KEY: 'AIzaSyDpms3QxNnZNxDq5aqkalcRkYn16Kfqix8',
}
module.exports = APIConstants;
