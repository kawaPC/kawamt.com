import { Dialog, DialogContent } from "components/Dialog";

type Props = {
  children: React.ReactNode;
};

export const Modal: React.FC<Props> = ({ children }) => {
  return (
    <Dialog open>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
