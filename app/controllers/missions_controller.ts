import type { HttpContext } from '@adonisjs/core/http'
import Mission from '#models/mission'

export default class MissionsController {
  async createMission({ response, request, auth }: HttpContext) {
    try {
      if (!auth || !auth.user || !auth.user.id) {
        return response.status(404).json({ e: 'utilisateur non trouvé' })
      }

      const {
        title,
        tasks,
        dateFrom,
        dateTo,
        timeFrom,
        timeTo,
      }: {
        title: string
        tasks: string
        dateFrom: string
        dateTo: string
        timeFrom: string
        timeTo: string
      } = request.only(['title', 'tasks', 'timeFrom', 'timeTo', 'dateFrom', 'dateTo'])

      const mission = new Mission()
      mission.title = title
      mission.tasks = tasks
      mission.date_from = dateFrom
      mission.date_to = dateTo
      mission.time_from = timeFrom
      mission.time_to = timeTo
      mission.user_id = auth.user.id

      await mission.save()

      return response.status(201).json({
        message: 'Mission créée avec succès',
        mission,
      })
    } catch (e) {
      return response.status(500).json({ e: 'Erreur lors de la création de la mission' })
    }
  }

  async getAllMissionsFromDate({ response, auth }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      if (!user) {
        return response.status(404).json({ e: 'Utilisateur non trouvé' })
      }
      const missions = await user.related('missions').query()
      return response.status(200).json(missions)
    } catch (e) {
      return response.status(500).json({ e: 'Erreur lors de la récupération des missions' })
    }
  }
}