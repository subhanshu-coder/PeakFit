import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// A dependency-free JSON file datastore. Good enough for a single-instance
// app and keeps `npm install` free of native build tools (no better-sqlite3,
// no bcrypt native binding). Swap for Postgres/Prisma if you outgrow this.

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_PATH = path.join(__dirname, '..', 'data.json')

const DEFAULT_DB = {
  users: [], // { id, name, email, passwordHash, profile }
  plans: [], // { id, userId, splitType, days: [{ day, muscles: [], exercises: [] }] }
  diets: [], // { id, userId, calories, protein, carbs, fat, goal, meals }
  logs: [], // { id, userId, date, day, entries: [{ exerciseId, sets: [{ reps, weight }] }] }
}

function readDb() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(DEFAULT_DB, null, 2))
    return structuredClone(DEFAULT_DB)
  }
  const raw = fs.readFileSync(DB_PATH, 'utf-8')
  try {
    return JSON.parse(raw)
  } catch {
    return structuredClone(DEFAULT_DB)
  }
}

function writeDb(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2))
}

export const db = {
  get(collection) {
    const data = readDb()
    return data[collection] ?? []
  },
  set(collection, records) {
    const data = readDb()
    data[collection] = records
    writeDb(data)
  },
  insert(collection, record) {
    const data = readDb()
    data[collection] = data[collection] ?? []
    data[collection].push(record)
    writeDb(data)
    return record
  },
  update(collection, id, patch) {
    const data = readDb()
    const list = data[collection] ?? []
    const idx = list.findIndex((r) => r.id === id)
    if (idx === -1) return null
    list[idx] = { ...list[idx], ...patch }
    writeDb(data)
    return list[idx]
  },
  find(collection, predicate) {
    return this.get(collection).find(predicate) ?? null
  },
  filter(collection, predicate) {
    return this.get(collection).filter(predicate)
  },
}
