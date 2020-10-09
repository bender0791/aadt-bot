const Discord = require('discord.js');

module.exports = {
    name: 'aq6maps',
    description: 'AQ Map 6 - Maps',
    guildOnly: true,
    execute(message, args) {
      try {
        const msg = {
          color: 0x00aaff,
          title: 'AQ Map 6 - Paths',
          description: 'Links to maps for AQ Map 6 by Cat Murdock!',
          fields: [
            {
              name: 'Variant 1 - Vision (Aarkus) / Nova',
              value: '[Section 1](https://drive.google.com/file/d/1bCG3kVl7r9Ub-fd4y44CZZDGXIYhE4Zy/view?usp=sharing)\n[Section 2](https://drive.google.com/file/d/18Kewny9yMGD0B_lDbgvb6lItEzicxLqD/view?usp=sharing)\n[Section 3](https://drive.google.com/file/d/1mrZHnpqm0LmMiikJe-E2qUDJ4WVAUVpQ/view?usp=sharing)'
            },
            {
              name: 'Variant 2 - Invisble Woman',
              value: '[Section 1](https://drive.google.com/file/d/1MZm5YQl713WlINv5z4ALBWTPAviHnFPF/view?usp=sharing)\n[Section 2](https://drive.google.com/file/d/1GmbIbg5HNsIYRbr98XdbiS1JrhnNyIXw/view?usp=sharing)\n[Section 3](https://drive.google.com/file/d/12TAYzN78HKVvXdGYNAqzTfAlLukgjf4u/view?usp=sharing)'
            }
          ]
        }
        message.channel.send({ embed: msg });
      } catch (err) {
        console.error(err);
      }
  }
}
