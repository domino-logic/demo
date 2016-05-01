
'use strict';


const cluster = require('cluster')
const numCPUs = require('os').cpus().length
const DWS = require('domino-web-service');
const DAS = require('domino-actor-service');

const handlers = require('./handlers')


if(cluster.isMaster){
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  new DWS.createSocketServer({port: 6001}).start()
  new DWS.createSocketServer({port: 6002}).start()
  new DWS.createSocketServer({port: 6003}).start()
  new DWS.createSocketServer({port: 6004}).start()

  cluster.on('exit', (worker, code, signal) => {
    console.log("worker #{worker.process.pid} died")
  });


  const app = new DAS.ActionHandler();

  app.start( (err, app) => {
    app
    .domain('message')
    .actor('createMessage', handlers.messageHandler)
    .watcher('messageCreated', handlers.messageCreatedHandler)
  })
}

else
  new DWS.createHttpServer({port: 8081}).start()
