import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('auth/register', 'AuthController.register')
  Route.post('auth/login', 'AuthController.login')

  Route.post('threads', 'ThreadsController.store').middleware('auth')
}).prefix('api')
