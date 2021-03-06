import { Logger } from '@nestjs/common';
import { FabricControllerAdapter } from '@worldsibu/convector-adapter-fabric';
import { ClientFactory } from '@worldsibu/convector-core';
import * as fs from 'fs';
import { Personale, PersonaleController } from '@convector-sample/personale-cc';
import { join, resolve } from 'path';
import { CartellaclinicaController } from '@convector-sample/cartellaclinica-cc';
import { envVariables as e } from './env';


const adapter = new FabricControllerAdapter({
  txTimeout: 300000,
  user: e.identityName,
  channel: e.channel,
  chaincode: e.chaincode,
  keyStore: resolve(__dirname, e.keyStore),
  networkProfile: resolve(__dirname, e.networkProfile),
});

export const initAdapter = adapter.init();
export const PersonaleControllerBackEnd = ClientFactory(PersonaleController, adapter);
export const CartellaclinicaControllerBackEnd = ClientFactory(CartellaclinicaController, adapter);

/**
 * Check if the identity has been initialized in the chaincode.
 */
export async function InitServerIdentity() {
  await initAdapter;
  const res = await PersonaleControllerBackEnd.get(e.identityId);
  try {
    // convert fabric model to convector model (remove _props)
    const serverIdentity = new Personale(res).toJSON();

    if (!serverIdentity || !serverIdentity.id) {
      throw new Error('Server identity does not exists, make sure to enroll it or seed data');
    } else {
      Logger.log('Server identity exists');
    }
  } catch (ex) {
    Logger.log(JSON.stringify(ex));
    throw new Error('Server identity does not exists, make sure to enroll it or seed data');
  }
}

const contextPath = join(e.keyStore + '/' + e.identityName);
fs.readFile(contextPath, 'utf8', async (err, data) => {
  if (err) {
    throw new Error(`Context in ${contextPath} doesn't exist. Make sure that path resolves to your key stores folder`);
  } else {
    Logger.log('Context path with cryptographic materials exists');
  }
});

