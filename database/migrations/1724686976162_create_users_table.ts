import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('provider')
      table.string('github_id').after('provider_id').alter()
      table.string('github_token').after('token').alter()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
