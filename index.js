// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});


const http = require('http');
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);


/*######################################################################*/

﻿/**
* Autor: AlexRuiz7
* Fecha: Septiembre 2018
* Descripción: bot de discord
*/

/* Token del bot, NO DIVULGAR */
const token = process.env.TOKEN;

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

/* Bot code -- EVENT LISTENERS */
client.on('ready', () => {
  console.log(`Bot launched: ${client.user.tag}`);
});


/**
 *
 *
 */
client.on('message', message => {
  if (message.content.toLowerCase() === 'hi' || message.content.toLowerCase() === 'hello')
    message.reply('Hello!');
});


/**
 *
 *
 */
client.on('message', message => {
  if (message.content.toLowerCase() === 'ping')
    message.reply('pong');
});


/**
 *
 *
 */
client.on('message', message => {
  // If the message is "what is my avatar"
  if (message.content.toLowerCase() === '!avatar') {
    // Send the user's avatar URL
    message.reply(message.author.avatarURL);
  }
});


/**
 *
 *
 */
client.on('message', message => {
  // If the message is '!rip'
  if (message.content.toLowerCase() === '!rip') {
      // Create the attachment using Attachment
      const attachment = new Discord.Attachment('https://i.imgur.com/w3duR07.png');
      // Send the attachment in the message channel
      message.channel.send(attachment);
  }
});


/**
 * Help command
 *
 * Displays bot usage
 */
client.on('message', message => {
  // If the message is "how to embed"
  if (message.content.toLowerCase() === '!help') {
    // We can create embeds using the MessageEmbed constructor
    // Read more about all that you can do with the constructor
    // over at https://discord.js.org/#/docs/main/stable/class/RichEmbed
    const embed = new Discord.RichEmbed()
      // Set the title of the field
      .setTitle('Available Commands')
      // Set the color of the embed
      .setColor(0xFF0000)
      // Set the main content of the embed
      .setDescription("* **!help**: shows this message\n" +
                      "* **!servers**: displays online servers info\n" +
                      "* **!avatar**: displays your profile icon\n" +
                      "* **!rip**: rest in peace\n" +
                      "* **!ok**: spiderman meme\n" +
                      "* **!shit**: spiderman meme\n" +
                      "* **!weird**: spiderman meme\n" +
                      "* **!ready**: spiderman meme\n" +
                      "* **!obvious**: spiderman meme"                   );
    // Send the embed to the same channel as the message
    message.channel.send(embed);
  }
});



/**
 * Spiderman memes
 *
 */
client.on('message', message => {
  var meme = 'null';

  switch (message.content.toLowerCase()) {
    case '!ok':
      meme = new Discord.Attachment('https://cdn.glitch.com/28aadf99-0b65-416b-95e7-980e9b1655d2%2Fok.jpg');
      message.channel.send(meme);
      break;
    case '!shit':
      meme = new Discord.Attachment('https://cdn.glitch.com/28aadf99-0b65-416b-95e7-980e9b1655d2%2Fshit.jpg');
      message.channel.send(meme);
      break;
    case '!weird':
      meme = new Discord.Attachment('https://cdn.glitch.com/28aadf99-0b65-416b-95e7-980e9b1655d2%2Fweird.jpg');
      message.channel.send(meme);
      break;
    case '!ready':
      meme = new Discord.Attachment('https://cdn.glitch.com/28aadf99-0b65-416b-95e7-980e9b1655d2%2Fready.jpg');
      message.channel.send(meme);
      break;
    case '!obvious':
      meme = new Discord.Attachment('https://cdn.glitch.com/28aadf99-0b65-416b-95e7-980e9b1655d2%2FCaptain_Obvious.png');
      message.channel.send(meme);
      break;
  }

});


/**
 * Multiplayer Servers Information
 *
 */
client.on('message', message => {

  if(message.content.toLowerCase() === '!servers') {

    /**
     *  Updated information from all servers are stored here:
     *    forgottenhope.warumdarum.de/qstat/qstat_data.txt
     */
    var options = {
      host: 'forgottenhope.warumdarum.de',
      port: 80,
      path: '/qstat/qstat_data.txt'
    };

    var web_data = "", servers = new Array();

    http.get(options, function(res) {
      console.log("STATUS:" + res.statusCode);
      res.setEncoding('utf8');

      res.on('data', function (chunk) {
        web_data = chunk.split("\n");
        web_data = web_data.filter(Boolean);
        for (var i = 0; i < web_data.length; i++) {
          web_data[i] = web_data[i].trim();
          if (web_data[i].startsWith("GS")) {
            // Add server to the array replacing all " by white spaces so:
            //  GS3"78.46.106.75:16572"CMP Gaming #1"Pegasus"100"0"92"0
            // is stored as:
            //  GS3 78.46.106.75:16572 CMP Gaming #1 Pegasus 100 0 66 0
            var server = web_data[i].replace('GS3"', "");
            server = server.slice(server.indexOf('"')+1);
            server = server.slice(0, server.lastIndexOf('"'));
            server = server.replace(/"/g, " | ");
            servers.push(server);
          }
        }
      });

      res.on('end', function () {
        console.log (servers);
        var msg = "";

        for (var i = 0; i < servers.length; i++)
          msg += "\n\t"+servers[i]+"\n";

        if (msg === "")
          msg = "No servers found";
        else{
          msg = "```js" +
                "\n** Servers are displayed by server name, map name, max players, online players & ping **\n" +
                msg + "```";
        }

        message.channel.send(msg);
      });

    }).on('error', function(e) {
      console.log("ERROR:" + e.message);
    });

  }

});


/**
 * Log our bot in using the token from
 * https://discordapp.com/developers/applications/me
 */
client.login(token);
