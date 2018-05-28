import sjcl from 'sjcl'
import uuidv4 from 'uuid/v4'

export function encrypt (data) {
  return btoa(sjcl.encrypt(data['password'], JSON.stringify({
    'secretMessage': data['secretMessage'],
    'files': data['files'],
  })).toString())
}

export async function decrypt (password, encryptedData) {
  try {
    return await JSON.parse(sjcl.decrypt(password, atob(encryptedData)))
  } catch (e) {
    return e.toString()
  }
}

export async function readFile (file) {
  return new Promise((resolve, reject) => {
    let userFile = {
      id: uuidv4(),
      ext: file.name.split('.').pop(),
      name: file.name,
      body: '',
    }
    let reader = new FileReader()
    reader.onload = fr => {
      userFile['body'] = fr.target.result
      resolve(userFile)
    }
    reader.readAsDataURL(file)
  })
}
