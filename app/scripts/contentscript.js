(function () {
  'use strict';
  
  var notification, banner;
  
  banner =
  '<div class="github-fork-ribbon-wrapper right fixed">' +
  '<div class="github-fork-ribbon">' +
  '<span id="ff-addon-banner-text"></span>' +
  '</div>' +
  '</div>';
  
  notification = document.createElement('div');
  notification.style.display = 'none';
  document.body.appendChild(notification);
  notification.innerHTML = banner;
  
  chrome.storage.sync.get({
    projects: [{name: 'Default', domain: '*.dev', banner: 'Bao\'s ENV', domainRegex: '[^ ]*.dev'}]
  }, setBanner);
  
  function setBanner(items) {
    var matchedProjects = [];
    
    var project, i;
    
    for (i = 0; i < items.projects.length; i++) {
      project = items.projects[i];
      if (document.URL.match(project.domainRegex)) {
        matchedProjects.push(project);
      }
    }
    
    // Determine the best match.
    for (i = 0; i < matchedProjects.length; i++) {
      project = matchedProjects[i];
      // Best match would be a full substring of the location.host without regex.
      if (location.host.indexOf(project.domain) > -1) {
        setBannerText(project.banner);
        matchedProjects.splice(i, 1);
        return;
      }
    }
    
    // If no best match, take the first.
    if (matchedProjects.length) {
      setBannerText(matchedProjects[0].banner);
      return;
    }
    
    notification.innerHTML = '';
  }
  
  function setBannerText(text) {
    var element = document.getElementById('ff-addon-banner-text');
    notification.style.display = 'block';
    element.textContent = text;
  }
  
})();
