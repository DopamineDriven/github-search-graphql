import { FC, useRef, useEffect, useCallback } from 'react';
import css from './modal.module.css';
import Portal from '@reach/portal';
import { X } from '../Icons';
import {
	disableBodyScroll,
	enableBodyScroll,
	clearAllBodyScrollLocks
} from 'body-scroll-lock';
import FocusTrap from '@/lib/focus-trap';
import Button from '../Button';

interface ModalProps {
	className?: string;
	children?: any;
	open?: boolean;
	onClose: () => void;
	onEnter?: () => void | null;
}
const Modal: FC<ModalProps> = ({
	children,
	open,
	onClose,
	onEnter = null
}) => {
	const ref =
		useRef() as React.MutableRefObject<HTMLDivElement>;

	const handleKey = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				return onClose();
			}
		},
		[onClose]
	);

	useEffect(() => {
		if (ref.current) {
			if (open) {
				disableBodyScroll(ref.current);
				window.addEventListener('keydown', handleKey);
			} else {
				enableBodyScroll(ref.current);
			}
		}
		return () => {
			window.removeEventListener('keydown', handleKey);
			clearAllBodyScrollLocks();
		};
	}, [open, handleKey]);

	return (
		<Portal>
			{open ? (
				<div className={css.root}>
					<div className={css.modal} role='dialog' ref={ref}>
						<Button
							onClick={() => onClose()}
							aria-label='Close panel'
							className='rounded-full duration-150 focus:outline-none absolute origin-top-right -right-4 -top-1 bg-transparent z-150'
						>
							<X className='relative float-right z-150' />
						</Button>

						<FocusTrap focusFirst>{children}</FocusTrap>
					</div>
				</div>
			) : null}
		</Portal>
	);
};

export default Modal;
