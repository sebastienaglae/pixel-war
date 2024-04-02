import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
export const apiURL = "http://localhost:3001";

export const socket = io(apiURL, {
  //autoConnect: false // Could be useful : if enabled, use socket.connect() in situation where user need provide credentials
});
