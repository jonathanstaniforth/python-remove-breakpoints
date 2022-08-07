# Python Remove Breakpoints

A small Visual Studio Code extension that searches all Python files in a workspace and removes any `breakpoint()` lines.

## Packaging

The extension can be packaged as follows:

```console
$ npm install -g vsce
$ vsce package
```

More information can be found here: https://code.visualstudio.com/api/working-with-extensions/publishing-extension#vsce

## Install

Once the extension has been packaged as a vsix, it can be install as an extension in Visual Studio Code as discussed here: https://code.visualstudio.com/docs/editor/extension-marketplace#_install-from-a-vsix

## Using the extension

The extension can be used by running the `Remove Breakpoints` Visual Studio Code command.
