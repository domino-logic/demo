function messageHandler(body, dispatch) {
  console.log('messageHandler', body);

  dispatch('messageCreated', `He said ${body.payload}`);
}

function messageCreatedHandler(data, broadcast) {
  const actionName = data['actionName'];
  const payload = data['payload'];

  console.log(`messageCreatedHandler ${actionName}`, payload);

  broadcast('message.createdMessage', payload)
}

function messageCreateddHandler() {}

module.exports = {
  messageHandler,
  messageCreatedHandler,
  messageCreateddHandler
}