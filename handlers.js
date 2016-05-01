function messageHandler(dispatch, body) {
  console.log('messageHandler', body);

  dispatch('messageCreated', `He said ${body.payload}`);
}

function messageCreatedHandler(data) {
  const actionName = data['actionName'];
  const payload = data['payload'];

  console.log(`messageCreatedHandler ${actionName}`, payload);
}

function messageCreateddHandler() {}

module.exports = {
  messageHandler,
  messageCreatedHandler,
  messageCreateddHandler
}