
import { AnyAction } from 'redux';
import { IUserInfo } from './index';

export const AAD_LOGIN_SUCCESS: string = 'AAD_LOGIN_SUCCESS';

export const loginSuccessful = (data: IUserInfo): AnyAction => {
	return {
		payload: data,
		type: AAD_LOGIN_SUCCESS
	}
}