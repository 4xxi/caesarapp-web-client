import sjcl from 'sjcl'
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
