function component() {
  var element = document.createElement('div');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  console.log(lodash(['Hello', 'webpack'], ' '));
  return element;
}

document.body.appendChild(component());

if (module.hot) {
  module.hot.accept('./print.js', () => {
    console.log('accept the updated printMe module!');
    printMe();
  })
}
