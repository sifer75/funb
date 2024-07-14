import type { HttpContext } from '@adonisjs/core/http'
import Workspace from '#models/workspace'
import User from '#models/user'
export default class WorkspacesController {
  async createWorkspace({ auth, response, request }: HttpContext) {
    try {
      if (!auth || !auth.user || !auth.user.id) {
        return response.status(404).json({ e: 'Id du user non trouvé' })
      }
      const userId = auth.user.id
      const user = await User.find(userId)
      if (!user) {
        return response.status(404).json({ e: 'Utilisateur non trouvé' })
      }
      const { title, description }: { title: string; description: string } = request.only([
        'title',
        'description',
      ])
      const workspace = new Workspace()
      workspace.title = title
      workspace.description = description
      workspace.user_id = userId
      await workspace.save()
      return response.status(201).json(workspace)
    } catch (e) {
      return response.status(500).json({ e: 'Erreur lors de la création du workspace' })
    }
  }

  async getAllWorkspace({ auth, response }: HttpContext) {
    try {
      if (!auth || !auth.user || !auth.user.github_id) {
        return response.status(404).json({ e: 'Id du user non trouvé' })
      }
      const githubId = auth.user.github_id
      const user = await User.findBy('github_id', githubId)
      if (!user) {
        return response.status(404).json({ e: 'Utilisateur non trouvé' })
      }
      const workspaces = await user.related('workspaces').query()
      return response.status(200).json(workspaces)
    } catch (e) {
      console.log(e)
      return response.status(500).json({ e: 'Erreur lors de la recherche des workspaces' })
    }
  }

  async updateWorkspace({ response, params, request }: HttpContext) {
    try {
      const data = request.only(['title', 'description'])
      const workspaceId = params.id
      if (!workspaceId) {
        return response.status(404).json({ e: 'id du workspace non trouvé' })
      }
      const workspace = await Workspace.findOrFail(workspaceId)
      if (!workspace) {
        return response.status(404).json({ e: 'workspace non trouvé' })
      }
      workspace.title = data.title
      workspace.description = data.description
      await workspace.save()
      return response.status(201).json(workspace)
    } catch (e) {
      return response.status(500).json({ e: 'Erreur lors de la modification du workspace' })
    }
  }

  async deleteWorkspace({ response, params }: HttpContext) {
    try {
      const workspaceId = await params.id
      if (!workspaceId) {
        return response.status(500).json({ e: 'id du workspace non trouvé' })
      }
      const workspace = await Workspace.findOrFail(workspaceId)
      if (!workspace) {
        return response.status(401).json({ e: 'workspace non trouvé' })
      }
      await workspace.delete()
      return response.status(200).json({ message: 'workspace supprimé avec succès' })
    } catch (e) {
      return response.status(500).json({ e: 'Erreur lors de la suppression du workspace' })
    }
  }
}
