export const login = {
  name: "login",
  url: "/_login",
  path: "app/srv/api/built-in/auth/login.ts",
  args: ["username","password"],
  handler: import("../../../srv/api/built-in/auth/login")
}
export const logout = {
  name: "logout",
  url: "/_logout",
  path: "app/srv/api/built-in/auth/logout.ts",
  args: [],
  handler: import("../../../srv/api/built-in/auth/logout")
}
export const register = {
  name: "register",
  url: "/register",
  path: "app/srv/api/built-in/auth/register.ts",
  args: ["user"],
  handler: import("../../../srv/api/built-in/auth/register")
}
export const session = {
  name: "session",
  url: "/_session",
  path: "app/srv/api/built-in/auth/session.ts",
  args: [],
  handler: import("../../../srv/api/built-in/auth/session")
}
export const _dbs = {
  name: "_dbs",
  url: "/_dbs/:dbName/:action",
  path: "app/srv/api/built-in/_dbs.ts",
  args: ["dbName","action"],
  handler: import("../../../srv/api/built-in/_dbs")
}
export const _file = {
  name: "_file",
  url: "/_file/*",
  path: "app/srv/api/built-in/_file.ts",
  args: [],
  handler: import("../../../srv/api/built-in/_file")
}
export const _upload = {
  name: "_upload",
  url: "/_upload",
  path: "app/srv/api/built-in/_upload.ts",
  args: [],
  handler: import("../../../srv/api/built-in/_upload")
}
export const home = {
  name: "home",
  url: "/",
  path: "app/srv/api/home.ts",
  args: [],
  handler: import("../../../srv/api/home")
}