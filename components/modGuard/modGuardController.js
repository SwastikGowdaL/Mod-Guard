const modGuardServices = require('./modGuardServices');

const modGuard = async (req, res) => {
  try {
    let response = {};
    const moderationData = JSON.parse(JSON.stringify(req.body));

    //* checking whether the user selected strategy 1 (API strategy)
    if (moderationData.strategy === '1') {
      if (req.file) {
        response = await modGuardServices(moderationData, req.file.buffer);
      } else {
        response = await modGuardServices(moderationData, undefined);
      }

      res.status(200).send(response);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({
      status: 'error',
      message: err.message,
    });
  }
};

module.exports = {
  modGuard,
};
