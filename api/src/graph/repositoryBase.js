import query from '../db/neo4j/query'

export default class RepositoryBase {
  constructor(labels, primaryLabel, optionalLabels) {
    this.labels = labels
    this.optionalLabels = optionalLabels
    this.primaryLabel = primaryLabel
    this.primaryKey =
      this.primaryLabel[0].toLocaleLowerCase() +
      this.primaryLabel.substring(1) +
      'Id'
  }

  getLabels = () => `:${this.labels.join(' :')}`

  getAll = async () => {
    let response = await query(
      `MATCH (node ${this.getLabels()}) RETURN node, LABELS(node) as labels`,
      {}
    )

    return response.map((item) => ({ ...item.node, labels: item.labels }))
  }

  getById = async (id) => {
    const response = await query(
      `MATCH (node ${this.getLabels()} { ${
        this.primaryKey
      }: $id }) RETURN node, LABELS(node) as labels`,
      { id }
    )

    if (response && response.node && response.labels) {
      return { ...response.node, labels: response.labels }
    } else {
      return null
    }
  }
}
