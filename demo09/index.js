import _ from 'lodash';

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = e => import('./print').then(module => {
    const print = module.default();
    print();
  });

  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());

if (module.hot) {
  module.hot.accept('./print.js', () => {
    console.log('accept the updated printMe module!');
    printMe();
  })
}
