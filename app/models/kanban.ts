import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Task from './task.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Workspace from './workspace.js'

export default class Kanban extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare workspace_id: number

  @column()
  declare status: 'unstarted' | 'in_progress' | 'finished'

  @belongsTo(() => Workspace)
  declare kanban: BelongsTo<typeof Workspace>

  @hasMany(() => Task, { foreignKey: 'task_id' })
  declare tasks: HasMany<typeof Task>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
