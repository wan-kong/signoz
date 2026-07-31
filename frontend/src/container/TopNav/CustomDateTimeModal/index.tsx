import { Dispatch, SetStateAction, useState } from 'react';
import { DatePicker, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import dayjs, { Dayjs } from 'dayjs';

export type DateTimeRangeType = [Dayjs | null, Dayjs | null] | null;

const { RangePicker } = DatePicker;

function CustomDateTimeModal({
	visible,
	onCreate,
	onCancel,
	setCustomDTPickerVisible,
}: CustomDateTimeModalProps): JSX.Element {
	const { t: translate } = useTranslation('common');
	const t = (key: string): string => String(translate(key));
	const [selectedDate, setDateTime] = useState<DateTimeRangeType>();

	const onModalOkHandler = (date_time: any): void => {
		setDateTime(date_time);
	};

	// Using any type here because antd's DatePicker expects its own internal Dayjs type
	// which conflicts with our project's Dayjs type that has additional plugins (tz, utc etc).
	const disabledDate = (current: any): boolean => {
		const currentDay = dayjs(current);
		return currentDay.isAfter(dayjs());
	};

	const onOk = (): void => {
		if (selectedDate) {
			onCreate(selectedDate);
			setCustomDTPickerVisible(false);
		}
	};

	return (
		<Modal
			open={visible}
			title={t('time.choose_date_time_range')}
			okText={t('time.apply')}
			cancelText={t('time.cancel')}
			onCancel={onCancel}
			onOk={onOk}
		>
			<RangePicker
				disabledDate={disabledDate}
				allowClear
				onOk={onModalOkHandler}
				onCalendarChange={onModalOkHandler}
			/>
		</Modal>
	);
}

interface CustomDateTimeModalProps {
	visible: boolean;
	onCreate: (dateTimeRange: DateTimeRangeType) => void;
	onCancel: () => void;
	setCustomDTPickerVisible: Dispatch<SetStateAction<boolean>>;
}

export default CustomDateTimeModal;
