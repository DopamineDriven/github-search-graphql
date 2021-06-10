import {
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	InferGetServerSidePropsType
} from 'next';
import { AppLayout } from '@/components/Layout';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetchers';
// https://egghead.io/lessons/http-add-github-authorization-to-an-oauth-client-app
