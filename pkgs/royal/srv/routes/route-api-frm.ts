import { ex } from '../global-ex'
import { route } from '../route'

export const routeAPIFrm = () => {
  route('/_api_frm', async (req, res) => {
    // TODO: whitelist origin
    const allowUrl = req.headers.origin || req.headers.referer

    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT')
    res.setHeader('Access-Control-Allow-Headers', 'content-type rid')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    if (allowUrl) {
      res.setHeader('Access-Control-Allow-Origin', allowUrl)
    }

    res.send(`\
  <script>
    window.addEventListener('message', async (e) => {
      const msg = e.data;

      if (msg.init && msg.init.body instanceof File) {
        const body = new FormData();
        body.append("file", msg.init.body);
        msg.init.body = body;
      }

      try {
        const res = await fetch(msg.input, msg.init)
        parent.postMessage({result: await res.json(), id: msg.id }, '*')
      } catch (e) {
        console.log('err iframe : ', e)
      }
      
      
    })
    parent.postMessage('initialized', '*')
  </script>`)
  })
}
