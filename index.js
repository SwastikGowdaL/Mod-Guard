const app = require('./app');
const nsfwLoadModels = require('./components/modGuard/imageModeration');

require('dotenv').config();

const port = process.env.PORT || 3001;

nsfwLoadModels.load_model().then(() =>
  app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
  })
);
