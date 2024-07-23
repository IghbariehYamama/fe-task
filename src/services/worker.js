
// Web Workers - to run JavaScript in a separate thread without blocking the main thread.
self.onmessage = async function(event) {
    const data = event.data;

    // Fetch the script content
    const response = await fetch(data.scriptURL);
    let scriptText = await response.text();

    // Remove 'export' keyword
    scriptText = scriptText.replace(/export\s+/g, '');

    // Evaluate the script content
    eval(scriptText);

    // Execute the function
    const result = await eval(data.func).apply(null, data.args);

    // send the result to the main thread
    self.postMessage(result);
};
