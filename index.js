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
    process.argv.splice(0, 1);

    const args = process.argv

    const torun = require(__dirname + '/commands/' + command + '.js')

    torun.execute(args)
}
else return console.log('That isnt a valid command')