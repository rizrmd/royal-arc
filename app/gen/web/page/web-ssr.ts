export const auth_login = {
  name: "auth_login",
  url: "/login/*",
  path: "app/web/src/base/page/auth/login.tsx",
  ssr: false,
  layout: undefined,
  
}
export const auth_register = {
  name: "auth_register",
  url: "/reg/*",
  path: "app/web/src/base/page/auth/register.tsx",
  ssr: false,
  layout: undefined,
  
}
export const home = {
  name: "home",
  url: "/*",
  path: "app/web/src/base/page/home.tsx",
  ssr: false,
  layout: undefined,
  
}