[description]: <> (Homebrew is a package manager for macOS that allows you to easily install and manage software packages [such as libraries, tools, and applications] from the command line.)
[preservedKeywords]: <> (web, node.js, nvm, js, installation, scripts, script collection)

# Homebrew

Homebrew is a package manager for macOS that allows you to easily install and manage software packages (such as libraries, tools, and applications) from the command line. It simplifies the process of installing and updating software on your Mac by automating the retrieval, compilation, and installation of packages.

**Key features of Homebrew:**

- It has a large repository of open-source packages that are easily installable with a single command.
- It is easy to use and requires minimal setup.
- It allows you to install multiple versions of a package, so you can switch between different versions as needed.
- It has an active community of developers and users who contribute to the package repository and provide support.

## Install Homebrew

To install Homebrew, you will need to have Xcode (the development tools for macOS) installed on your system. Then, open a terminal and run the following command:

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## Useful commands

Useful commands, use `brew -h` in terminal for further help.

### Install packages

```sh
brew install [PACKAGE]
```

### Update homebrew

Use `-v` for verbose output on Terminal

```sh
brew update -v
```

## Used resources

- [Homebrew website](https://brew.sh/) (December 21th, 2022)
- [ChatGTP](https://chat.openai.com/chat), Request: "can you describe Homebrew package manager for macos?" (December 21th, 2022)
