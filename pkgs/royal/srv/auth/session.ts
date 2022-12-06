import cuid from "cuid";
import { join } from "path";
import lmdb, { open, RootDatabase } from "lmdb";
import { SrvHttpRequest } from "../global-ex";

const BlankSession = {
  id: "",
  expired: 0,
  data: {} as any,
};
type SessionEntry = typeof BlankSession;

export const session = {
  lmdb: null as unknown as RootDatabase<SessionEntry>,
  cookieKey: "",
  init(arg: { cookieKey: string }) {
    const dbpath = join(process.cwd(), "session.lmdb");
    self(this).lmdb = open({
      path: dbpath,
      compression: true,
    });
    self(this).cookieKey = arg.cookieKey;
  },
  async new(data: any, expired?: Date): Promise<SessionEntry> {
    const s = {
      id: cuid(),
      expired: expired ? expired.getTime() / 1000 : 0,
      data,
    };

    await self(this).lmdb.put(s.id, s);

    return s;
  },
  get(req: string | SrvHttpRequest): null | SessionEntry {
    let id = "";
    if (typeof req === "string") {
      id = req;
    } else {
      id = parseCookies(req.headers.cookie)[self(this).cookieKey];
    }

    if (!id) {
      return null;
    }
    const s = self(this).lmdb.get(id);

    if (s) {
      if (s.expired !== 0 && Date.now() / 1000 > s.expired) {
        return null;
      }

      return s;
    }
    return null;
  },
  async set(id: string, data: any): Promise<SessionEntry> {
    await self(this).lmdb.put(id, data);
    return data;
  },
  del(id: string) {
    return self(this).lmdb.remove(id);
  },
  keys() {
    return new Promise<lmdb.Key[]>((resolve) => {
      const keys: lmdb.Key[] = [];
      self(this).lmdb.getKeys().forEach((e) => {
        keys.push(e);
      });
      resolve(keys);
    });
  },
  clear() {
    self(this).lmdb.clearSync();
  },
  count() {
    return self(this).lmdb.getCount();
  },
};

const self = (me: Session) => me;
type Session = typeof session;

export function parseCookies(cookieHeader: string) {
  const list = {};
  if (!cookieHeader) return list;

  cookieHeader.split(`;`).forEach(function (cookie) {
    let [name, ...rest] = cookie.split(`=`);
    name = name?.trim();
    if (!name) return;
    const value = rest.join(`=`).trim();
    if (!value) return;
    list[name] = decodeURIComponent(value);
  });

  return list;
}
