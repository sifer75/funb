/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const WorkspacesController = () => import('#controllers/workspaces_controller')

router.post('/workspace/create', [WorkspacesController, 'createWorkspace'])
router.post('/workspace/update', [WorkspacesController, 'updateWorkspace'])
router.get('/workspace/delete', [WorkspacesController, 'deleteWorkspace'])
