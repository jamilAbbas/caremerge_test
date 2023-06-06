const axios = require('axios');
const async = require('async');

exports.getTitleTags = async (req, res) => {
    try {
        const addresses = req.query.address;
        let siteslist = [];
        if (addresses.length === 0)
            return res.status(400).send('Please provide valid addresses.');

        if (typeof addresses === 'object')
            siteslist = Object.values(addresses);
        else siteslist.push(addresses);
        const titleTags = [];
        for (item of siteslist) {
            const response = await axios.get(item);
            const titleTag = response.data.match(/<title>(.*?)<\/title>/i);
            const title = titleTag ? titleTag[1] : 'No Title Found';
            titleTags.push(title);
        }
        const li = titleTags.map(title => `<li>${title}</li>\n`).join('');
        const html = renderHTML(li);
        res.send(html);
    } catch (error) {
        handleError(error)
    }
};

exports.getTitleTagsUsingAsyncFlowLib = async (req, res) => {
    try {
        const addresses = req.query.address;
        let siteslist = [];

        if (addresses.length === 0)
            return res.status(400).send('Please provide valid addresses.');

        if (typeof addresses === 'object')
            siteslist = Object.values(addresses);
        else
            siteslist.push(addresses);


        const titleTags = await async.map(siteslist, async (item) => {
            const response = await axios.get(item);
            const titleTag = response.data.match(/<title>(.*?)<\/title>/i);
            const title = titleTag ? titleTag[1] : 'No Title Found';
            return title;
        });

        const li = titleTags.map(title => `<li>${title}</li>\n`).join('');
        const html = renderHTML(li);

        res.send(html);
    } catch (error) {
        handleError(error)
    }
};

exports.getTitlesUsingPromises = async (req, res) => {
    try {
        const addresses = req.query.address;
        let siteslist = [];

        if (addresses.length === 0)
            return res.status(400).send('Please provide valid addresses.');

        if (typeof addresses === 'object')
            siteslist = Object.values(addresses);
        else
            siteslist.push(addresses);
        const titleTags = await Promise.all(siteslist.map(async (item) => {
            const response = await axios.get(item);
            const titleTag = response.data.match(/<title>(.*?)<\/title>/i);
            const title = titleTag ? titleTag[1] : 'No Title Found';
            return title;
        }));

        const li = titleTags.map(title => `<li>${title}</li>\n`).join('');
        const html = renderHTML(li);

        res.send(html);
    } catch (error) {
        handleError(error)
    }
};

const handleError = (error) => res.status(500).json(`An error occurred while fetching title tags. ${error.message}`);


const renderHTML = (data) => (`<html>
  <head></head>
  <body>
  <h1> Following are the titles of given websites: </h1>
      <ul>
          ${data}
      </ul>
  </body>
  </html>`)