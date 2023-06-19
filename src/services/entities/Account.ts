import { SQLError, SQLResultSet, SQLTransaction } from 'expo-sqlite'

import db from '../database/connection'
import Account from '../../types/Account'
import AccountItem from '../../types/AccountItem'

db.transaction((transation: SQLTransaction) => {
  transation.executeSql(`
    CREATE TABLE IF NOT EXISTS accounts (
      id INTEGER PRIMARY KEY NOT NULL,
      type VARCHAR(50) NOT NULL,
      hasParent INTEGER NOT NULL,
      parentId INTEGER NULL,
      codeString VARCHAR(500) UNIQUE NOT NULL,
      codeUser VARCHAR(500) UNIQUE NOT NULL,
      name VARCHAR(100) NOT NULL,
      release INTEGER NOT NULL,
      FOREIGN KEY (parentId) REFERENCES accounts(id)
    );
  `)
})

export const create = (account: Account): Promise<number> => {
  console.log('create account', account)
  return new Promise((resolve, reject) => {
    db.transaction((transaction: SQLTransaction) => {
      transaction.executeSql(`
        INSERT INTO accounts (type, hasParent, parentId, codeUser, codeString, name, release)
          VALUES (?, ?, ?, ?, ?, ?, ?);
      `, [account.type, account.hasParent, account.parentId, account.codeUser, account.codeString, account.name, account.release], 
      (_, { rowsAffected, insertId }: SQLResultSet) => {
        if (rowsAffected > 0) {
          
          resolve(insertId)
        }
        else reject(`Error when insert: ${JSON.stringify(account)}`)
      }, (_, error: SQLError) => {
        reject(error)
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

export const getChildren = (parentId: number): Promise<AccountItem[]> => {
  return new Promise((resolve, reject) => {
    db.transaction((transaction: SQLTransaction) => {
      transaction.executeSql(
        'select * from accounts where parentId = ?;',
        [parentId],
        (_, { rows }: SQLResultSet) => resolve(rows._array as AccountItem[]),
        (_, error: SQLError) => {
          reject(error)
          return null
        }
      )
    })
  })
}

export const getAllParent = (): Promise<AccountItem[]> => {
  return new Promise((resolve, reject) => {
    db.transaction((transaction: SQLTransaction) => {
      transaction.executeSql(
        'SELECT id, codeUser, name, type FROM accounts WHERE parentId IS NULL ORDER BY codeString;',
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