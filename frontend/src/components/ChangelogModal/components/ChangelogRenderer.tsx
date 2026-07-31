import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import dayjs from 'dayjs';
import {
	ChangelogSchema,
	Media,
	SupportedImageTypes,
	SupportedVideoTypes,
} from 'types/api/changelog/getChangelogByVersion';

import './ChangelogRenderer.styles.scss';

interface Props {
	changelog: ChangelogSchema;
}

function ChangelogRenderer({ changelog }: Props): JSX.Element {
	const { t } = useTranslation('common');
	const formattedReleaseDate = dayjs(changelog.release_date).format(
		'MMMM D, YYYY',
	);

	function renderMedia(media: Media): JSX.Element | null {
		if (SupportedImageTypes.includes(media.ext)) {
			return (
				<img
					src={media.url}
					alt={media.alternativeText || t('changelog_renderer.media_alt')}
					width={800}
					height={450}
					className="changelog-media-image"
				/>
			);
		}
		if (SupportedVideoTypes.includes(media.ext)) {
			return (
				<video
					autoPlay
					controls
					controlsList="nodownload noplaybackrate"
					loop
					className="changelog-media-video"
				>
					<source src={media.url} type={media.mime} />
					<track
						kind="captions"
						src=""
						label={t('changelog_renderer.no_captions')}
						default
					/>
					{t('changelog_renderer.video_not_supported')}
				</video>
			);
		}

		return null;
	}

	return (
		<div className="changelog-renderer">
			<div className="changelog-renderer-line">
				<div className="inner-ball" />
			</div>
			<span className="changelog-release-date">{formattedReleaseDate}</span>
			<div className="changelog-renderer-content">
				{changelog.features && changelog.features.length > 0 && (
					<div className="changelog-renderer-list">
						{changelog.features.map((feature) => (
							<div key={feature.id}>
								<div className="changelog-renderer-section-title">{feature.title}</div>
								{feature.media && renderMedia(feature.media)}
								<ReactMarkdown>{feature.description}</ReactMarkdown>
							</div>
						))}
					</div>
				)}
				{changelog.bug_fixes && changelog.bug_fixes.length > 0 && (
					<div className="changelog-renderer-bug-fixes">
						<div className="changelog-renderer-section-title">
							{t('changelog_renderer.bug_fixes')}
						</div>
						{changelog.bug_fixes && (
							<ReactMarkdown>{changelog.bug_fixes}</ReactMarkdown>
						)}
					</div>
				)}
				{changelog.maintenance && changelog.maintenance.length > 0 && (
					<div className="changelog-renderer-maintenance">
						<div className="changelog-renderer-section-title">
							{t('changelog_renderer.maintenance')}
						</div>
						{changelog.maintenance && (
							<ReactMarkdown>{changelog.maintenance}</ReactMarkdown>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

export default ChangelogRenderer;
