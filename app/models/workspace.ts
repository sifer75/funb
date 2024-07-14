import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Kanban from './kanban.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Workspace extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare user_id: number

  @column()
  declare status: 'archive' | 'not_archived'

  @hasMany(() => Kanban, { foreignKey: 'kanban_id' })
  declare kanbans: HasMany<typeof Kanban>

  @belongsTo(() => User, { foreignKey: 'user_id' })
  declare workspace: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
