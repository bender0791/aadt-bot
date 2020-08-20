const {google} = require('googleapis');
const token = require("../token.json");
const credentials = require("../credentials.json");
const sheets = google.sheets('v4');
const table = require('markdown-table');

module.exports = {
    name: 'awtracker',
    description: 'Alliance War Participation Tracker',
    guildOnly: true,
    aliases: ['awt'],
    async execute(message, args) {
      const authClient = await authorize();
      const request = {
        spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
        range: 'AW Tracker!A1:B18',
        valueRenderOption: 'FORMATTED_VALUE',    
        auth: authClient,
      };
      try {
        const response = (await sheets.spreadsheets.values.get(request)).data;
        const msg = `\`\`\`${table(response.values, {align: ['l', 'c', 'c']})}\`\`\``;
        message.channel.send(msg);
      } catch (err) {
        console.error(err);
      }

      async function authorize() {
        const { client_secret, client_id, redirect_uris } = credentials.installed;
        const authClient = new google.auth.OAuth2(
          client_id,
          client_secret,
          redirect_uris[0]
        );
        authClient.setCredentials(token); 
        return authClient;
      }
  }
}
