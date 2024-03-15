# Meme.land - A Gno Meme Sharing Platform

**Meme.land** is a meme (funny internet image) sharing platform build on top 
of the Gno.land blockchain tech stack.

Meme.land allows you to connect with your Gno.land wallet, share memes with your 
friends and coworkers, and upvote the funniest ones.

Meme.land is built using the Gno.land tech stack, utilizing the Gno programming
language for its backend, and a classic React UI using `vite`.

Visit a live deployment of Meme.land at [meme.gnoteam.com](https://meme.gnoteam.com) (staging).

## Run Meme.land locally

Meme.land consists of a React frontend, and a Gno backend (smart contract).
The frontend and backend code can be found at `ui/` and `api/` respectively.

## Prerequisites
- NodeJS
- Yarn
- Gno tech stack


#### 1. Clone the Meme.land repo

```bash
git clone git@github.com:gnolang/memeland.git 
```

#### 2. Set up environment variables

Create a `.env` file following the template found in `.env.example`.

```bash
VITE_CHAIN_ID=<gno_chain_id>
VITE_CHAIN_RPC=<gno_chain_rpc>
VITE_REALM_PATH=<path_to_memeland_realm>
```

Whether you choose to play around locally or connect your frontend with the live
version of Meme.land deployed on the [Portal Loop](https://docs.gno.land/concepts/portal-loop),
you can find Gno.land RPC endpoints and chain IDs [here](https://docs.gno.land/reference/rpc-endpoints/).


#### 3. Start the frontend with `vite`

Start by running `yarn` in the `ui/` folder. After `yarn` has installed all of 
the dependencies, run `yarn dev`.


### Conclusion

Congratulations! You are now officially running a local frontend connected to 
Meme.land!





