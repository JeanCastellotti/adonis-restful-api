import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.post('register', 'AuthController.register')
    Route.post('login', 'AuthController.login')
  }).prefix('auth')

  Route.resource('threads', 'ThreadsController').apiOnly().middleware({
    store: 'auth',
    update: 'auth',
    destroy: 'auth',
  })

  Route.resource('threads.replies', 'RepliesController')
    .only(['store'])
    .middleware({
      store: 'auth',
    })
}).prefix('api')
