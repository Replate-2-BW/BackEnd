
exports.up = function(knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments();// id column, integer, primary key, auto-increment
      table.string("username").index().notNullable();
      table.string("password").index().notNullable();
      table.string("phoneNumber").index().notNullable();
      table.string("bizName").index();
      table.string("bizAddress").index();
      table.string("userType").index().notNullable();
    })
    .createTable("pickupRequest", (table) => {
      table.increments();// id column, integer, primary key, auto-increment
      table.string("typeOfFood").index().notNullable();
      table.integer("qty").index().notNullable();
      table.string("preferredPickupTime").index().notNullable();
      table.integer("bizUserID")
          .unsigned()
          .notNullable()
          .references("id").inTable("users")
          .onDelete("RESTRICT")
          .onUpdate("CASCADE");
      table.boolean("VolClaimed").defaultTo(false);
      table.integer("volUserID")
          .unsigned()
          .notNullable()
          .references("id").inTable("users")
          .onDelete("RESTRICT")
          .onUpdate("CASCADE");
      table.boolean("delivered").defaultTo(false);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("pickupRequest")
    .dropTableIfExists("users");
};
