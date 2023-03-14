## Electron example application

This demonstrates how to do the following from an Electron application:
* Making privileged calls from the renderer to the main process (specifically
  reading from the filesystem)
* Building the app to a native executable using Electron Forge
* Building the code using a GitHub Action
* Creating a release using a GitHub Action

### Notes about privileged calls

1. The `preload` script defines an `api` that can be used by the renderer process.
   * This API has 2 methods, `send` and `receive`
   * The send method is used to send a message from the renderer to the main process.
   * The receive method is used to send the response from the main process back to the
     rendeder.
2. When a button is clicked on the HTML button, `window.api.send()` sends 
   the filename via the main channel.
3. The main process receives the request via `ipc.on("toMain")` handler
4. This main process handler reads the file contents using Node's fileystem
   functionality.
5. The handler uses `win.webContents.send("fromMain")` to send back the 
   file contents to the renderer.
6. The renderer's `window.api.receive("fromMain")` takes the file contents
   and writes them to the HTML page.