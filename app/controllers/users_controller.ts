import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async getUserInfo({ auth, response }: HttpContext) {
    try {
      if (!auth || !auth.user || !auth.user.github_id) {
        return response.status(400).json({ error: 'Utilisateur non trouvé' })
      }
      const githubId = auth.user.github_id
      const user = await User.findByOrFail('github_id', githubId)
      if (!user) {
        return response.status(400).json({ error: 'Utilisateur non trouvé' })
      }
      return response.json(user)
    } catch (e) {
      return response
        .status(500)
        .json({ e: "Erreur lors de la récupération des informations de l'utilisateur" })
    }
  }
}
