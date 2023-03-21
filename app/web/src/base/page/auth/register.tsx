import { Button } from "@fluentui/react-components";
import { user } from "dbgen";
import { page } from "web-init";
import { useLocal } from "web-utils";
import { behavior } from "../../../compo/stata/behavior";
import { Detail } from "../../../compo/stata/detail/detail";
import { Stata, stata } from "../../../compo/stata/stata";

export default page({
  url: "/reg/*",
  component: ({}) => {
    const local = useLocal(
      {
        loading: false,
        data: stata<user & { domain: string; name: string }>(),
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
            "min-h-full flex flex-col justify-center   sm:px-6 lg:px-0 w-full bg-[#9B4AAF] bg-cover bg-right ",
            css`
              background-image: url("/images/bg-auth.png");
            `
          )}
        >
          <div className=" sm:mx-auto sm:w-full sm:max-w-md rounded-none shadow-2xl bg-white md:rounded-lg py-8 px-5">
            <Stata
              state={[local.data, local.render]}
              load="user"
              css={css`
                input {
                  border-radius: 3px;
                  padding-left: 5px;
                  margin: 0px -5px;
                }
              `}
              behavior={behavior.form.use(local.data, (bind) => ({
                layout: [
                  <div className="sm:mx-auto sm:w-full sm:max-w-md rounded-t-xl mb-5">
                    <div className="flex justify-center">
                      <div className="flex items-end justify-center">
                        <img
                          src={`/logo/logo.png`}
                          width={150}
                          alt="Logo Goperasi"
                        />
                      </div>
                      <div className="flex items-center justify-center ml-4">
                        <h1 className="text-center text-2xl font-extrabold text-[#9B4AAF]">
                          Registration
                        </h1>
                      </div>
                    </div>
                  </div>,
                  {
                    name: "name",
                    type: "string",
                    label: "Nama Usaha Anda",
                    required: true,
                  },
                  {
                    name: "domain",
                    type: "string",
                    required: true,
                  },
                  {
                    name: "phone",
                    label: "No. WhatsApp",
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
                      >
                        Register
                      </Button>
                      <div className="pt-2 flex space-x-1">
                        <span>Have an account?</span>
                        <a
                          href="/login"
                          className="font-bold text-blue-500 underline"
                        >
                          Sign In
                        </a>
                      </div>
                    </div>
                  ),
                ] as any,
                async onSave() {
                  const data = bind.data.detail as user & {
                    domain: string;
                    name: string;
                  };

                  local.loading = true;
                  local.render();

                  const res = await api.register({
                    email: "",
                    username: data.phone,
                    phone: data.phone,
                    password: data.password,
                    domain: data.domain,
                    name: data.name,
                  });

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
      </>
    );
  },
});
