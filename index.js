const express = require("express");
const app = express();

// CONFIG
require("./config/dotenv")();
require("./config/sessions")(app);
require("./config/flash")(app);
require("./config/mongo")();
require("./config/formidable")(app);
require("./config/views")(app);
require("./config/static-folder")(app, express);

// ROUTES
require("./routes/main.route")(app);

require("./server")(app);
