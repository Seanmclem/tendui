### Tendui

made with electron vite react starter: https://github.com/maxstue/vite-reactts-electron-starter

## Installation

`yarn`

---

### Before first run

Might need to run

`yarn rebuild`

Due to node-pty //? but it's not installed, node-pty

## Build

`yarn build`

---

## Development

`yarn dev`

## Build

`yarn build`

## Release

Add any configuration to the `build` section of `package.json`, add an `.env-secrets.json` file in the `.config` folder with any environment secrets that you need for your publisher, and then run

`yarn publish`

---

## Calling native node-code

These steps are ordered by how the code is called, not by how it might be written. It maybe should be written in the reverse order, but up to you.

**1** - Frontentd code that reaches out to initiate some native behavior
Calls a `Main` object that exists on the global `window`, and `Main` contails functions registered in the next step. The function takes a payload sent along to setp-2.

ex: `window.Main.NAME_OF_FUNCTION("payload")`

ex: `window.Main.goGetFile("anything")`

ex: `src/pages-soup/package-json/package-json-page.tsx`

--

**2** - the `window.main...` call from step 1, reaches out to `electron/preload.ts` ... The functions called-by-name are registered in an `api` object which is attached to `window.Main` via `contextBridge.exposeInMainWorld('Main', api);` ...

The function forwards to an event for the next step to listen to, and continues to forward along a payload Like, `ipcRenderer.send('event-name', payload)`

ex: `electron/preload.ts`

--

**3** - The event from preload.ts in step-2, is recieved in `electron/index.ts` ... the event is recieved by `ipcMain.on` in the format `ipcMain.on('event-name', (eventData, payload) => anything)`...

Here, you can handle native node-code. use any node library etc. The code can then send back results via `event.sender.send('new-repsonse-event-name', responsePayload)`...
might be convention to name te responding-event name same as the one responding from..? So like `on('getFile`)`sends back`event.sender.send('getFile')`

```typescript
ipcMain.on('getFile', async (event: IpcMainEvent, message?: any) => {
  const bufferIdk = await fs.readFile(join(__dirname, '../package.json'));
  const textOutput = bufferIdk.toString();
  //do stuff... send back..
  event.sender.send('getFile', textOutput);
});
```

--

**4** - Lastly, the original frontend files from step-1 can listen for the event sent back in the prior step-3 via `event.sender.send('repsonse-event-name', textOutput)`, in this case, the inner `'repsonse-event-name'` event-name. So like,

```typescript
window.Main.on('repsonse-event-name', (responsePayload: string) => {
  doSomethingWith(responsePayload);
});
```

Listening fror the final event results in the frontend, brings the native behavior full-circle..

# License

MIT
