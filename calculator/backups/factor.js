  function factor(num) {
    buffer = buffer + num;
    let addOpFound = 0;
    if( (addOpFound = buffer.indexOf('+', 1)) < 0) {
      addOpFound = buffer.indexOf('-', 1);
			addOpFound = addOpFound + 1;
			console.log('sub:', buffer.substring(addOpFound));
			buffer = buffer.substring(0,addOpFound) + evaluate(buffer.substring(addOpFound));
			console.log('left:', buffer.substring(0,addOpFound))
			console.log('right:', evaluate(buffer.substring(addOpFound)));
    }
		console.log({factor}, {buffer});
    return evaluate(buffer.substring(addOpFound));
  }

