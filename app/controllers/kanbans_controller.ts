import type { HttpContext } from '@adonisjs/core/http'

import Kanban from '#models/kanban'
import Workspace from '#models/workspace'

export default class KanbansController {
  async createKanban({ response, request }: HttpContext) {
    try {
      const { title, workspaceId }: { title: string; workspaceId: number } = request.only([
        'title',
        'workspaceId',
      ])
      const workspace = await Workspace.find(workspaceId)
      if (!workspace) {
        return response.status(404).json({ e: 'workspace non trouvé' })
      }
      const kanban = new Kanban()
      kanban.title = title
      kanban.workspace_id = workspaceId

      await kanban.save()

      return response.status(201).json(kanban)
    } catch (e) {
      return response.status(500).json({ e: 'Erreur lors da la création du kanban' })
    }
  }

  async getAllKanban({ response, params }: HttpContext) {
    try {
      const id = params.id
      const kanbans = await Kanban.query().where('workspace_id', id)
      return response.status(200).json(kanbans)
    } catch (e) {
      return response.status(500).json({ e: 'Erreur lors de la récupération des kanbans' })
    }
  }

  async updateKanban({ response, params, request }: HttpContext) {
    try {
      const data = request.only(['title', 'description'])

      const kanbanId = params.id
      if (!kanbanId) {
        return response.status(404).json({ e: 'id du kanban non trouvé' })
      }

      const kanban = await Kanban.findOrFail(kanbanId)
      if (!kanban) {
        return response.status(404).json({ e: 'kanban non trouvé' })
      }

      kanban.title = data.title
      await kanban.save()
      return response.status(201).json(kanban)
    } catch (e) {
      return response.status(500).json({ e: 'Erreur lors de la modification du kanban' })
    }
  }

  async deleteKanban({ response, params }: HttpContext) {
    try {
      const kanbanId = params.id
      if (!kanbanId) {
        return response.status(404).json({ e: 'id du kanban non trouvé' })
      }
      const kanban = await Kanban.findOrFail(kanbanId)
      if (!kanban) {
        return response.status(404).json({ e: 'kanban non trouvé' })
      }
      await kanban.delete()
      return response.status(200).json({ message: 'kanban supprimé avec succès' })
    } catch (e) {
      return response.status(500).json({ e: 'Erreur lors de la suppression du kanban' })
    }
  }
}
