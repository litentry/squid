oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g devkit
$ devkit COMMAND
running command...
$ devkit (--version)
devkit/0.0.0 darwin-x64 node-v14.18.1
$ devkit --help [COMMAND]
USAGE
  $ devkit COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`devkit hello PERSON`](#devkit-hello-person)
* [`devkit hello world`](#devkit-hello-world)
* [`devkit help [COMMAND]`](#devkit-help-command)
* [`devkit plugins`](#devkit-plugins)
* [`devkit plugins:inspect PLUGIN...`](#devkit-pluginsinspect-plugin)
* [`devkit plugins:install PLUGIN...`](#devkit-pluginsinstall-plugin)
* [`devkit plugins:link PLUGIN`](#devkit-pluginslink-plugin)
* [`devkit plugins:uninstall PLUGIN...`](#devkit-pluginsuninstall-plugin)
* [`devkit plugins update`](#devkit-plugins-update)

## `devkit hello PERSON`

Say hello

```
USAGE
  $ devkit hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Whom is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/litentry/squid/blob/v0.0.0/dist/commands/hello/index.ts)_

## `devkit hello world`

Say hello world

```
USAGE
  $ devkit hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/world.ts)
```

## `devkit help [COMMAND]`

Display help for devkit.

```
USAGE
  $ devkit help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for devkit.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.10/src/commands/help.ts)_

## `devkit plugins`

List installed plugins.

```
USAGE
  $ devkit plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ devkit plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `devkit plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ devkit plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ devkit plugins:inspect myplugin
```

## `devkit plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ devkit plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ devkit plugins add

EXAMPLES
  $ devkit plugins:install myplugin 

  $ devkit plugins:install https://github.com/someuser/someplugin

  $ devkit plugins:install someuser/someplugin
```

## `devkit plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ devkit plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ devkit plugins:link myplugin
```

## `devkit plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ devkit plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ devkit plugins unlink
  $ devkit plugins remove
```

## `devkit plugins update`

Update installed plugins.

```
USAGE
  $ devkit plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
