/* The JS to control all the scripts for the application (windows, links between the app and the computer) */

/* Used when I have to use storage.local.set. */
var nameContainer = {};
var chromeLocalFile = "";


function errorHandler() {
	if (fileInLoading != undefined) {
		removeFile(fileInLoading);
		fileInLoading = undefined;
	}
}

function newWindow () {
	if (textarea.value.length > 0) {
		chrome.app.window.create(
			"mado.html", 
			{
			    bounds: {
			    	left: (window.screenX + 20), // To watch this is a new window.
			    	top: (window.screenY + 20), // To watch this is a new window.
			      	width: Math.round(screen.width * 0.85),
			      	height: Math.round(screen.height * 0.85)
			    }, 
			    minWidth:320, 
			    minHeight: 240
		  	}
	  	);
  	}
}

function openFileButton () {		
    chrome.fileSystem.chooseEntry(
    	{
	 		type: "openFile",
	 		accepts:[
	 			{
	 				extensions: ["md", "txt"]
	 			}
	 		] 
		}, 
		function(loadedFile) {
			if (loadedFile) 
				openFile(loadedFile);
		}
	);
}

function openFile(fileToOpen) {
	fileToOpen.file(
		function(file) {
	 		var reader = new FileReader();
	 		reader.onload = function(e) {
	 			if (textarea.value != "") // Something is already in the textarea, Mado opens a new window 
	 				chrome.storage.local.set({'loadedText': e.target.result}, function() { newWindow(); }); // Save the text in the storageArea
	 			else { // Nothing in the textarea. 
		 			textarea.value = e.target.result; // The file is loaded.
		 			markdownSaved = e.target.result;
		 			conversion();
		 			document.getElementById("doc-name").innerHTML = fileName(fileToOpen.fullPath) + "&nbsp;|";
	 			}
		 		newRecentFile(fileToOpen); // Update the storage, the file opened is now on top.						 	
	 		};
			reader.readAsText(file);
		},
		errorHandler
	);
}

function fileName (path) { // if path is ".../folder/documents/document.md", returns "document".
	return path.substring(path.lastIndexOf('/') + 1); 
}

function launchWithText (loadedText) { // What to do if the user has open a file with already text on his previous window.
	textarea.value = loadedText; // Set what is in the textarea.
	chrome.storage.local.set({"loadedText": " "}, function() {}); // Reset the text in the storageArea.
	markdownSaved = loadedText;
	conversion();
}


function saveFile () { // Waiting fixes by Google
	chrome.fileSystem.chooseEntry(
		{
			type: "saveFile", 
			suggestedName: "document.md"
		}, 
		function(savedFile) {
			if (savedFile) {
				savedFile.createWriter(
					function(writer) {
				 		writer.write(
				 			new Blob(
					 			[textarea.value],
								{
									type: "text/plain"
								}
							)
						); 
						markdownSaved = textarea.value;
						checkSaveState();
    					document.getElementById("doc-name").innerHTML = fileName(savedFile.fullPath) + "&nbsp;|";

						newRecentFile(savedFile); // Add the file to the "Recent" div.
				 	}, 
				errorHandler);
			}
		}
	);
}

function saveAsFile () { // Save the document in a new file 
	chrome.fileSystem.chooseEntry(
		{
			type: "saveFile", 
			suggestedName: "document.md"
		}, 
		function(savedFile) {
			if (savedFile) {
				savedFile.createWriter(
					function(writer) {
				 		writer.write(
				 			new Blob(
					 			[textarea.value],
								{
									type: "text/plain"
								}
							)
						); 
						markdownSaved = textarea.value;
						checkSaveState();
						document.getElementById("doc-name").innerHTML = fileName(savedFile.fullPath) + "&nbsp;|";

						newRecentFile(savedFile);
				 	}, 
				errorHandler);
			}
		}
	);
}

function exportFileHTML () { // Export the document in HTML
	marked(textarea.value, function (err, content) {
		chrome.fileSystem.chooseEntry(
			{
				type: "saveFile", 
				suggestedName: "document.html"
			}, 
			function(exportedFile) {
				if (exportedFile) {
			 		exportedFile.createWriter(
			 			function(writer) {
			 				writer.write(
			 					new Blob(
			 						[content],
									{
										type: "text/HTML"
									}
								)
							); 	 	
			 			}, 
			 		errorHandler);
		 		}
			}
		);
	});
}

function moreWindow(choice) { // Open a window for a suject on More.
	chrome.app.window.create(
		choice, 
		{
		    bounds: {
		    	left: Math.round((window.screenX + (($(window).width() - 498) / 2))), // Good alignement.
		    	top: Math.round((window.screenY + (($(window).height() - 664) / 2))), // Good alignement.
		      	width: 498,
		      	height: 664
		    }, 
		    // The windows can't be resized
		    minWidth: 498, 
		    minHeight: 664,
		    maxWidth: 498,
		    maxHeight: 664
	  	}
  	);
  	moreButton.click(); // Close the more dropdown.
}

chrome.storage.onChanged.addListener(function(changes, namespace) { // Update when a storage value is changed
  	for (key in changes) {
  		if (key == "gfm")
  			setEditorSyntax();
	}
});



