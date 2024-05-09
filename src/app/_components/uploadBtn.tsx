"use client";
import React, { useState } from "react";
import { UploadButton, UploadDropzone } from "../utlis/uploadthing";
import { Progress } from "@/components/ui/progress";

interface UploadBtnProps {
  setUrl: (url: string) => void;
  setKey: (key: string) => void;
}

const UploadBtn = ({ setUrl, setKey }: UploadBtnProps) => {
  return (
    <div>
      <UploadDropzone
        endpoint="imageUploader"
        // content={{
        //   button({
        //     ready,
        //     isUploading,
        //     uploadProgress,
        //     fileTypes,
        //     isDragActive,
        //   }) {
        //     if (ready) return <div className="px-4">ready</div>;
        //     if (isUploading) return <div className="px-4">isUploading</div>;
        //     if (fileTypes) return <div className="px-4">fileTypes</div>;
        //     if (isDragActive) return <div className="px-4">isDragActive</div>;
        //     if (uploadProgress)
        //       return <div className="px-4">uploadProgress</div>;

        //     return "Getting ready...";
        //   },
        //   label: <span className="">fjut</span>,
        //   uploadIcon: (
        //     <img src="https://utfs.io/f/6bb5524a-b896-4a94-803d-724e983647cb-phwn23.jpg" />
        //   ),
        //   allowedContent: <div>cwel</div>,
        // }}
        onClientUploadComplete={(res) => {
          res.map((res) => {
            setUrl(res.url);
            setKey(res.key);
            return res.url;
          });
          console.log("Files: ", res);
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
        className="dark:bg-slate-800 ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300 px-20 py-4 cursor-pointer m-0"
      />
    </div>
  );
};

export default UploadBtn;
