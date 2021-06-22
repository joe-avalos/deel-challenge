const app = require('./app');

const NODE_PORT = process.env.NODE_PORT || '3001'

init();

async function init() {
  try {
    app.listen(NODE_PORT, () => {
      console.log(`Express App Listening on Port ${NODE_PORT}`);
    });
  } catch (error) {
    console.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}
