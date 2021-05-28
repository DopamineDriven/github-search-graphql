import { FC } from 'react';
import SyntaxHighlighter, {
	SyntaxHighlighterProps,
	PrismAsync
} from 'react-syntax-highlighter';
import ReactMarkdown, { ReactNode } from 'react-markdown';
import gfm from 'remark-gfm';

const prismaNew = new PrismAsync({});
export type TextEnhancerProps = {
	className?: string;
	textToTransform: string;
	Highlighter?: {
		code({
			node,
			inline,
			className,
			children,
			...props
		}: SyntaxHighlighterProps): JSX.Element;
	};
};
const TextEnhancer: FC<TextEnhancerProps> = ({
	className,
	Highlighter,
	textToTransform,
	...props
}) => {
	Highlighter = {
		code({
			node,
			inline,
			className,
			children,
			...props
		}: SyntaxHighlighterProps) {
			const match = /language-(\w+)/.exec(className || '');
			return !inline && match ? (
				<SyntaxHighlighter
					style={prismaNew.props['customStyle']}
					language={match[1]}
					PreTag='div'
					children={String(children).replace(/\n$/, '')}
					{...props}
				/>
			) : (
				<code className={className} {...props} />
			);
		}
	};

	// reactmarkdown  was complaining about ReactNode being conditionally null -- plucked it out for a quick fix
	return (
		<>
			<ReactMarkdown
				className={className}
				skipHtml={false}
				children={textToTransform}
				remarkPlugins={[gfm]}
				components={Highlighter}
				{...(props as Omit<ReactNode, 'null'>)}
			/>
		</>
	);
};

export default TextEnhancer;
