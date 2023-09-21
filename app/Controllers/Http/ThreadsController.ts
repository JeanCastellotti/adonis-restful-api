import { bind } from '@adonisjs/route-model-binding'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Thread from 'App/Models/Thread'
import CreateThreadValidator from 'App/Validators/CreateThreadValidator'
import SortThreadValidator from 'App/Validators/SortThreadValidator'
import UpdateThreadValidator from 'App/Validators/UpdateThreadValidator'

export default class ThreadsController {
  public async store({ request, auth }: HttpContextContract) {
    const payload = await request.validate(CreateThreadValidator)

    const thread = await auth.user?.related('threads').create(payload)

    await thread?.load('user')
    await thread?.load('category')

    return thread
  }

  @bind()
  public async show({}, thread: Thread) {
    await thread.load('user')
    await thread.load('category')
    await thread.load('replies')

    return thread
  }

  public async index({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('per_page', 25)
    const userId = request.input('user_id')
    const categoryId = request.input('category_id')

    const payload = await request.validate(SortThreadValidator)

    const sortBy = payload.sort_by || 'id'
    const order = payload.order || 'asc'

    const threads = await Thread.query()
      .if(userId, (query) => {
        query.where('user_id', userId)
      })
      .if(categoryId, (query) => {
        query.where('category_id', categoryId)
      })
      .orderBy(sortBy, order)
      .preload('category')
      .preload('user')
      .preload('replies')
      .paginate(page, perPage)

    return threads
  }

  @bind()
  public async update({ request }: HttpContextContract, thread: Thread) {
    const payload = await request.validate(UpdateThreadValidator)

    thread.merge(payload)
    await thread.save()

    await thread.load('user')
    await thread.load('category')
    await thread.load('replies')

    return thread
  }

  @bind()
  public async destroy({}, thread: Thread) {
    return await thread.delete()
  }
}
