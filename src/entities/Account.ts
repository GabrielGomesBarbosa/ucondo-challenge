import { SQLError, SQLResultSet, SQLTransaction } from 'expo-sqlite'

import Account from '../types/Account'
import AccountItem from '../types/AccountItem'
import db from '../services/database/connection'

db.transaction((transaction: SQLTransaction) => {
  transaction.executeSql('PRAGMA foreign_keys = ON')
  transaction.executeSql(`
    CREATE TABLE IF NOT EXISTS accounts (
      id INTEGER PRIMARY KEY NOT NULL,
      type VARCHAR(50) NOT NULL,
      parentId INTEGER NULL,
      codeString VARCHAR(500) UNIQUE NOT NULL,
      codeUser VARCHAR(500) UNIQUE NOT NULL,
      name VARCHAR(100) NOT NULL,
      release INTEGER NOT NULL,
      FOREIGN KEY (parentId) REFERENCES accounts(id) ON UPDATE CASCADE ON DELETE CASCADE
    );
  `)
})

export const create = (account: Account): Promise<number> => {
  return new Promise((resolve, reject) => {
    db.transaction((transaction: SQLTransaction) => {
      transaction.executeSql(`
        INSERT INTO accounts (type, parentId, codeUser, codeString, name, release)
          VALUES (?, ?, ?, ?, ?, ?);
      `, [account.type, account.parentId, account.codeUser, account.codeString, account.name, account.release], 
      (_, { rowsAffected, insertId }: SQLResultSet) => {
        if (rowsAffected > 0) {
          resolve(insertId)
        }
        else reject(`Error when insert: ${JSON.stringify(account)}`)
      }, (_, error: SQLError) => {
        reject({
          code: error.code,
          message: error.message
        })
        return null
      })
    })
  })
}

export const getAll = (): Promise<AccountItem[]> => {
  return new Promise((resolve, reject) => {
    db.transaction((transaction: SQLTransaction) => {
      transaction.executeSql(
        'SELECT id, codeUser, name, release, type FROM accounts ORDER BY codeString;',
        [],
        (_, { rows }: SQLResultSet) => resolve(rows._array as AccountItem[]),
        (_, error: SQLError) => {
          reject(error)
          return null
        }
      )
    })
  })
}

export const getById = (id: number): Promise<Account> => {
  return new Promise((resolve, reject) => {
    db.transaction((transaction: SQLTransaction) => {
      transaction.executeSql(
        'SELECT * FROM accounts WHERE id = ?;',
        [id],
        (_, { rows }: SQLResultSet) => resolve(rows.item(0) as Account),
        (_, error: SQLError) => {
          reject(error)
          return null
        }
      )
    })
  })
}

export const getByCode = (codeString: string): Promise<Account> => {
  return new Promise((resolve, reject) => {
    db.transaction((transaction: SQLTransaction) => {
      transaction.executeSql(
        'SELECT * FROM accounts WHERE codeString = ?;',
        [codeString],
        (_, { rows }: SQLResultSet) => resolve(rows.item(0) as Account),
        (_, error: SQLError) => {
          reject(error)
          return null
        }
      )
    })
  })
}

export const getLastChild = (parentId: number): Promise<Account> => {
  return new Promise((resolve, reject) => {
    db.transaction((transaction: SQLTransaction) => {
      transaction.executeSql(
        'SELECT * FROM accounts WHERE parentId = ? ORDER BY codeString DESC LIMIT 1;',
        [parentId],
        (_, { rows }: SQLResultSet) => resolve(rows.item(0)),
        (_, error: SQLError) => {
          reject(error)
          return null
        }
      )
    })
  })
}

export const getAllParent = (type: string): Promise<AccountItem[]> => {
  return new Promise((resolve, reject) => {
    db.transaction((transaction: SQLTransaction) => {
      transaction.executeSql(
        'SELECT id, codeUser, name, type FROM accounts WHERE type = ? AND release = 0 ORDER BY codeString;',
        [type],
        (_, { rows }: SQLResultSet) => resolve(rows._array as AccountItem[]),
        (_, error: SQLError) => {
          reject(error)
          return null
        }
      )
    })
  })
}

export const remove = (id: number): Promise<number> => {
  return new Promise((resolve, reject) => {
    db.transaction((transaction: SQLTransaction) => {
      transaction.executeSql(
        'DELETE FROM accounts WHERE id = ?',
        [id],
        (_, { rowsAffected }: SQLResultSet) => resolve(rowsAffected),
        (_, error: SQLError) => {
          reject(error)
          return null
        }
      )
    })
  })
}