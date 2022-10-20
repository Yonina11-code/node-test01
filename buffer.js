// 创建一个长度为10，且用0填充的buffer
const buf1 = Buffer.alloc(10)

// 创建一个长度为10，且用0x1填充的buffer
const buf2 = Buffer.alloc(10, 1)

// 创建一个长度为10，且未初始化的buffer
const buf3 = Buffer.allocUnsafe(10)

const buuf4 = Buffer.from([1, 2, 3])

const buf5 = Buffer.from('test')
const buf6 = Buffer.from('test', 'latin1')

const buf = Buffer.alloc(256)
let len = buf.write('www.runoob.com')
console.log('写入字节数:', len)