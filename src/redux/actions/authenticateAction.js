import { authenticateActions } from "../reducers/authenticateReducer";
function login(id, password) {
  return (dispatch) => {
    console.log("LOGIN SUCCESS");
    dispatch(authenticateActions.login({ id, password }));
  };
}
function logout() {
  return (dispatch) => {
    dispatch(authenticateActions.logout());
  };
}

export const authenticateAction = { login, logout };
