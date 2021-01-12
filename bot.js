const Discord = require('discord.js');
const { graphql } = require("@octokit/graphql");
const { prefix, botToken, ghToken, owner, repo } = require('./config.json');

const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});
client.on('message', async (message) => {
	if (message.content.startsWith(`${prefix}prs`)) {
		const { repository } = await graphql(
			`query openPrCount($owner: String!, $name: String!){
				repository(owner: $owner, name: $name) {
					pullRequests(first: 100, states: OPEN) {
						nodes {
							title
							isDraft
						}
					}
				}
			}`, {
				owner: owner,
				name: repo,
				headers: {
					authorization: `token ${ghToken}`,
				}
			}
		);
		repos = repository.pullRequests.nodes;
		message.channel.send(`Open PRs: ${repos.length}`)
	}
});

client.login(botToken);
