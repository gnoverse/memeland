const { VITE_CHAIN_ID } = import.meta.env;

if (!VITE_CHAIN_ID) {
  throw new Error('VITE_CHAIN_ID property not found in .env');
}

export default {
  CHAIN_ID: VITE_CHAIN_ID
};
