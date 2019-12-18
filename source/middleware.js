// const add = (x, y) => x + y
// const square = z => z * z
// const fn = (x, y) => square(add(x, y))

// const compose = (fn1, fn2) => (...args) => fn2(fn1(...args))
// const compose = (...[first, ...other]) => (...args) => {
//   let ret = first(...args)
//   other.forEach(fn => {
//     ret = fn(ret)
//   })
//   return ret
// }
// console.log(fn(1, 2));
function compose (middlewares) {
  return function () {
    return dispatch(0)
    function dispatch (i) {
      let fn = middlewares[i]
      if (!fn) {
        return Promise.resolve()
      }
      return Promise.resolve(
        fn(function next () {
          // promise完成后，再执行下一个
          return dispatch(i + 1)
        })
      )
    }
  }
}

// const reducer = (fnx, fny) => fny(typeof (fnx) === 'function' && fnx());
// const reducer = (fnx, fny) => {
//   return fny().then(() => {
//     return fnx()
//   })
// }
// const compose1 = (middlewares) => {
//   return middlewares.reduce(reducer)
// }

async function fn1 (next) {
  console.log("fn1");
  next && await next();
  console.log("end fn1");
}
async function fn2 (next) {
  console.log("fn2");
  await delay();
  next && await next();
  console.log("end fn2");
}
async function fn3 (next) {
  console.log("fn3");
  next && await next();
}
async function fn4 (next) {
  console.log("fn4");
}

function delay () {
  return new Promise((reslove) => {
    setTimeout(() => {
      reslove()
    }, 2000)
  })
}

let middlewares = [fn1, fn2, fn3, fn4]
const finalFn = compose(middlewares);
finalFn();
// compose1(middlewares);