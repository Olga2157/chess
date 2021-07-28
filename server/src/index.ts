import { ChessServer } from "./ChessServer";

let app = new ChessServer().getApp();
let errorHandler = require('errorhandler')
app.use(errorHandler({ dumpExceptions: true, showStack: true }));

export { app };
