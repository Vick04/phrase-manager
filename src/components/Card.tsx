import { memo, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";

import Dialog from "@components/Dialog";
import Button from "@components/Button";

type props = {
  children: string;
  onDelete: (item: string) => void;
};

const Card = ({ children, onDelete }: props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="content-center rounded-2xl shadow font-bold p-6 relative w-full">
        {/*DELETE BUTTON*/}
        <button className="cursor-pointer" onClick={() => setOpen(true)}>
          <TrashIcon className="absolute right-3 top-3 size-4" />
        </button>
        {/*-------------*/}

        {/*CHILDREN = CARD BODY*/}
        <div>{children}</div>
        {/*--------------------*/}
      </div>

      {/*DELETE PHRASE DIALOG*/}
      <Dialog
        actions={<Button onClick={() => onDelete(children)}>Borrar</Button>}
        content={<h1>¿Seguro que desea eliminar la frase?</h1>}
        open={open}
        setOpen={setOpen}
        title="Confirmar"
      />
      {/*--------------------*/}
    </>
  );
};

export default memo(Card);
