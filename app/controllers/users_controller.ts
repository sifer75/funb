import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async getUserInfo({ auth, response }: HttpContext) {
    try {
      if (!auth || !auth.user) {
        return response.status(400).json({ error: 'Utilisateur non trouvé' })
      }
      const user = auth.getUserOrFail()
      return response.json(user)
    } catch (e) {
      return response
        .status(500)
        .json({ e: "Erreur lors de la récupération des informations de l'utilisateur" })
    }
  }

  async logout({ response, auth }: HttpContext) {
    try {
      auth.use('web').logout()
      return response.status(200).json({ message: 'Utilisateur déconnecté avec succès' })
    } catch (e) {
      return response.status(500).json({ e: "Erreur lors de la déconnection de l'utilisateur" })
    }
  }
}
