import * as constants from "./layout.constant";

export const changeStateNavUserMenu = (payload, callback) => ({
  type: constants.CHANGE_STATE_NAV_USER_MENU,
  payload,
  callback,
});