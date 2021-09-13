exports.MSDDatabase = {
  user: "bsoriano",
  password: "Master77$",
  server: "10.0.0.116",
  port: 1433,
  database: "MSD",
  rejectUnauthorized: false,
  requestCert: false,
  agent: false,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
    // enableArithAbort: true,
    // encrypt: true,
  },
  options: { trustServerCertificate: true },
};
