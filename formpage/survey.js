	/********************************************************************
	* Just for fun, we're going to make any editor choice change to Vim
	* the first time they click their choice.
	********************************************************************/
	const radios = [...document.getElementsByClassName('radio-label')].forEach( radioBtn => {
			radioBtn.addEventListener('click', bestEditor, false);
		});
		
	let pranked = false;

	function bestEditor(e) {
			if(e.target.closest('li').firstChild.id === 'editor_Vim') return;
		const editorLegend = document.getElementById('editor-legend');
			console.log('Click on the radio button instead of the text label We\'re just having some fun.');
		if( e.target.textContent === "Vim" ) {
			editorLegend.textContent = "Awesome! You are one of us.";
		} else {
				if( pranked ) {
					editorLegend.textContent = "Sorry. My bad 😉";
						return;
				} else {
					editorLegend.textContent = "Awesome! You are one of us.";
				}
			pranked = !pranked;
			
				editorLegend.classList.add('alert');
			const alertTimerId = window.setTimeout(() => editorLegend.classList.remove('alert'), 3000);

				const vimItem = document.getElementById('editor_Vim').closest('li');
				const chosenItem = e.target.closest('li');
				const moveTo = e.target.closest('li').nextElementSibling;

				vimItem.before(chosenItem);
				const moveLi = () => moveTo.before(vimItem);
				setTimeout(moveLi, 0); // allow time to finish first move before moving second list item
				const uncheck = () => {
						chosenItem.firstChild.checked = false;
						vimItem.firstChild.checked = true;
					};
				setTimeout(uncheck, 0); // allow DOM reshuffling to finish before changing checked radio
		}
	}

/*
	Process form submission and display results
*/

	const dialog = document.getElementById('response');

	const getTheData = (e) => {
		e.preventDefault();
		const formData =  new FormData(e.target);
		const dataObj = {};
		for(const [key, value] of formData.entries()) {
			console.log(key, value);
			if( dataObj[key] !== undefined ) {
				if( !Array.isArray(dataObj[key])) {
						dataObj[key] = [dataObj[key]];
				}
				dataObj[key].push(value);
			} else {
				dataObj[key] = value;
			}
		}
      console.log({dataObj});
		const resultsDiv = document.getElementById('results');
		resultsDiv.replaceChildren();

		for( property in dataObj ) {
			if( dataObj[property] !== '' ) {
				const labelDiv = document.createElement('div');
				labelDiv.id = 'response-' + property + '-label';
				labelDiv.classList.add('Dtable-cell');
				labelDiv.textContent = property;
				resultsDiv.appendChild(labelDiv);

				const valueDiv = document.createElement('div');
				valueDiv.id = 'response-' + property + '-value';
				valueDiv.classList.add('Dtable-cell');
					if( Array.isArray(dataObj[property]) ) {
						valueDiv.textContent = dataObj[property].join(', ');
					} else {
						valueDiv.textContent = dataObj[property].toString();
					}
				
				resultsDiv.appendChild(valueDiv);

			}

		}


			dialog.showModal();
	} // getTheData
	
	const theForm = document.getElementById('survey-form')
	theForm.addEventListener('submit', getTheData);

