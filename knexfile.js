// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: "./data/replate2bw.db3",
    },
    useNullAsDefault: true, // ONLY needed for SQLite

    migrations: {
        directory: "./migrations",
    },
    seeds: {
        directory: "./seeds",
    },
    pool: {
        afterCreate: (conn, done) => {
            conn.run("PRAGMA foreign_keys = ON", done); // tur on foreign key enforcement
        },
    },
  },
  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/test.db3',
    },
    useNullAsDefault: true,
    migrations: {
        directory: "./migrations",
    },
    seeds: {
        directory: "./seeds",
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + `?ssl=true`,
    migrations: {
        directory: "./migrations",
    },
    seeds: {
        directory: "./seeds",
    },
    useNullAsDefault: true
  }

};
