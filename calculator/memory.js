/*
 Check for localStorage availability
 If available
 set global variable: useStorage
 	if value exists
		load into memory
		set memory indicator
	else memory = 0
 */
const Memory = (function() {

	const useStorage = storageAvailable('localStorage');

// initMemory
	if(useStorage) {
		if(!localStorage.getItem('fjmCalcMemory')) localStorage.setItem('fjmCalcMemory', 0);
	} else {
		this.memory = 0;
	}

	/*
		Detects whether localStorage is both supported and available
		https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
	*/
	function storageAvailable(type) {
		var storage;
		try {
			storage = window[type];
			var x = '__storage_test__';
			storage.setItem(x, x);
			storage.removeItem(x);
			return true;
		}
		catch(e) {
			return e instanceof DOMException && (
				// everything except Firefox
					e.code === 22 ||
				// Firefox
					e.code === 1014 ||
				// test name field too, because code might not be present
				// everything except Firefox
					e.name === 'QuotaExceededError' ||
				// Firefox
					e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
			// acknowledge QuotaExceededError only if there's something already stored
					(storage && storage.length !== 0);
		}
	}

	return {
		get: function() {
			if(useStorage) return Number(localStorage.getItem('fjmCalcMemory'));
			else return Number(memory);
		},
		clear: function() {
			if(useStorage) localStorage.setItem('fjmCalcMemory',0);
			else memory = 0;
		},
		add: function(value) {
			const me = this.add.name;
			console.log({me});
			if(useStorage) {
				localStorage.setItem('fjmCalcMemory', Number(localStorage.getItem('fjmCalcMemory')) + Number(value));
			} else {
				memory = Number(memory) + Number(value);
			}
		},
		subtract: function(value) {
			if(useStorage) {
				localStorage.setItem('fjmCalcMemory', Number(localStorage.getItem('fjmCalcMemory')) - Number(value))
			}
			else {
				memory = Number(memory) - Number(value);
			}
		}

	}
})();

