[description]: <> (Secure Shell, remote login client)
[preservedKeywords]: <> (ssh, ssh-keygen, rsa, OpenSSH)

# SSH - Remote Login

## What is SSH ?

SSH is a remote login utility, used to connect to remote hosts running an SSH server.
It can also be used to move files between hosts via [rsync](https://linux.die.net/man/1/rsync).
Depending on the server's configuration you can login with a password or a ssh key.

## Basic Commands

Connecting to a remote host.

```sh
ssh <user>@<host-address>
```

Connectiong using a specific ssh key (private Key).

```sh
ssh -i <path-to-private-key> <user>@<host-address>
```

## SSH Keys

Most of the time authenticating with the remote host is done via private-public key pairs.
These key pairs are calculated by cryptographic algorithms, like [rsa](<https://en.wikipedia.org/wiki/RSA_(cryptosystem)>)
Different algorithms offer different levels of security.

If you want to generate a pair of keys use the ssh-keygen command:

```sh
ssh-keygen
```

You will be prompted to specify the location to which you want to save your new keys.
The default is "~/.ssh/id_rsa", as the default algorithm for key generation is RSA.
Be careful when handling multiple key pairs, if you do not specify a different name here your old key
might be overwritten.

After specifying the location to write your key to you will be asked if you want to specify a keyphrase.
This will be a password you would need to enter everytime you want to authenticate using the key.
You can leave this empty if you want to, even though it adds an additional layer of security.

If you want to use a different algorithm it can be specified via the -t flag, for example:

```sh
# This generates a eliptic curve based keypair. It is a viable alternative to RSA.
ssh-keygen -t ed25519
```

After completing the process you will be able to use the generated keypair.

### How to use the keys

If you want to use your keys for SSH authentication you add your public key (filename usually ends with .pub)
to the remote server.
You private key, as the name suggests, should only be present on the machine you want to use to connect to
the remote host.

When connecting to the host for the first time you will be asked if you want to add it to the known hosts file.
enter "yes" and press enter. You can now use your private key to connect to the remote server.

### Configuration

To make the use of SSH with multiple servers you can create a "conf" file in your ~/.ssh directory.
In this file you can specify connection configurations for different servers, specifying different ports,
identity files (keys) and other things.
If no port is specified here the default port 22 is used.

```txt
Host server1
    HostName 192.168.0.25
    User root
    Port 1234
    IdentityFile ~/.ssh/<private-key-name>.key

Host server2
    HostName 192.168.0.162
    User user
    IdentityFile ~/.ssh/<another-private-key>.key
```

This makes it possible to connect to the servers with the short command:

```sh
# Uses config for server1
ssh server1

# Uses config for server2
ssh server2

```

## Used resources

- [SSH Docs](https://man7.org/linux/man-pages/man1/ssh.1.html)
- [Linuxize Article](https://linuxize.com/post/using-the-ssh-config-file/)
