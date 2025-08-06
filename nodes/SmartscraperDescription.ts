import type { INodeProperties } from 'n8n-workflow';

export const smartscraperOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['smartscraper'],
			},
		},
		options: [
			{
				name: 'Scrape',
				value: 'scrape',
				action: 'Autonomously extract live data from any website – perfect for e-commerce, job boards & lead capture and more',
			},
		],
		default: 'scrape',
	},
];

export const smartscraperFields: INodeProperties[] = [
	{
		displayName: 'Website URL',
		name: 'websiteUrl',
		type: 'string',
		required: true,
		default: '',
		description: 'URL of the website to scrape',
		displayOptions: {
			show: {
				resource: ['smartscraper'],
				operation: ['scrape'],
			},
		},
	},
	{
		displayName: 'User Prompt',
		name: 'userPrompt',
		type: 'string',
		required: true,
		default: '',
		description: 'Instructions for what data to extract from the website',
		displayOptions: {
			show: {
				resource: ['smartscraper'],
				operation: ['scrape'],
			},
		},
	},
]; 