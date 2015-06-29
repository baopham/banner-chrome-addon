'use strict';

// Saves options to chrome.storage
function save_options() {
    var domains = document.getElementById('domains').value;
    var domainsRegex = domains.replace(/\*/g, "[^ ]*");
    var banner = document.getElementById('banner').value;

    chrome.storage.sync.set({
            domains: domains,
            domainsRegex: domainsRegex,
            banner: banner
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 1000);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Default: "*\.dev", "Bao's ENV"
    chrome.storage.sync.get({
            domains: '*\\.dev',
            banner: "Bao's ENV"
    }, function(items) {
        document.getElementById('domains').value = items.domains;
        document.getElementById('banner').value = items.banner;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
