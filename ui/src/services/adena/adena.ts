import {
  EAdenaResponseStatus,
  EAdenaResponseType,
  IAccountInfo,
  IAdenaResponse
} from './adena.types.ts';

export class AdenaService {
  static validateAdena() {
    // @ts-expect-error This should be injected by the extension
    const adena = window.adena;

    // Check if adena is installed as an extension
    if (!adena) {
      window.open('https://adena.app/', '_blank');

      throw new Error('Adena not installed');
    }
  }

  // Establishes a connection to the Adena wallet, if any.
  // If the Adena wallet is not installed, it opens up the adena homepage
  static async establishConnection(name: string): Promise<void> {
    AdenaService.validateAdena();

    // @ts-expect-error This should be injected by the extension
    const adena = window.adena;

    // Establish a connection to the wallet
    const response: IAdenaResponse = await adena.AddEstablish(name);

    // Parse the response
    if (
      response.status === EAdenaResponseStatus.SUCCESS ||
      response.type === EAdenaResponseType.ALREADY_CONNECTED
    ) {
      // Adena establishes a connection if:
      // - the app was not connected before, and the user approves
      // - the app was connected before
      return;
    }

    // Unable to connect to the Adena wallet
    throw new Error('unable to establish connection');
  }

  // Fetches the currently selected account info
  static async getAccountInfo(): Promise<IAccountInfo> {
    AdenaService.validateAdena();

    // @ts-expect-error This should be injected by the extension
    const adena = window.adena;

    // Get the account info
    const response: IAdenaResponse = await adena.GetAccount();
    if (response.status !== EAdenaResponseStatus.SUCCESS) {
      throw new Error('unable to fetch account info');
    }

    return response.data as IAccountInfo;
  }

  // Switches the Adena network to the given chain ID
  static async switchNetwork(chainID: string): Promise<void> {
    AdenaService.validateAdena();

    // @ts-expect-error This should be injected by the extension
    const adena = window.adena;

    // Get the account info
    const response: IAdenaResponse = await adena.SwitchNetwork(chainID);
    if (
      response.status === EAdenaResponseStatus.SUCCESS ||
      response.type === EAdenaResponseType.REDUNDANT_CHANGE_REQUESTED
    ) {
      return;
    }

    throw new Error('unable to switch Adena network');
  }
}
