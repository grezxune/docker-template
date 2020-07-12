import driver from './index'
import { parse } from 'parse-neo4j'

export default async (query, params) => {
  const session = await driver.session()

  try {
    const result = await session.run(query, params)

    return parse(result)
  } catch (e) {
    console.log('Error running query\n', e)
    console.warn(query)
    console.warn(params)
  } finally {
    session.close()
  }
}
