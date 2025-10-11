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

	// in miliseconds
	let units = {
		year  : 24 * 60 * 60 * 1000 * 365,
		month : 24 * 60 * 60 * 1000 * 365/12,
		day   : 24 * 60 * 60 * 1000,
		hour  : 60 * 60 * 1000,
		minute: 60 * 1000,
		second: 1000
	}
	let rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

	let getRelativeTime = function(d1, d2 = new Date()) {
		let elapsed = d1 - d2;

		// "Math.abs" accounts for both "past" & "future" scenarios
		for (var u in units) 
			if (Math.abs(elapsed) > units[u] || u == 'second') 
				return rtf.format(Math.round(elapsed/units[u]), u);
	};

	Array.from(document.querySelectorAll('time[datetime].relative')).forEach(function(item) {
		let formattedDate = item.innerText;
		let d1 = new Date(item.getAttribute('datetime'));
		item.innerHTML = getRelativeTime(d1);
		item.setAttribute('title', formattedDate);
	});

	document.addEventListener('DOMContentLoaded', () => {
		// Get all "navbar-burger" elements
		const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
		// Add a click event on each of them
		$navbarBurgers.forEach( el => {
			el.addEventListener('click', () => {
				// Get the target from the "data-target" attribute
				const target = el.dataset.target;
				const $target = document.getElementById(target);
				// Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
				el.classList.toggle('is-active');
				$target.classList.toggle('is-active');
			});
		});
	});
})();
