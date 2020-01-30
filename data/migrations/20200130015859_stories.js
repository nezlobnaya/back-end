
exports.up = function(knex) {
    return knex.schema
    .createTable('users', tbl => {
      tbl.increments()
      tbl.string('username', 128).notNullable().unique()
      tbl.string('password', 255).notNullable()
      tbl.string('role').defaultTo('user')
  })
      .createTable('stories' , tbl => {
        tbl.increments()
        tbl.string('title', 128 ).notNullable()
        tbl.text('contents').notNullable()
        tbl.string('name')
        tbl.string('email')
        tbl.boolean('pending').notNullable().defaultTo(true)
        tbl.integer('user_id')
          .unsigned()
          .references('id')
          .inTable('users')
          .onUpdate('CASCADE')
          .onDelete('CASCADE')
    })
      .createTable('comments', tbl => {
          tbl.increments()
          tbl.text('contents').notNullable()
          tbl.integer('story_id')
              .unsigned()
              .notNullable()
              .references('id')
              .inTable('stories')
              .onUpdate('CASCADE')
              .onDelete('CASCADE')
          tbl.integer('user_id')
              .unsigned()
              .references('id')
              .inTable('users')
              .onUpdate('CASCADE')
              .onDelete('CASCADE')
      })
    
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('comments')
      .dropTableIfExists('stories')
      .dropTableIfExists('users')  
  };