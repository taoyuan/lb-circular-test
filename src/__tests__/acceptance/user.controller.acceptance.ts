import {Client} from '@loopback/testlab';
import {CircularTestApplication} from '../..';
import {setupApplication} from './test-helper';

describe('Circular Testing', () => {
  let app: CircularTestApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('invokes GET /query', async () => {
    await client.get('/users').expect(200);
    await client.get('/tasks').expect(200);
  });
});
