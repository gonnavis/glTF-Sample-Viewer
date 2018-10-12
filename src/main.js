function main() {

    let gltfURL = '../models/BoomBox/glTF/BoomBox.gltf';

    let loadGLTF = axios.get(gltfURL);
    loadGLTF.then(function(json)
    {
        let gltf = new glTF(gltfURL, { responseType: 'json' });
        gltf.fromJson(json.data);
        console.log(gltf);

        gltfLoader.load(gltf); // loader resources.

        let backBuffer = document.getElementById('canvas');
        let error = document.getElementById('error');

        if (!backBuffer) {
            error.innerHTML += 'Failed to retrieve the canvas element<br>';
            return;
        }

        backBuffer.hidden = true;

        let gl = canvas.getContext("webgl", {}) || canvas.getContext("experimental-webgl", {});
        if (!gl) {
            error.innerHTML += 'Failed to get the rendering context for WebGL<br>';
            return;
        }

        let canvas2d = document.getElementById('canvas2d');
        let frontBuffer = canvas2d.getContext("2d");

        let renderer = new gltfRenderer(gl, frontBuffer, backBuffer);
    }).catch(function(err)
    {
        console.log(err);
        //error.innerHTML += 'Failed to load model: ' + errorThrown + '<br>';
    });
}
