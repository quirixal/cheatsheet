[description]: <> (How to write your own PyPi package.)
[preservedKeywords]: <> (python, pypi, write your own)

# PyPi Packages

> The Python Package Index (PyPI) is a repository of software for the Python programming language. PyPI helps you find and install software developed and shared by the Python community.

## Pre-requirements

- Python installation ([otherwise install Python](https://www.python.org/))
- [PyPi](https://pypi.org/) account (and/or [TestPyPi](https://test.pypi.org/) account)
- Updated `pip`, `build` and `twine`

## Update commands

All commands works also with active `venv`, just remove `python3 -m `

### pip

```sh
python3 -m pip install --upgrade pip
```

### build

```sh
python3 -m pip install --upgrade build
```

### twine

```sh
python3 -m pip install --upgrade twine
```

## Repository structure

```
ROOT_DIR/
├── LICENSE
├── pyproject.toml
├── README.md
├── src/
│   └── PACKAGE_NAME/
│       ├── __init__.py
│       └── *.py
└── test/
    └── *
```

### Description

| Name           | Description                    |
| -------------- | ------------------------------ |
| LICENSE        | License file                   |
| pyproject.toml | ---                            |
| README.md      | Readme file                    |
| src/           | Directory for your source code |
| test/          | Directory for all tests        |

### `src/` description

| Name                         | Description                 |
| ---------------------------- | --------------------------- |
| PACKAGE_NAME/                | Module directory            |
| PACKAGE_NAME/\_\_init\_\_.py | Python's `__init__.py` file |
| PACKAGE_NAME/\*.py           | Project files               |

## The `pyproject.toml` file

```toml
[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[project]
name = "PACKAGE_NAME"
version = "0.0.1"
authors = [
  { name="Author name", email="Author email" },
]
description = ""
readme = "README.md"
requires-python = ">=3.7"
classifiers = [
    "Programming Language :: Python :: 3",
    "License :: OSI Approved :: MIT License",
]

[project.urls]
"Homepage" = "https://github.com/*"
"Bug Tracker" = "https://github.com/*/issues"
```

## Build your Project

Run `python3 -m build` from same directory where `pyproject.toml` is located.

You should get a `dist/` directory like this:

```
dist/
├── PACKAGE_NAME-0.0.1-py3-none-any.whl
└── PACKAGE_NAME-0.0.1.tar.gz
```

## Uploading with `twine`

Add your PyPi API token. This should look like this:

```toml
# ~/.pypirc

[testpypi]
  username = __token__
  password = <PyPI token>

...
```

Run `python3 -m twine upload --repository testpypi dist/*` from root directory.

After you successful upload you'll get something like this:

```shell
Uploading distributions to https://test.pypi.org/legacy/
Enter your username: __token__
Uploading example_package_YOUR_USERNAME_HERE-0.0.1-py3-none-any.whl
100% ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 8.2/8.2 kB • 00:01 • ?
Uploading example_package_YOUR_USERNAME_HERE-0.0.1.tar.gz
100% ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 6.8/6.8 kB • 00:00 • ?
```

## Install your PyPi package

Use (both with active [`venv`](?path=src/docs/python/virtual_environment.md)):

```shell
pip install --index-url https://test.pypi.org/simple/ --no-deps PACKAGE_NAME
```

or

```shell
pip install PACKAGE_NAME
```

to install your package.

## Used resources

- [PyPi website](https://pypi.org/) (January 31th, 2023)
- [Python packaging](https://packaging.python.org/en/latest/tutorials/packaging-projects/) (January 31th, 2023)
