const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: true });
const ms = require("ms");
const fs = require("fs");

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online and protecting ${bot.guilds.size} servers!`);
  bot.user.setActivity(`chefs chop salad`, {type: "WATCHING"});
});

bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let prefix = botconfig.prefix
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if (cmd === `${prefix}redeem`) {
    return message.channel.send("Currently, redemptions are manually performed by the Salad team and therefore take a bit to reach your inbox. Please allow 24 hours for us to deliver your rewards; afterwards, please contact Salad Support and we will either refund you or resolve your redemption issue.");
  }

  if (cmd === `${prefix}supportedgpus`) {
    let supportedgpus = new Discord.RichEmbed()
      .setDescription("__**SUPPORTED GPUs**__")
      .setColor("#50f442")
      .addField("__**AMD**__", "AMD Radeon 470 Graphics\nAMD Radeon RX 580 Series\nAMD Radeon RX 570 Series\nAMD Radeon VII 16GB\nAMD Radeon Vega 64\nAMD Radeon Vega 56")
      .addField("__**NVIDIA**__", "GeForce GTX 1050 Ti\nGeForce GTX 1060 6GB\nGeForce GTX 1060 with Max-Q Design\nGeForce GTX 1070\nGeForce GTX 1070 Ti\nGeForce GTX 1080\nGeForce GTX 1080 Ti\nGeForce GTX 970\nGeForce GTX 980 Ti\nGeForce RTX 2080\nGeForce Tesla M60 16GB\nGeForce RTX 2080 Ti\nGeForce RTX 2070\nGeForce RTX 2070 Ti\nGeForce GTX 2060\nTITAN V\nTITAN XP\nGeForce GTX 980\nQuadro P5000");

      return message.channel.send(supportedgpus);
    }

  if (cmd === `${prefix}international`) {
    let international = new Discord.RichEmbed()
      .setDescription("Information you may need if you are not based in the   United Stats of America:")
      .setColor("#50f442")
      .addField("__**Shipping**__", "Unfortunately, we cannot ship our rewards internationally yet.")
      .addField("__**Game Codes**__", "Most of our gift cards are for U.S. use only. Read the “checkout details” for region information.");

    return message.channel.send("We love our chefs from abroad, and while you may be earning more profit with Salad due to electricity rates, there are some drawbacks for Chefs outside of the U.S. These are:")
      .then(msg => {
        message.channel.send(international)
        .then(msg => {
          message.channel.send("We hope to solve these issues soon with local purchases and global gift cards/codes. Let us know if you have any ideas, we’d love to hear from you!");
        });
    });
  }

  if (cmd === `${prefix}faq`) {
    return message.channel.send("If you can’t find the answers you’re looking for here, try checking out our full company FAQ on Zendesk : https://salad.zendesk.com/hc/en-us");
  }

  if (cmd === `${prefix}earnings`) {
    let earnings = new Discord.RichEmbed()
      .setDescription("__**LINKS**__")
      .setColor("#50f442")
      .addField("How much can I earn with salad?","https://salad.zendesk.com/hc/en-us/articles/360018704652-How-much-can-I-earn-with-Salad-")
      .addField("How can I earn more with Salad?", "https://salad.zendesk.com/hc/en-us/articles/360019038251-How-can-I-earn-more-with-Salad-")
      .addField("How does Salad mine cryptocurrency?", "https://salad.zendesk.com/hc/en-us/articles/360019038151-Does-Salad-mine-Cryptocurrency-");

    return message.channel.send("Your Salad earnings are generated by verifying blockchain transactions on the Ethereum network (aka mining). This means that the more powerful your GPU, the better your earning rate. Currently Salad is currently boosting your earning rate. Once this is turned down less and less, you may earn less then what you do now. Check here for more info:")
      .then(msg => {
        message.channel.send(earnings);
      });
  }

  if (cmd === `${prefix}systemreqs`) {
    let systemreq = new Discord.RichEmbed()
      .setDescription("System Requirements")
      .setColor("#50f442")
      .addField("__**GPU REQUIREMENTS**__", "**Supported 4GB+ VRAM GPU**")
      .addField("__**Operating System**__", " **Windows 7 or Windows 10**")
      .addField("__**CONNECTIVITY**__", "**Working Internet Connection**");

    return message.channel.send(systemreq);
  }

  if (cmd === `${prefix}supportticket`) {
    let supportticket1 = ("To log your support issue and get our engineers working on it, please copy the format below, fill it in with your bug information, and send it to Salad Support to generate a support ticket.");
    let supportticket2 = new Discord.RichEmbed()
      .setDescription("__**Template for a Support Ticket**__")
      .setColor("#50f442")
      .addField("__**Description**__", "- OS\n- GPU\n- App Version\n- User ID or Email (Email = the one you signed up to use Salad")
      .addField("__**Actual Behavior**__", "*Example* \n I should be able to scroll back up at the same rate and responsive that I scrolled down the carousel")
      .addField("__**Expected Behavior (Optional)**__", "*Example*\nI should be able to scroll back up at the same rate and responsive that I scrolled down the carousel")
      .addField("__**Attachments**__", "*When applicable, attach the following:*\n- Logs\n- Video\n- Screenshots");

    return message.channel.send(supportticket1)
      .then(msg => {
        message.channel.send(supportticket2);
      });
  }

  if (cmd === `${prefix}findgpu`) {
    return message.channel.send("If you don’t know what GPU model you have, follow this easy process to find out:\n\n**1.** Search for “Device Manager” in your windows searchbar\n**2.** Open Device Manager (should be under Control Panel)\n**3.** Find the “Display Adapters” tab and double-click it\n**4.** 4. Your GPU model should be displayed there.");
  }

  if (cmd === `${prefix}help`) {
    let help = new Discord.RichEmbed()
      .setDescription("__**List of Commands**__")
      .setColor("#50f442")
      .addField("__**#supportticket**__", "Find out how to get help with errors not covered in the FAQ channel or `#faq`'s links")
      .addField("__**#systemreqs**__", "View what specs Salad requires to run")
      .addField("__**#international**__", "If you're not based in the USA, you might need this info")
      .addField("__**#earnings**__", "See how Salad uses your GPU to make you money")
      .addField("__**#faq**__", "Look for solutions to a problem you might have!")
      .addField("__**#findgpu**__", "If you don't know your GPU's model, use this command to see a method on how to find that out")
      .addField("__**#supportedgpus**__", "View what GPUs Salad supports")
      .addField("__**#redeem**__", "Information on redeeming your gift cards!");

    return message.channel.send(help)
      .then(msg => {
        message.channel.send("Thank you for using Salad and our services!");
      })
  };
});

bot.login(botconfig.token);