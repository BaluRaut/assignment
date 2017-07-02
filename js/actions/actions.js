import bcrypt from 'bcryptjs';
import { SET_AUTH, CHANGE_FORM, SENDING_REQUEST, SET_ERROR_MESSAGE } from '../constants/AppConstants';
import * as errorMessages from '../constants/MessageConstants';
import auth from '../utils/auth';
import genSalt from '../utils/salt';
import { browserHistory } from 'react-router';
export function login(username, password) {
    return (dispatch) => {
        dispatch(sendingRequest(true));
        if (anyElementsEmpty({ username, password })) {
            dispatch(setErrorMessage(errorMessages.FIELD_MISSING));
            dispatch(sendingRequest(false));
            return;
        }
        if(!validateEmail(username)){
          dispatch(setErrorMessage(errorMessages.EMAIL_ADDRESS_INVALID));
          dispatch(sendingRequest(false));
          return;
        }

        const salt = genSalt(username);
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
                return;
            }
            auth.login(username, hash, (success, err) => {
                dispatch(sendingRequest(false));
                dispatch(setAuthState(success));
                if (success === true) {
                    forwardTo('/dashboard');
                    dispatch(changeForm({
                        username: "",
                        password: ""
                    }));
                } else {
                    switch (err.type) {
                        case 'user-doesnt-exist':
                            dispatch(setErrorMessage(errorMessages.USER_NOT_FOUND));
                            return;
                        case 'password-wrong':
                            dispatch(setErrorMessage(errorMessages.WRONG_PASSWORD));
                            return;
                        default:
                            dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
                            return;
                    }
                }
            });
        });
    }
}

export function logout() {
  console.log("New  logout ");
    return (dispatch) => {
        dispatch(sendingRequest(true));
        auth.logout((success, err) => {
            if (success === true) {
                dispatch(sendingRequest(false))
                dispatch(setAuthState(false));
                  browserHistory.push('/');
            } else
             {
                dispatch(setErrorMessage(errorMessages.GENERAL_ERROR));
            }
        });
    }
}

export function setAuthState(newState) {
    return { type: SET_AUTH, newState };
}

/**
 * Sets the form state
 * @param  {object} newState          The new state of the form
 * @param  {string} newState.username The new text of the username input field of the form
 * @param  {string} newState.password The new text of the password input field of the form
 * @return {object}                   Formatted action for the reducer to handle
 */
export function changeForm(newState) {
    return { type: CHANGE_FORM, newState };
}
export function sendingRequest(sending) {
    return { type: SENDING_REQUEST, sending };
}
function setErrorMessage(message) {
    return (dispatch) => {
        dispatch({ type: SET_ERROR_MESSAGE, message });
        const form = document.querySelector('.form-page__form-wrapper');
        if (form) {
            form.classList.add('js-form__err-animation');
            setTimeout(() => {
                form.classList.remove('js-form__err-animation');
            }, 150);
            setTimeout(() => {
                dispatch({ type: SET_ERROR_MESSAGE, message: '' });
            }, 10000);
        }
    }
}
function forwardTo(location) {
    console.log('forwardTo(' + location + ')');
    browserHistory.push(location);
}
function validateEmail(value) {
   var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return re.test(value);
 }
function anyElementsEmpty(elements) {
    for (let element in elements) {
        if (!elements[element]) {
            return true;
        }
    }
    return false;
}
