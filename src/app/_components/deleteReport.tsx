import { deleteReport } from "@/actions/report";
import { Button } from "@/components/ui/button";
import React from "react";

const DeleteReport = ({ id }: { id: string }) => {
  const handleDeleteSubmit = async (formData: FormData) => {
    try {
      await deleteReport(formData);
    } catch (error) {
      console.error("Edit function failed", error);
    }
  };

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await handleDeleteSubmit(new FormData(e.target as HTMLFormElement));
        }}
      >
        <input onChange={() => {}} type="hidden" name="id" value={id} />
        <Button>Delete</Button>
      </form>
    </div>
  );
};

export default DeleteReport;
