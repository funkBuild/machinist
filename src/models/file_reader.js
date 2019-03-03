class FileExporter {
  static readFile(file) {
    return new Promise( (res, rej) => { 
	    var reader = new FileReader();
	    var blob = file.slice(0, file.size); 

	    reader.onloadend = function(evt) {
        console.dir(evt);
		    if (evt.target.readyState == FileReader.DONE) { // DONE == 2
			    res(evt.target.result);
		    }
	    };

	    reader.readAsArrayBuffer(blob);
    });
  }
}

export default FileExporter;
