// TODO: Make a better solution
export default (app) => {
  return typeof window !== 'undefined' ? window.location.origin : process.env.BASE_URL || 'https://github.com/4xxi/caesarapp'
}
