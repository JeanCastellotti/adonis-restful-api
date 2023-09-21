import Server from '@ioc:Adonis/Core/Server'

Server.middleware.register([
  () => import('@ioc:Adonis/Core/BodyParser'),
  () => import('App/Middleware/SilentAuth'),
  () => import('@ioc:Adonis/Addons/RmbMiddleware'),
])

Server.middleware.registerNamed({
  auth: () => import('App/Middleware/Auth'),
})
