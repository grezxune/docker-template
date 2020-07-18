export const initializeDatabase = (driver: any) => {
  const initCypher = `CALL apoc.schema.assert({},
    {User: ["userId"]})`

  const executeQuery = (driver: any) => {
    const session = driver.session()
    return session
      .writeTransaction((tx: any) => tx.run(initCypher))
      .then()
      .finally(() => session.close())
  }

  executeQuery(driver).catch((error: any) => {
    console.error('Database initialization failed to complete\n', error.message)
  })
}
