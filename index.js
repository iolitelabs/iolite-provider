const SignerProvider = require('ethjs-provider-signer')
const Account = require('ethjs-account')
const Signer = require('ethjs-iolite-signer')

function IoliteProvider (path, privateKey) {
  this.account = privateKey
    ? Account.privateToAccount(privateKey)
    : Account.generate('CExn4s1CDkI0c2GAAtH1F8g10tJaHlXqfYsiP6N279GNXCxqtMHktNHug5V7vZtA')

  this.methods = {
    signRawTransaction: Signer.signWeb3
  }

  SignerProvider.call(this, path, {
    signTransaction: (rawTx, cb) => cb(null, Signer.sign(rawTx, this.account.privateKey)),
    accounts: (cb) => cb(null, [this.account.address])
  })
}

IoliteProvider.prototype = Object.create(SignerProvider.prototype)
IoliteProvider.prototype.constructor = IoliteProvider

module.exports = IoliteProvider
