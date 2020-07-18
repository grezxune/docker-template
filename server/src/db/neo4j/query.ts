// @ts-ignore
import { parse } from 'parse-neo4j'
import driver from './index'

export const query = async (query: string, params: any) => {
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
