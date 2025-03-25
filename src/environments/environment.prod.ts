export const environment = {
  production: true,
  apis: {
    openweather: 'https://api.openweathermap.org/data/2.5'
  },
  apisParams: {
    openweather: [{
      key: 'appid',
      value: 'bf720fb687f0e5f777e7309d9e27ff48'
    }, {
      key: 'units',
      value: 'metric'
    }/*, {
      key: 'lang',
      value: 'pt_br'
    }*/]
  }
};
