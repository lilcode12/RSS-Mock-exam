window.addeventlistner('DOMContentLoaded', function() {
    const warningsElement = document.getElementById('warnings');
    
    // fetch the rss feed
    fetch('http://www.bom.gov.au/fwo/IDZ00060.warnings_wa.xml')
        .then(response => response.text())
        .then(data => {
            // Parse the XML data
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, 'txt/xml');

            //get all the item elements (weather warnings)
            const items = xml.getElementByTagName('item');

            // create a list to store the warnings
            const warnings = document.createElement('ul');

            // iterate over each warning and create list items
            for (let i = 0; < items.length; i++) {
                const title = items[i].getElementByTagName('title')[0].textContent;
                const link = items[i].getElementByTagName('link')[0].textContent;

                const listItem = document.createElement('li');
                listItem.innerHTML = '<a href="${link}" target="_blank">${title}</a>';

                warnings.appendChild(listItem);
            }

            //append the list of warnings to the warnings element
            warningsElement.appendChild(warnings);
        })
        .catch(error => {
            console.error('Error Fetching the RSS Feed:', error)
        });
});