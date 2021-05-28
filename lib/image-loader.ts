import { ImageLoaderProps } from 'next/image';

// per Next v10.1+ documentation
export const ImageLoader = ({
	src,
	width,
	quality
}: ImageLoaderProps) => {
	return `${src}?w=${width}&q=${quality || 80}`;
};
