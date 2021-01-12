const Discord = require('discord.js');
const { graphql } = require("@octokit/graphql");
const { prefix, botToken, ghToken } = require('./config.json');

const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});
client.on('message', async (message) => {
	if (message.content.startsWith(`${prefix}prs`)) {
		const graphqlWithAuth = graphql.defaults({
			headers: {
				authorization: `token ${ghToken}`,
			},
		});
		const { repository } = await graphqlWithAuth(
			`query{
				repository(owner: "serkonda7", name: "pr-count-poke-bot") {
					pullRequests(first: 100, states: OPEN) {
						nodes {
							title
							isDraft
						}
					}
				}
			}`
		);
		repos = repository.pullRequests.nodes;
		console.log(repos)
	}
});

client.login(botToken);
