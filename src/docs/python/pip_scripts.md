[description]: <> (Some useful scripts for pip)
[preservedKeywords]: <> (python, pip, install, upgrade, requirements)

# PIP - Scripts

> `pip` is a package management system used to install and manage software packages written in Python. It is the default package manager for the Python programming language. Pip allows you to install, upgrade, and remove Python packages easily and quickly.

## Useful scripts

Here you will find some very useful scripts.

### Freeze your dependencies

Write your dependencies into a `requirements.txt`, to easy install them later.

```sh
# Write into requirements.txt
pip freeze > requirements.txt

# Install from requirements.txt
pip install -r requirements.txt
```

## Used resources

- [ChatGTP](https://chat.openai.com/chat), Request: "What is pip?" (February 2nd, 2023)
