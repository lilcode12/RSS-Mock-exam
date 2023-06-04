window.addEventListener('DOMContentLoaded', function() {
    const warningsElement = document.getElementById('warnings');

    // Fetch the RSS feed
    fetch('https://www.bom.gov.au/fwo/IDZ00060.warnings_wa.xml')
        .then(response => response.text())
        .then(data => {
            // Parse the XML data
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, 'text/xml');

            // Get all the item elements (weather warnings)
            const items = xml.getElementsByTagName('item');

            // Create a list to store the warnings
            const warnings = document.createElement('ul');

            // Iterate over each warning and create list items
            for (let i = 0; i < items.length; i++) {
                const title = items[i].getElementsByTagName('title')[0].textContent;
                const link = items[i].getElementsByTagName('link')[0].textContent;

                const listItem = document.createElement('li');
                listItem.innerHTML = `<a href="${link}" target="_blank">${title}</a>`;
                warnings.appendChild(listItem);
            }

            // Append the list of warnings to the warnings element
            warningsElement.appendChild(warnings);
        })
        .catch(error => {
            console.error('Error fetching the RSS feed:', error);
        });
});