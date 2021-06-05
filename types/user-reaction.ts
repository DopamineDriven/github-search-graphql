import { Maybe, Reaction, User } from '@/graphql/graphql';

export type EmojiOptions =
	| ''
	| '👍'
	| '👎'
	| '🤣'
	| '❤'
	| '👀'
	| '🚀'
	| '🎉'
	| '😕';

export type ReactType = {
	react: {
		__typename?: 'Reaction';
	} & Pick<Reaction, 'createdAt' | 'content'> & {
			user?: Maybe<
				{
					__typename?: 'User';
				} & Pick<
					User,
					'avatarUrl' | 'login' | 'url' | 'twitterUsername'
				>
			>;
		};
};
