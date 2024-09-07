export interface Nip44 {
  encrypt(peer: string, cypher: string): Promise<string>;
  decrypt(peer: string, encText: string): Promise<string>;
}

interface WindowNostr {
  getPublicKey(): Promise<string>;
  nip44: Nip44
}

export default WindowNostr;
