
import { IUserInfo } from './index';
import { AnyAction } from 'redux';

export const AAD_LOGIN_SUCCESS: string = 'AAD_LOGIN_SUCCESS';

export const loginSuccessful = (data: IUserInfo): AnyAction => {
	return {
		type: AAD_LOGIN_SUCCESS,
		payload: data
	}
}