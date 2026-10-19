export type Priority = 'P0' | 'P1' | 'P2' | 'P3'

export interface NavItem {
  id: string
  label: string
}

export interface NavGroup {
  title: string
  items: NavItem[]
}

export interface ModuleDoc {
  id: string
  title: string
  intro: string
  purpose: string
  users: string[]
  features: string[]
  pages: string[]
  fields: string[]
  workflow: string[]
  businessRules: string[]
  notifications: string[]
  reports: string[]
  integrations: string[]
  tables: string[]
  security: string[]
  acceptance: string[]
  priority: Priority
}

export interface Requirement {
  id: string
  module: string
  description: string
  priority: Priority
  acceptance: string
}

export interface RoleDef {
  id: string
  name: string
  nameEn: string
  permissions: string[]
}

export interface TableGroup {
  id: string
  title: string
  purpose: string
  tables: DbTable[]
}

export interface DbTable {
  name: string
  purpose: string
  primaryKey: string
  fields: string[]
  relations: string[]
  constraints: string[]
  indexes: string[]
  archive: string
}
