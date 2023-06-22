import { OpenAIAgent } from 'app/lib/open-ai';
import { OpenAIFunction } from 'app/lib/open-ai';
import * as dotenv from 'dotenv';
dotenv.config();

const ApiKey = process.env.OPENAI_API_KEY || '';
const myModel = process.env.OPENAI_MODEL || '';
const myAgent = new OpenAIAgent(ApiKey);

class MyFunctions {
	@OpenAIFunction('Searches the internet using SerpApi to get search results', {
		query: {
			type: 'string',
			description: 'The search query',
			required: true,
		},
	})
	async searchInternet(query: string): Promise<string> {
		return new Promise(resolve => {
			resolve('Nick');
		});
	}
}

async function initAgent() {
	// Provide your functions to the agent
	const result = await myAgent.runAgent(
		"search the internet for 'best AI tools'",
		[new MyFunctions()]
	);

	console.log(result);
}

initAgent();
