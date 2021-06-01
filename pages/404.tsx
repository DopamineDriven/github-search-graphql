import { Container } from '@/components/UI';
import { NotFound } from '@/components/NotFound';
import { AppLayout } from '@/components/Layout';

export default function SOS() {
	return (
		<>
			<AppLayout title={'404'}>
				<Container clean className='fit'>
					<NotFound />
				</Container>
			</AppLayout>
		</>
	);
}
