# How to create a CLI (NodeJS)

Hello! This guide is a way to learn how to create your own simple CLI application with NodeJS

Warning: There are 1000% better ways to create a CLI, this guide is just how I made mine.
## Installation

To start making your CLI, create a new folder, and enter it by running the below command:

```bash
mkdir node-cli && cd node-cli
```
Then, create a new npm project by running the command:

```bash
npm init -y
```

If you want to edit the details, you can do so in the newly created `package.json`

Create a file, preferably called `index.js`. This file will be called main file in this guide

That should be all you need to create a basic CLI

To test/run your code, run in the main directory `node .` if your main files name is `index.js`
## 1. Creating the CLI
To start creating your CLI, enter your main file, and start by adding this to the top of your file:

```bash
#!/usr/bin/env node
```

Then, go to your `package.json` and add this line on top of the `main` value:

```json
"bin": "./index.js",
```

<details>
 <summary>It should look something like this</summary>
 
 ```json
{
  "name": "cli",
  "version": "1.0.0",
  "description": "",
  "bin": "./index.js",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

</details>

Now, add a way to indicate that the file was actually ran, for example a `console.log`.
Run `npm link` in the main folder of your project, and cd outside of the project and try running the name in `package.json`. 
If it doesnt run, check if the terminal gives any errors. 
## 2. Adding subcommands

You might want to add some subcommands, so here I will show how to make these subcommands.

To get all arguments that are given when the command is run, you can use `process.argv`, which returns an array. The first two arguments arent arguments that you need, so you can use slice to remove them like so `process.argv.splice(0, 2);`

<details>
 <summary>Your code so far should look similar to this</summary>
 
 ```js
#!/usr/bin/env node

process.argv.splice(0, 2);

console.log(process.argv)
```

</details>

If you `console.log` process.argv, but add a random word while executing it, you can actually see the word appear in an array.

If you are planning to just add one or two commands, you can easily get away with using code similar to this:

```js
#!/usr/bin/env node

process.argv.splice(0, 2);

if(process.argv[0] === 'hello') return console.log('Hello! How are you?')
else if(process.argv[0] === 'world') return console.log('The world do be spinnin\' tho')
```

But if you are planning to add multiple commands, you can create a simple command handler.

## 3. (Optional) Command handler

To start creating a simple command handler, create a new folder, and name it `commands`:

```bash
mkdir commands
```

In here, I would recommend to create a template file, with the following code: 

```js
module.exports = {
	execute() {
        // Start of where code can be placed

        console.log('This is an example command')

        // End of where code can be placed
	},
};
```

Then, back in your main file, you want to import a new package, which comes with NodeJS, called fs. You can do so by adding this code below `#!/usr/bin/env node`:

```js
const fs = require('fs')
```

Now you need to read all the commands in the commands folder to know which exist and which dont.

The way I did this looks something similar to this:

```js
const commandfiles = fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js'));

let commands = []

const command = process.argv[0]

for (const val of commandfiles) {
    commands.push(val.replace('.js', ''))
}
```

Now you need to detect the command that the user ran, by checking if `commands` contains the wanted command. To do so you can get away with this:

```js
if(commands.includes(command)) {
    // ...
}
else return console.log('That isnt a valid command')
```

To run our commands, we need to execute the code in it. We can do so by adding this in the command checker we made above:

```js
const torun = require(__dirname + '/commands/' + command + '.js')

torun.execute()
```

<details>
 <summary>Your code so far should look similar to this</summary>
 
 ```js
#!/usr/bin/env node

const fs = require('fs')

process.argv.splice(0, 2);

const commandfiles = fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js'));

let commands = []

const command = process.argv[0]

for (const val of commandfiles) {
    commands.push(val.replace('.js', ''))
}

if(commands.includes(command)) {
    const torun = require(__dirname + '/commands/' + process.argv[0] + '.js')

    torun.execute()
}
else return console.log('That isnt a valid command')
```

</details>

### Adding arguments

You might want to grab arguments aswell for your subcommands, and you can do so by adding this inside the runner:

```js
process.argv.splice(0, 1);

const args = process.argv
```

And change `torun.execute()` to `torun.execute(args)`. Now in your commands, on the line where there is `execute()` add inside the parenthesis `args`, and you can call the args in the commands!

<details>
 <summary>Your template should look similar to this</summary>
 
 ```js
module.exports = {
	execute(args) {
        console.log('This is an example command!')
        console.log('All arguments:')
        console.log(args)
	},
};
```

</details>

## End

Now you know how to create a simple CLI! 

[Sourcecode](https://github.com/somerandomcloud/simple-cli)

If you have any feedback, please reach out to me on Discord via my tag `ICodeInAssembly#7117`

If you want to contribute and add some things that I have maybe missed, you can create a pull request.

To donate, message`ICodeInAssembly#7117` on Discord
## Author

- [@somerandomcloud](https://www.github.com/somerandomcloud)