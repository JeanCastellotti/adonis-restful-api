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
    Route.patch(':id', 'ThreadsController.update')
    Route.delete(':id', 'ThreadsController.destroy')
    Route.post(':id/replies', 'RepliesController.store').middleware('auth')
  }).prefix('threads')
}).prefix('api')
