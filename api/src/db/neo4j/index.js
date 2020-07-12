import neo4j from 'neo4j-driver'
import { initializeDatabase } from '../../initialize'

/*
 * Create a Neo4j driver instance to connect to the database
 * using credentials specified as environment variables
 * with fallback to defaults
 */
const driver = neo4j.driver(
  process.env.NEO4J_URI || 'bolt://localhost:7687',
  neo4j.auth.basic(
    process.env.NEO4J_USER || 'neo4j',
    process.env.NEO4J_PASSWORD || 'neo4j'
  ),
  {
    encrypted: process.env.NEO4J_ENCRYPTED ? 'ENCRYPTION_ON' : 'ENCRYPTION_OFF',
  }
)

/*
 * Perform any database initialization steps such as
 * creating constraints or ensuring indexes are online
 *
 */
const init = async (driver) => {
  await initializeDatabase(driver)
}

/*
 * We catch any errors that occur during initialization
 * to handle cases where we still want the API to start
 * regardless, such as running with a read only user.
 * In this case, ensure that any desired initialization steps
 * have occurred
 */

init(driver)

export default driver
