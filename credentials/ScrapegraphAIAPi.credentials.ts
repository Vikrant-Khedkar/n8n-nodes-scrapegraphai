import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ScrapegraphAIApi implements ICredentialType {
	name = 'scrapegraphAIApi';
	displayName = 'ScrapegraphAI API';
	documentationUrl = 'https://www.scrapegraph.ai/docs';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-API-Key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.scrapegraph.ai',
			url: '/markdownify',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-API-Key': '={{$credentials.apiKey}}',
				'User-Agent': 'n8n',
			},
			body: {
				website_url: 'https://scrapegraph.ai',
			},
		},
	};
}

export default ScrapegraphAIApi; 