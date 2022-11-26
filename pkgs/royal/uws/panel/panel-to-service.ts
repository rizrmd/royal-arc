import cuid from "cuid"
import { g } from "../../global"

type IAppAction = 'list-services'
export const sendForkMsg = async (action: IAppAction) => {
  return await new Promise((resolve) => {
    // if (g.fork) {
    //   const id = cuid.slug()
    //   g.panelMsgs[id] = resolve
    //   if (g.fork.connected) {
    //     g.fork.send({ _type: 'panel', action, id })
    //   } else {
    //     resolve({})
    //   }
    // }
  })
}
