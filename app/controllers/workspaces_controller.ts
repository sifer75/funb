import type { HttpContext } from '@adonisjs/core/http'
import Workspace from '#models/workspace'
export default class WorkspacesController {
  async createWorkspace({ response, request }: HttpContext) {
    try {
      const { title, description }: { title: string; description: string } = request.only([
        'title',
        'description',
      ])

      console.log(title, description)

      const workspace = new Workspace()
      workspace.title = title
      workspace.description = description

      await workspace.save()

      // Retourner une réponse JSON valide
      return response.status(201).json({
        message: 'Workspace créé avec succès',
        workspace,
      })
    } catch (e) {
      return response.status(500).json({ e: 'Erreur lors de la création du workspace' })
    }
  }

  async getAllWorkspace({ response }: HttpContext) {
    try {
      const workspaces = await Workspace.all()
      return response.status(200).json(workspaces)
    } catch (e) {
      return response.status(500).json({ e: 'erreur lors de la recherche des workspaces' })
    }
  }

  async updateWorkspace({ response, params, request }: HttpContext) {
    try {
      const data = request.only(['title', 'description'])

      const workspaceId = params.id
      if (!workspaceId) {
        return response.status(401).json({ e: 'id du workspace non trouvé' })
      }

      const workspace = await Workspace.findOrFail(workspaceId)

      if (!workspace) {
        return response.status(401).json({ e: 'workspace non trouvé' })
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
      console.log('coucou')

      const workspaceId = await params.id
      console.log(workspaceId)

      if (!workspaceId) {
        return response.status(500).json({ e: 'id du workspace non trouvé' })
      }

      const workspace = await Workspace.findOrFail(workspaceId)

      if (!workspace) {
        return response.status(401).json({ e: 'workspace non trouvé' })
      }
      console.log(workspace, workspaceId)
      await workspace.delete()

      return response.status(204)
    } catch (e) {
      return response.status(500).json({ e: 'erreur lors de la suppression du workspace' })
    }
  }
}
