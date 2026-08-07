import i18n from 'ReactI18';

export const onboardingHelpMessage = (
	dataSourceName: string,
	moduleId: string,
): string =>
	i18n.t(
		'launch_chat_support.help_message',
		`Hi Team,

I am facing issues sending data to SigNoz. Here are my application details

Data Source: {{dataSourceName}}
Framework:
Environment:
Module: {{moduleId}}

Thanks
`,
		{ ns: 'common', dataSourceName, moduleId },
	);
