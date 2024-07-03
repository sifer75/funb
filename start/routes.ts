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
router.get('/workspace/get', [WorkspacesController, 'getAllWorkspace'])
router.post('/workspace/update/:id', [WorkspacesController, 'updateWorkspace'])
router.delete('/workspace/delete/:id', [WorkspacesController, 'deleteWorkspace'])
