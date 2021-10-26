(function(){
  Array.from(document.querySelectorAll('[data-email]')).forEach(function(item) {
    var obfuscated = item.getAttribute('data-email');
    if (typeof obfuscated == 'string' && obfuscated != '') {
      var clean = obfuscated.replace(/[a-zA-Z]/g, function(c){ return String.fromCharCode((c<='Z'?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26); });
      if(item.innerHTML.match(/spam( ?\[at\] ?|@)example\.com/)) {
        item.innerHTML = clean;
      }
      if(item.getAttribute('href')) {
        item.setAttribute('href', 'mailto:'+clean);
      }
      item.removeAttribute('data-email');
    }
  });
})();
