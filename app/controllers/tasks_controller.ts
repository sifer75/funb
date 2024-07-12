import Kanban from '#models/kanban'
import Task from '#models/task'
import { HttpContext } from '@adonisjs/core/http'

export default class TasksController {
  async createTask({ response, request }: HttpContext) {
    try {
      const {
        title,
        description,
        kanbanId,
      }: { title: string; description: string; kanbanId: number } = request.only([
        'title',
        'description',
        'kanbanId',
      ])
      const kanban = await Kanban.find(kanbanId)
      if (!kanban) {
        return response.status(404).json({ e: 'kanban non trouvé' })
      }
      const task = new Task()
      task.title = title
      task.description = description
      task.kanban_id = kanbanId

      await task.save()

      return response.status(201).json(task)
    } catch (e) {
      return response.status(500).json({ e: 'Erreur lors de la création de la tâche' })
    }
  }

  async getAllTask({ response, params }: HttpContext) {
    try {
      const id = params.id
      const tasks = await Task.query().where('kanban_id', id)
      return response.status(200).json(tasks)
    } catch (e) {
      return response.status(500).json({ e: 'Erreur lors de la récupération des tâches' })
    }
  }

  async updateTask({ response, params, request }: HttpContext) {
    try {
      const data = request.only(['title', 'description'])
      const taskId = params.id
      if (!taskId) {
        return response.status(404).json({ e: 'id de la tâche non trouvée' })
      }
      const task = await Task.findOrFail(taskId)
      if (!task) {
        return response.status(404).json({ e: 'tâche non trouvée' })
      }
      task.title = data.title
      task.description = data.description
      await task.save()
      return response.status(201).json(task)
    } catch (e) {
      return response.status(500).json({ e: 'Erreur lors de la modification de la tâche' })
    }
  }

  async deleteTask({ response, params }: HttpContext) {
    try {
      const taskId = params.id
      if (!taskId) {
        return response.status(404).json({ e: 'id de la tâche non trouvée' })
      }

      const task = await Task.findOrFail(taskId)
      if (!task) {
        return response.status(404).json({ e: 'tâche non trouvée' })
      }

      await task.delete()
      return response.status(200).json({ message: 'Tâche supprimée avec succès' })
    } catch (e) {
      console.log(e)
      return response.status(500).json({ e: 'Erreur lors de la suppression de la tâche' })
    }
  }

  async updateTaskStatus({ request, response, params }: HttpContext) {
    try {
      const data = request.only(['status'])
      const taskId = params.id
      if (!taskId) {
        return response.status(404).json({ e: 'id de la tâche non trouvée' })
      }
      const task = await Task.findOrFail(taskId)
      if (!task) {
        return response.status(404).json({ e: 'tâche non trouvée' })
      }
      task.status = data.status
      await task.save()
    } catch (e) {
      return response
        .status(500)
        .json({ e: 'Erreur lors de la modification du status de la tâche' })
    }
  }
}
