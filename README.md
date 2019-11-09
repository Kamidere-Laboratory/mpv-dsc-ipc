Windows:

- Requiments:
  - portable node.js (and install_tools.bat on windows)
  - mpv
- Instalation:
  - create `mpv` directory next to `mpv.exe`
  - create `node` directory and put `node.js` inside
    - run `install_tools.bat` in `node` directory
  - make `mpv.conf`
    - put `input-ipc-server=\\.\pipe\mpv` in first line
  - create `node-scripts` and `scripts` direcotry
    - move `startup.js` to `scripts`
  - create `mpv-dsc-ipc` directory inside `node-scripts`
    - move `index.js` and `package.json` to `mpv-dsc-ipc`
    - open powershell/console inside `mpv-dsc-ipc`
    - go back to `node` directory
    - move `npm.bat` on powershell/console
    - type `install`
  - Have fun everything should work now

## File struct:

- mpv.exe
- mpv (dir)
  - mpv.conf
  - node (dir)
    - everything form node.js
  - scripts (dir)
    - startup.js
  - node-scripts (dir)
    - mpv-dsc-ipc (dir)
      - package.json
      - index.js

## Screenshoots:

![](img1.png)
![](img2.png)
