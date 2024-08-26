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
      let user = await User.query()
        .where('provider_id', githubUser.id)
        .andWhere('provider', 'github')
        .first()
      if (!user) {
        user = new User()
        ;(user.name = githubUser.original.login),
          (user.provider = 'github'),
          (user.provider_id = githubUser.id),
          (user.avatar_url = githubUser.avatarUrl),
          // (user.token = githubUser.token.token),
          await user.save()
      }
      console.log(user, 'f')
      await auth.use('web').login(user)
      return response.redirect('http://localhost:5173/workspace')
    } catch (error) {
      console.error('Erreur lors de la connexion via GitHub', error)
      return response.status(500).json({ error: 'Erreur lors de la connexion via GitHub' })
    }
  }

  async googleRedirect({ ally }: HttpContext) {
    try {
      await ally.use('google').redirect()
    } catch (error) {
      throw new Error('Erreur lors de la redirection vers Google : ' + error.message)
    }
  }

  async googleCallback({ ally, auth, response }: HttpContext) {
    try {
      const google = ally.use('google')

      if (google.accessDenied()) {
        return 'Accès Google refusé'
      }

      if (google.stateMisMatch()) {
        return 'La requête Google a expiré. Veuillez réessayer'
      }

      if (google.hasError()) {
        return google.getError()
      }

      const googleUser = await google.user()
      let user = await User.query()
        .where('provider_id', googleUser.id)
        .andWhere('provider', 'google')
        .first()
      if (!user) {
        user = new User()
        ;(user.name = googleUser.original.name),
          (user.provider = 'google'),
          (user.provider_id = googleUser.id),
          (user.avatar_url = googleUser.avatarUrl),
          // (user.token = googleUser.token.token),
          await user.save()
      }
      await auth.use('web').login(user)
      return response.redirect('http://localhost:5173/workspace')
    } catch (error) {
      console.error('Erreur lors de la connexion via Google', error)
      return response.status(500).json({ error: 'Erreur lors de la connexion via Google' })
    }
  }
}
