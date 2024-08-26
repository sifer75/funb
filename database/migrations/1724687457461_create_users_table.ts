import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('github_id', 'provider_id')
      table.renameColumn('github_token', 'token')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
