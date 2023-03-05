import * as functions from 'firebase-functions';
import { getInfo } from './crawl-freemoa';
const cors = require('cors')({ origin: true });

export const crawl = functions
  .region('asia-northeast3')
  .runWith({
    timeoutSeconds: 300,
    memory: '2GB'
  })
  .https.onRequest(async (request, response) => {
    cors(request, response, async () => {
      const info = await getInfo();
      if (info) {
        response.send(JSON.stringify(info));
      } else {
        response.status(404).send('Not Found');
      }
    });
  });

export const ping = functions
  .region('asia-northeast3')
  .https.onRequest((request, response) => {
    cors(request, response, async () => {
      response.send('pong');
    });
  });
