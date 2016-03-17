var moment = require('moment');

var date = new Date(1458154800000);
console.log(`Vanilla JS date: ${date}`);

var momentDate = moment(1458154800000).format();
console.log(`Moment date: ${momentDate}`);

var formatted = moment(1458154800000).format('dddd, MMMM Do YYYY, h:mm:ss a');
console.log(`Moment presentable date and time: ${formatted}`);
