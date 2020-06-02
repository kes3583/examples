const findType = function(d) {

	/* d.forEach(i => {
		console.log(i)
	}) */
	d.map(function(value, index) {
		if(typeof value === "object"){
			for (key in value){				
				if(typeof value[key] === "object"){
					
					if(value['type'] === 'sk' && value['name'] !== undefined){
						//console.log('name?', value['name'])
						n.push(value['name'])
					} 
					findType(value[key])
				}	
				
			}
		}
		
	});


}

document.querySelectorAll('button').forEach(item => {
	item.addEventListener('click', event => {
		console.log(event.target.parentElement)
		let html = event.target.parentElement;
		let nextElementSibling = event.target.parentElement.parentElement.nextElementSibling;
		console.log(event.target.parentElement.parentElement.nextElementSibling)
		if (nextElementSibling.id === 'done') {
			console.log(nextElementSibling.children)
			newFunction(nextElementSibling);
		}
		//nextElementSibling.appendChild(html)


	})
})


