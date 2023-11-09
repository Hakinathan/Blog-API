const path = require("path");

module.exports = ({ env }) => {
  const client = env("DATABASE_CLIENT", "mysql");

  const connections = {
    mysql: {
      connection: {
        connectionString: env("MYSQL_ADDON_URI", ""),
        host: env("MYSQL_ADDON_HOST"),
        port: env.int("MYSQL_ADDON_PORT"),
        database: env("MYSQL_ADDON_DB"),
        user: env("MYSQL_ADDON_USER"),
        password: env("MYSQL_ADDON_PASSWORD"),
        ssl: env.bool("DATABASE_SSL", false) && {
          key: env("DATABASE_SSL_KEY", undefined),
          cert: env("DATABASE_SSL_CERT", undefined),
          ca: env("DATABASE_SSL_CA", undefined),
          capath: env("DATABASE_SSL_CAPATH", undefined),
          cipher: env("DATABASE_SSL_CIPHER", undefined),
          rejectUnauthorized: env.bool(
            "DATABASE_SSL_REJECT_UNAUTHORIZED",
            true
          ),
        },
      },
      pool: {
        min: 2,
        max: 10,
      },
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: 60000,
    },
  };
};
