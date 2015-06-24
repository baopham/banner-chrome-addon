'use strict';

var notification, banner;

banner =
'<div class="github-fork-ribbon-wrapper right fixed">' +
    '<div class="github-fork-ribbon">' +
        '<span id="ff-addon-banner-text">Bao\'s ENV</span>' +
    '</div>' +
'</div>';

notification = document.createElement('div');
document.body.appendChild(notification);

chrome.storage.sync.get({
        domainsRegex: '[^ ]*.dev',
        banner: "Bao's ENV"
}, function(items) {
    if (document.URL.match(items.domainsRegex)) {
        notification.innerHTML = banner;
        var element = document.getElementById('ff-addon-banner-text');
        element.textContent = items.banner;
    }
    else {
        notification.innerHTML = '';
    }
});
