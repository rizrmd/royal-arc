import { Dialog, DialogBody, DialogSurface } from "@fluentui/react-components";
import { FC, useRef } from "react";
import { fetchSendApi } from "web-init";
export const ImgPicker: FC<{
  value?: string;
  update: (src: string) => void;
  onClose: () => void;
}> = ({ onClose, update, value }) => {
  const form = useRef<HTMLFormElement>(null);
  return (
    <Dialog
      onOpenChange={(event, data) => {
        if (!data.open) {
          onClose();
        }
      }}
      defaultOpen={true}
    >
      <DialogSurface>
        <div className="flex flex-col items-center space-y-2">
          <img src={`${serverurl}${value}?w=500&h=200`} />
          <input
            type="file"
            name="file"
            onChange={async function (e) {
              const files = e.currentTarget.files;
              if (files) {
                const res: string[] = (await fetchSendApi(
                  `/_upload`,
                  files[0]
                )) as any;
                update(res[0]);
                onClose();
              }
            }}
          />
        </div>
      </DialogSurface>
    </Dialog>
  );
};
