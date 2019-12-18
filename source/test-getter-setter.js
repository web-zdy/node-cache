const kaikeba = {
  info: { name: '开课吧' },
  get name () {
    console.log('get: ' + this.info.name);
    return this.info.name
  },
  set name (val) {
    console.log('set: ' + val);
    this.info.name = val
  }
}
console.log(('Setter:' + kaikeba.name));

kaikeba.name = '开课啊'