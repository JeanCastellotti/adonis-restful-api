import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ThreadValidator from 'App/Validators/ThreadValidator'

export default class ThreadsController {
  public async store({ request, auth }: HttpContextContract) {
    const payload = await request.validate(ThreadValidator)

    const thread = await auth.user?.related('threads').create(payload)

    await thread?.load('user')
    await thread?.load('category')

    return thread
  }
}
