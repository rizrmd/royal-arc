export const login = {
  url: "/_login",
  args: ["username","password"],
}
export const logout = {
  url: "/_logout",
  args: [],
}
export const register = {
  url: "/register",
  args: ["user"],
}
export const session = {
  url: "/_session",
  args: [],
}
export const _dbs = {
  url: "/_dbs/:dbName/:action",
  args: ["dbName","action"],
}
export const _file = {
  url: "/_file/*",
  args: [],
}
export const _upload = {
  url: "/_upload",
  args: [],
}
export const home = {
  url: "/",
  args: [],
}