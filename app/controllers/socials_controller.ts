import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class SocialsController {
  async githubRedirect({ ally }: HttpContext) {
    try {
      await ally.use('github').redirect((request) => {
        request.scopes(['user', 'user:email'])
      })
    } catch (error) {
      throw new Error('Erreur lors de la redirection vers GitHub : ' + error.message)
    }
  }

  async githubCallback({ ally, auth, response }: HttpContext) {
    try {
      const github = ally.use('github')

      if (github.accessDenied()) {
        return 'Accès GitHub refusé'
      }

      if (github.stateMisMatch()) {
        return 'La requête GitHub a expiré. Veuillez réessayer'
      }

      if (github.hasError()) {
        return github.getError()
      }

      const githubUser = await github.user()
      let user = await User.findBy('github_id', githubUser.id)
      if (!user) {
        user = new User()
        ;(user.name = githubUser.original.login),
          (user.github_id = githubUser.id),
          (user.avatar_url = githubUser.avatarUrl),
          // github_token: githubUser.token.token,
          await user.save()
      }
      await auth.use('web').login(user)
      return response.redirect('http://localhost:5173/workspace')
    } catch (error) {
      console.error('Erreur lors de la connexion via GitHub', error)
      return response.status(500).json({ error: 'Erreur lors de la connexion via GitHub' })
    }
  }
}
