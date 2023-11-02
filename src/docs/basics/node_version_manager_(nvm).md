[description]: <> (Node.js version manager for command line.)
[preservedKeywords]: <> (web, node.js, nvm, js, installation, scripts, script collection)

# Node Version Manager (nvm)

## What is nvm?

`nvm` allows you to quickly install and use different versions of node via simply command line instructions.

## Install nvm

For install and update use

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh
# or
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

Afterwards run

```sh
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

## Used resources

- [nvm-sh's github repository "nvm"](https://github.com/nvm-sh/nvm#node-version-manager---) (February 16th, 2023)
