import store from "store2";

import { BlockchainTypes, CrossmintStore } from "../types";

const CROSSMINT_STORE = "crossmint_Store";

export default class StorageAdapter {
    static async init() {
        const _store = await this.getStore();

        if (_store === undefined) {
            await store.session.set(CROSSMINT_STORE, this.buildInitialStore());
        }
    }

    static async getStore(): Promise<CrossmintStore | undefined> {
        const _store = await store.session.get(CROSSMINT_STORE);

        return (_store as CrossmintStore) ?? undefined;
    }

    static async getAccountByChain(chain: BlockchainTypes): Promise<string | undefined> {
        const _store = await this.getStore();

        if (_store === undefined) return undefined;

        return _store.accounts[chain] ?? undefined;
    }

    static async storeAccountForChain(account: string, chain: BlockchainTypes) {
        store.session.transact(CROSSMINT_STORE, (oldStore: CrossmintStore) => {
            oldStore.accounts[chain] = account;
        });
    }

    private static buildInitialStore() {
        let ret = { accounts: {} } as CrossmintStore;

        Object.values(BlockchainTypes).forEach((value) => (ret.accounts[value] = null));

        return ret;
    }

    static async clear() {
        store.session.clear();
    }
}
