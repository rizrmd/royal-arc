import { FC } from "react";
import { useLocal } from "svc-web/libs/web-utils";

const layout: FC<{ children: any }> = ({ children }) => {
  const local = useLocal({ a: "saya" });
  return (
    <div>
      <button 
        onClick={() => {
          local.a = "muamsua " + Date.now();
          local.render();
        }}
      >
        {local.a}
      </button> iya sih betul
      <div>{children}</div>
    </div>
  );
};

export default layout;
