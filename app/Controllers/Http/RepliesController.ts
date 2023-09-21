import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Thread from 'App/Models/Thread'
import CreateReplyValidator from 'App/Validators/CreateReplyValidator'
import { bind } from '@adonisjs/route-model-binding'

export default class RepliesController {
  @bind()
  public async store({ request, auth }: HttpContextContract, thread: Thread) {
    const { content } = await request.validate(CreateReplyValidator)

    const reply = await thread
      .related('replies')
      .create({ content, userId: auth.user?.id })

    await reply.load('user')
    await reply.load('thread')

    return reply
  }
}
