import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import logEvent from 'api/common/logEvent';
import LearnMore from 'components/LearnMore/LearnMore';

import './NotCloudFallback.styles.scss';
import { MCP_DOCS_URL } from '../clients';

const DOCS_LINK_EVENT = 'MCP Settings: Docs link clicked';

function NotCloudFallback(): JSX.Element {
	const { t } = useTranslation('mcp_server');

	const handleDocsClick = useCallback(() => {
		void logEvent(DOCS_LINK_EVENT, { target: 'fallback' });
	}, []);

	return (
		<div className="not-cloud-fallback">
			<div className="not-cloud-fallback__content">
				<h2 className="not-cloud-fallback__title">
					{t('not_cloud.title', 'MCP Server is available on SigNoz')}
				</h2>
				<p className="not-cloud-fallback__body">
					{t(
						'not_cloud.body',
						'Users can follow the docs to setup the MCP server against their SigNoz instance.',
					)}
				</p>
				<LearnMore
					text={t('not_cloud.view_docs', 'View MCP Server docs')}
					url={MCP_DOCS_URL}
					onClick={handleDocsClick}
				/>
			</div>
		</div>
	);
}

export default NotCloudFallback;
