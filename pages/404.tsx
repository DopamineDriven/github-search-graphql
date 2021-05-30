import { Container } from '@/components/UI';
import { NotFound } from '@/components/NotFound';
import { AppLayout } from '@/components/Layout';
// import { useRouter } from 'next/router';

export default function SOS() {
	// const router = useRouter();
	// router.back();
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
