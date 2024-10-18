# learn from bitcoinjs-lib github
```shell
npm install bitcoinjs-lib
# optionally, install a key derivation library as well
npm install ecpair bip32
# ecpair is the ECPair class for single keys
# bip32 is for generating HD keys
```


# Tips
## Mempool
1. Don't use fortiClient when using mempool because it will cause  timeout.
