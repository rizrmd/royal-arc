import { Button } from "@fluentui/react-components";
import { ad_user } from "dbgen";
import { page } from "web-init";
import { useLocal } from "web-utils";
import { behavior } from "../../../compo/stata/behavior";
import { stata } from "../../../compo/stata/local";
import { Stata } from "../../../compo/stata/stata";

export default page({
  url: "/login/*",
  component: ({}) => {
    const local = useLocal(
      {
        data: stata<ad_user>(),
        loading: false,
      },
      async () => {
        const res = await api.session();
        if (res && res.data.user) {
          navigate("/");
        }
      }
    );

    return (
      <>
        <div
          className={cx(
            "min-h-full flex-1 flex flex-col justify-center   sm:px-6 lg:px-0 w-full bg-[#9B4AAF] bg-cover bg-right ",
            css`
              background-image: url("/images/bg-auth.png");
            `
          )}
        >
          <div className=" sm:mx-auto sm:w-full sm:max-w-md rounded-none shadow-2xl bg-white md:rounded-lg">
            <div className="sm:mx-auto sm:w-full sm:max-w-md pt-14 rounded-t-xl">
              <div className="flex justify-center">
                <div className="flex items-end justify-center">
                  <img src={`/logo/logo.png`} width={150} alt="Logo Goperasi" />
                </div>
                <div className="flex items-center justify-center ml-4">
                  <h1 className="text-center text-2xl font-extrabold text-[#9B4AAF]">
                    Sign In
                  </h1>
                </div>
              </div>
            </div>
            <div className=" py-8 px-4 sm:rounded-lg sm:px-6">
              <Stata
                state={[local.data, local.render]}
                load="ad_user"
                className={css`
                  input {
                    border-radius: 3px;
                    padding-left: 5px;
                    margin: 0px -5px;
                  }
                `}
                behavior={behavior.form.use(local.data, (bind) => ({
                  layout: [
                    {
                      name: "name",
                      label: "Username",
                    },
                    { name: "password", type: "password" },
                    () => (
                      <div className="mt-3">
                        <Button
                          type="submit"
                          className={cx(
                            "w-full",
                            css`
                              background-color: #9b4aaf !important;

                              &:disabled {
                                background-color: #ececeb !important;
                              }
                            `
                          )}
                          appearance="primary"
                          disabled={local.loading}
                          onClick={() => {
                            bind.action.detail.save();
                          }}
                        >
                          Sign In
                        </Button>
                        <div className="pt-2 flex space-x-1">
                          <span>Don't have account?</span>
                          <a
                            href="/reg"
                            className="font-bold text-blue-500 underline"
                          >
                            Register Now
                          </a>
                        </div>
                      </div>
                    ),
                  ] as any,
                  async onSave() {
                    const data = bind.data.detail as ad_user;

                    local.loading = true;
                    local.render();
                    const res = await api.login(data.name, data.password || "");

                    if (res.status === "ok") {
                      window.location.href = `/`;
                      // navigate("/");
                    } else {
                      alert(res.reason);

                      local.loading = false;
                      local.render();
                    }
                  },
                }))}
              />
            </div>
          </div>
        </div>
      </>
    );
  },
});
