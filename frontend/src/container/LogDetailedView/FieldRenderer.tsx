import { useTranslation } from 'react-i18next';
import { Divider } from '@signozhq/ui/divider';
import { TooltipSimple } from '@signozhq/ui/tooltip';
import { Typography } from '@signozhq/ui/typography';

import { TagContainer, TagLabel, TagValue } from './FieldRenderer.styles';
import { FieldRendererProps } from './LogDetailedView.types';
import { getFieldAttributes } from './utils';

import './FieldRenderer.styles.scss';

const TOOLTIP_CONTENT_PROPS = {
	className: 'field-renderer-tooltip-content',
};

function FieldRenderer({ field }: FieldRendererProps): JSX.Element {
	const { t } = useTranslation('common');
	const { dataType, newField, logType } = getFieldAttributes(field);

	return (
		<span className="field-renderer-container">
			{dataType && newField && logType ? (
				<>
					<TooltipSimple
						title={newField}
						side="left"
						tooltipContentProps={TOOLTIP_CONTENT_PROPS}
						arrow
					>
						<Typography.Text truncate={1} className="label">
							{newField}{' '}
						</Typography.Text>
					</TooltipSimple>

					<div className="tags">
						<TagContainer>
							<TagLabel>
								{t('type', { ns: 'common' })}
								<Divider type="vertical" />{' '}
							</TagLabel>
							<TagValue>{logType}</TagValue>
						</TagContainer>
						<TagContainer>
							<TagLabel>
								{t('data_type', { ns: 'common' })} <Divider type="vertical" />{' '}
							</TagLabel>
							<TagValue>{dataType}</TagValue>
						</TagContainer>
					</div>
				</>
			) : (
				<span className="label">{field}</span>
			)}
		</span>
	);
}

export default FieldRenderer;
