import {
	GetStaticPathsContext,
	GetStaticPropsResult,
	GetStaticPropsContext,
	InferGetStaticPropsType
} from 'next';
import { parseUrl } from '@/lib/url';
import { useRouter } from 'next/router';
