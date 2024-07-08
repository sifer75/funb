/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
// import { middleware } from './kernel.js'
const WorkspacesController = () => import('#controllers/workspaces_controller')
const KanbansController = () => import('#controllers/kanbans_controller')
const SocialsController = () => import('#controllers/socials_controller')

router.get('/github/redirect', [SocialsController, 'githubRedirect'])
router.get('/github/callback', [SocialsController, 'githubCallback'])

// router
//   .group(() => {
// CRUD workspace
router.post('/workspace/create', [WorkspacesController, 'createWorkspace'])
router.get('/workspace/get', [WorkspacesController, 'getAllWorkspace'])
router.post('/workspace/update/:id', [WorkspacesController, 'updateWorkspace'])
router.delete('/workspace/delete/:id', [WorkspacesController, 'deleteWorkspace'])
// CRUD kanban
router.post('/kanban/create', [KanbansController, 'createKanban'])
router.get('/kanban/get/:id', [KanbansController, 'getAllKanban'])
router.post('/kanban/update/:id', [KanbansController, 'updateKanban'])
router.delete('/kanban/delete/:id', [KanbansController, 'deleteKanban'])
// CRUD task
//   })
//   .use(middleware.auth({ guards: ['web'] }))
