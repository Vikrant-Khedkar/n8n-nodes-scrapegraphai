import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ScrapegraphAIApi implements ICredentialType {
	name = 'scrapegraphAIApi';
	displayName = 'ScrapegraphAI API';
	documentationUrl = 'https://docs.scrapegraphai.com/';
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
			baseURL: 'https://api.scrapegraphai.com/v1',
			url: '/validate',
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'SGAI-APIKEY': '={{$credentials.apiKey}}',
				'User-Agent': 'n8n',
			}
		},
	};
}

export default ScrapegraphAIApi; 