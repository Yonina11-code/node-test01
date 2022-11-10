const crypto = require('crypto')
const hash = crypto.createHash('md5')

hash.update('hello world') // 将hello world 以md5的形式存储

console.log(hash.digest('hex')) // 将结果以16进制的形式输出

// aes对称加密算法
function encrypto (key, iv, data) { // 加密
  let dep = crypto.createCipheriv('aes-128-cbc', key, iv)
  return dep.update(data, 'binary', 'hex') + dep.final('hex') // +final表示结束了

}
function decrypto (key, iv, data) {
  let crypted = Buffer.from(data, 'hex').toString('binary')
  let dep = crypto.createDecipheriv('aes-128-cbc', key, iv)
  return dep.update(crypted, 'binary', 'utf-8')+ dep.final('utf-8')
}
// 因为我们使用的是128的加密形式，所以key,iv都是要16位的
let key ="abcdef1234567890" //
let iv = "tbcdef1234567890"
let data = 'yxyxyx'

let cryted = encrypto(key, iv, data)
console.log('jiami',cryted)
console.log('jiemi1', decrypto(key, iv,cryted))