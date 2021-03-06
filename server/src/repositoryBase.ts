import { query } from './db/neo4j/query'

export class RepositoryBase<Type> {
  labels: string[]
  optionalLabels?: string[]
  primaryLabel: string
  primaryKey: string

  constructor(
    labels: string[],
    primaryLabel: string,
    optionalLabels?: string[]
  ) {
    this.labels = labels
    this.optionalLabels = optionalLabels
    this.primaryLabel = primaryLabel
    this.primaryKey =
      this.primaryLabel[0].toLocaleLowerCase() +
      this.primaryLabel.substring(1) +
      'Id'
  }

  getLabels = (): string => `:${this.labels.join(' :')}`

  getAll = async (): Promise<Type[]> => {
    const response = await query(
      `MATCH (node ${this.getLabels()}) RETURN node, LABELS(node) as labels`,
      {}
    )

    return response.map((item: any) => ({ ...item.node, labels: item.labels }))
  }

  getById = async (id: string): Promise<Type | null> => {
    const response = (await query(
      `MATCH (node ${this.getLabels()} { ${
        this.primaryKey
      }: $id }) RETURN node, LABELS(node) as labels`,
      { id }
    )) as any

    if (
      response &&
      response.length > 0 &&
      response[0].node &&
      response[0].labels
    ) {
      return { ...response[0].node, labels: response[0].labels }
    } else {
      return null
    }
  }
}
