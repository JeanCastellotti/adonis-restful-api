import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.post('register', 'AuthController.register')
    Route.post('login', 'AuthController.login')
  }).prefix('auth')

  Route.group(() => {
    Route.post('', 'ThreadsController.store').middleware('auth')
    Route.get('', 'ThreadsController.index')
    Route.get(':id', 'ThreadsController.show')
  }).prefix('threads')
}).prefix('api')
