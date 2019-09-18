let ejs = require('ejs'),
    arr = ['geddy', 'neil', 'alex'],
    html = ejs.render('<div><%= people.join(", "); %></div>', {people: arr});
    console.log(html);