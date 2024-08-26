/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const WorkspacesController = () => import('#controllers/workspaces_controller')
const KanbansController = () => import('#controllers/kanbans_controller')
const TaskController = () => import('#controllers/tasks_controller')
const SocialsController = () => import('#controllers/socials_controller')
const UsersController = () => import('#controllers/users_controller')

//connection
router.get('/github/redirect', [SocialsController, 'githubRedirect'])
router.get('/github/callback', [SocialsController, 'githubCallback'])
router.get('/google/redirect', [SocialsController, 'googleRedirect'])
router.get('/google/callback', [SocialsController, 'googleCallback'])

router
  .group(() => {
    router.get('/user/get', [UsersController, 'getUserInfo'])
    router.post('/user/logout', [UsersController, 'logout'])
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
    router.post('/task/create', [TaskController, 'createTask'])
    router.get('/task/get/:id', [TaskController, 'getAllTask'])
    router.post('/task/update/:id', [TaskController, 'updateTask'])
    router.delete('/task/delete/:id', [TaskController, 'deleteTask'])
    //update task status
    router.post('/task/update/status/:id', [TaskController, 'updateTaskStatus'])
    router.post('/task/update/date/:id', [TaskController, 'updateTaskDate'])
  })
  .use(middleware.auth({ guards: ['web'] }))
