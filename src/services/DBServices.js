let db = null
export default {
  connectDataBase() {
    let request = window.indexedDB.open('event-list', 1.0)
    request.onupgradeneeded = function(event) {
      db = event.target.result
      if (!db.objectStoreNames.contains('events')) {
        let objectStore = db.createObjectStore('events', {
          keyPath: 'id',
          autoIncrement: true
        })
        objectStore.createIndex('category', 'category')
        objectStore.createIndex('title', 'title')
        objectStore.createIndex('description', 'description')
        objectStore.createIndex('location', 'location')
        objectStore.createIndex('date', 'date')
        objectStore.createIndex('time', 'time')
        objectStore.createIndex('attendees', 'attendees')
      }
    }
    return new Promise((resolve, reject) => {
      request.onsuccess = function(event) {
        console.log('success opening/creating database')
        db = event.target.result
        resolve(event)
      }
      request.onerror = function(event) {
        reject(event)
      }
    })
  },
  getEvents(perPage, page) {
    return new Promise((resolve, reject) => {
      let transaction = db.transaction(['events'], 'readwrite')
      let objectStoreRequest = transaction.objectStore('events').count()
      objectStoreRequest.onsuccess = function(event) {
        let count = event.target.result
        let movedToPosition = false
        let cursorCnt = 0
        let ret = []
        let n = perPage * (page - 1)
        if (n === 0) {
          movedToPosition = true
        }
        transaction.objectStore('events').openCursor().onsuccess = function(
          event
        ) {
          let cursor = event.target.result
          if (cursor) {
            if (!movedToPosition) {
              movedToPosition = true
              cursor.advance(n)
            } else {
              if (cursorCnt < 3) {
                cursorCnt++
                ret.push(cursor.value)
                cursor.continue()
              } else {
                resolve({
                  data: ret,
                  headers: { ['x-total-count']: count }
                })
              }
            }
          } else {
            resolve({
              data: ret,
              headers: { ['x-total-count']: count }
            })
          }
        }
      }
      objectStoreRequest.onerror = function(event) {
        reject({
          message: event
        })
      }
    })
  },
  getEvent(id) {
    let transaction = db.transaction(['events'], 'readwrite')
    let objectStoreRequest = transaction.objectStore('events').get(id)
    return new Promise((resolve, reject) => {
      objectStoreRequest.onsuccess = event => {
        resolve({
          data: event.target.result
        })
      }
      objectStoreRequest.onerror = event => {
        reject({
          message: event
        })
      }
    })
  },
  postEvent(event) {
    let transaction = db.transaction(['events'], 'readwrite')
    let objectStoreRequest = transaction.objectStore('events').add(event)
    return new Promise((resolve, reject) => {
      objectStoreRequest.onsuccess = event => {
        resolve({
          data: event.target.result
        })
      }
      objectStoreRequest.onerror = event => {
        reject({
          message: event
        })
      }
    })
  },
  deleteEvent(eventID) {
    let transaction = db.transaction(['events'], 'readwrite')
    let objectStoreRequest = transaction.objectStore('events').delete(eventID)
    return new Promise((resolve, reject) => {
      objectStoreRequest.onsuccess = event => {
        resolve({
          data: event.target.result
        })
      }
      objectStoreRequest.onerror = event => {
        reject(event)
      }
    })
  }
}
