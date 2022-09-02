export type Contract = {
  id: number
  name: string
  effectiveDate: Date
  finishDate: Date
  functionPointValue: number
  predictedVolumeFunctionPoint: number
  createdAt: Date
  updatedAt: Date
  companies: any //TODO: criar model
  clients: any //TODO: criar model
  maintenanceType: any//TODO: criar model
}