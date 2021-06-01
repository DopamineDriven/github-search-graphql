export const UniversalGA =
	process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ?? '';

export const pageview = <
	P extends UniversalAnalytics.FieldsObject
>(
	url: P
) => {
	window.location !== undefined
		? window.ga('config', UniversalGA, {
				page: url ?? ''
		  })
		: ga('config', UniversalGA, {
				page: url ?? ''
		  });
};

export const event = <
	P extends UniversalAnalytics.FieldsObject
>({
	eventAction,
	eventCategory,
	eventLabel,
	eventValue
}: P): void => {
	window.ga('event', eventAction ?? '', {
		eventCategory: eventCategory ?? '',
		eventLabel: eventLabel ?? '',
		eventValue: eventValue ?? ''
	});
};

// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/google.analytics/index.d.ts
