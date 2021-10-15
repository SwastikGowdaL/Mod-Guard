const modGuardServices = require('./modGuardServices');
const publisher = require('./publishers/modGuardPublisher');

const modGuard = async (req, res) => {
  try {
    let response = {};
    const moderationData = JSON.parse(JSON.stringify(req.body));

    //* checking whether the user selected strategy 1 (API strategy) or strategy 2 (PubSub strategy)
    if (moderationData.strategy === '1') {
      if (req.file) {
        response = await modGuardServices(moderationData, req.file.buffer);
      } else {
        response = await modGuardServices(moderationData, undefined);
      }
      if (Object.prototype.hasOwnProperty.call(moderationData, 'metadata')) {
        response.metadata = req.body.metadata;
      }
      res.status(200).send(response);
    } else if (moderationData.strategy === '2') {
      if (req.file) {
        moderationData.image_file = req.file.buffer;
        await publisher.moderationDataPublisher(moderationData);
      } else {
        await publisher.moderationDataPublisher(moderationData);
      }
      res.status(200).send({
        status: 'success',
        message: 'moderation data enqueued',
      });
    }
  } catch (err) {
    res.status(400).send({
      status: 'error',
      message: err.message,
    });
  }
};

const modGuardPubCon = async (req, res) => {
  try {
    const moderationData = JSON.parse(JSON.stringify(req.body));
    if (req.file) {
      moderationData.image_file = req.file.buffer;
      await publisher.moderationDataPublisher(moderationData);
    } else {
      await publisher.moderationDataPublisher(moderationData);
    }
    res.status(200).send({
      status: 'success',
      message: 'moderation data enqueued',
    });
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
  modGuardPubCon,
};
