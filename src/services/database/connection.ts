import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('ucondo.db')

export default db