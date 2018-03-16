import sjcl from 'sjcl'
export function encrypt (data) {
  return btoa(sjcl.encrypt(data['password'], JSON.stringify({
    'secretMessage': data['secretMessage'],
    'files': data['files'],
  })).toString())
}
