const { Sequelize } = require("sequelize");

if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL is missing. Make sure it's set in Railway.");
  process.exit(1);
}

const isProduction = process.env.NODE_ENV === "production";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: isProduction
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Allows self-signed certificates
        },
      }
    : {},
  logging: false, // Disable logging for cleaner output
});

module.exports = sequelize;