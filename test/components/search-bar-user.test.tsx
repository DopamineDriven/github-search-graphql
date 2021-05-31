import React from 'react';
import SearchUser from '../../components/Layout/SearchUser/search-user';
import { render } from '@testing-library/react';
import { mockNextUseRouter } from '../testUtils';

const useRouter = jest.spyOn(
	require('next/router'),
	'useRouter'
);
describe('searchbar', () => {
	mockNextUseRouter({
		async prefetch(
			url: '/r/[display_name]',
			asPath: any,
			options: {
				priority: true;
			}
		) {
			() => url;
			() => asPath;
			() => options;
		},
		route: '/repos/[login]',
		pathname: '/DopamineDriven',
		query: 'login',
		asPath: `/repos/login?login=${encodeURIComponent(
			'DopamineDriven'
		)}`
	});
	it('matches snapshot', () => {
		useRouter.mockImplementationOnce(() => ({
			prefetch: { login: '/repos/[login]' || undefined }
		}));
		const { container } = render(<SearchUser />);
		expect(
			container
				.getElementsByTagName('input')
				.namedItem('repos/')
		);
		expect(container).toMatchSnapshot();
	});
});
