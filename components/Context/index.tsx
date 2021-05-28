import React, {
	FC,
	useMemo,
	createContext,
	useContext
} from 'react';
import { ThemeProvider } from 'next-themes';

export interface State {
	displayModal: boolean;
	modalView: string;
	userAvatar: string;
}

const initialState: State = {
	displayModal: false,
	modalView: 'LOGIN_VIEW',
	userAvatar: ''
};

export type Action =
	| {
			type: 'OPEN_MODAL';
	  }
	| {
			type: 'CLOSE_MODAL';
	  }
	| {
			type: 'SET_MODAL_VIEW';
			view: MODAL_VIEWS;
	  }
	| {
			type: 'SET_USER_AVATAR';
			value: string;
	  };

/**
 * Intend to incorporate Auth over the weekend for GitHub SSO
 */
export type MODAL_VIEWS =
	| 'LOGIN_VIEW'
	| 'FORGOT_VIEW'
	| 'SIGNUP_VIEW';

export const GlobalContext: React.Context<State | any> =
	createContext<State | any>(initialState);

GlobalContext.displayName = 'GlobalContext';

function globalReducer(state: State, action: Action) {
	switch (action.type) {
		case 'OPEN_MODAL': {
			return {
				...state,
				displayModal: true
			};
		}
		case 'CLOSE_MODAL': {
			return {
				...state,
				displayModal: false
			};
		}
		case 'SET_MODAL_VIEW': {
			return {
				...state,
				modalView: action.view
			};
		}
		case 'SET_USER_AVATAR': {
			return {
				...state,
				userAvatar: action.value
			};
		}
	}
}

export type GlobalProviderProps = {
	value?: {
		openModal: () => void;
		closeModal: () => void;
		setModalView: (view: MODAL_VIEWS) => void;
		setUserAvatar: (value: string) => void;
		displayModal: boolean;
		modalView: string;
		userAvatar: string;
	};
};

export const GlobalProvider: FC<GlobalProviderProps> =
	props => {
		const [state, dispatch] = React.useReducer(
			globalReducer,
			initialState
		);

		const openModal = () => dispatch({ type: 'OPEN_MODAL' });
		const closeModal = () =>
			dispatch({ type: 'CLOSE_MODAL' });

		const setModalView = (view: MODAL_VIEWS) =>
			dispatch({ type: 'SET_MODAL_VIEW', view });

		const setUserAvatar = (value: string) =>
			dispatch({ type: 'SET_USER_AVATAR', value });

		const value = useMemo(
			() => ({
				...state,
				openModal,
				closeModal,
				setModalView,
				setUserAvatar
			}),
			[state]
		);
		return (
			<GlobalContext.Provider value={value} {...props} />
		);
	};

export const useGlobal = () => {
	const context = useContext(GlobalContext);
	if (context === undefined) {
		throw new Error(
			'GlobalContext must be consumed within a Provider'
		);
	}
	return context;
};

export const ManagedGlobalContext: FC = ({ children }) => {
	return (
		<GlobalProvider>
			<ThemeProvider>{children}</ThemeProvider>
		</GlobalProvider>
	);
};
