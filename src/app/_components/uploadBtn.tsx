"use client";
import React, { useState } from "react";
import { UploadButton, UploadDropzone } from "../utlis/uploadthing";

interface UploadBtnProps {
  setUrl: (url: string) => void;
  setKey: (key: string) => void;
}

const UploadBtn = ({ setUrl, setKey }: UploadBtnProps) => {
  return (
    <div className="mt-4">
      {/* <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          res.map((r) => {
            setUrl(r.url);
            return r.url;
          });
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      /> */}
      <UploadDropzone
        endpoint="imageUploader"
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
        className="bg-slate-800 ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300 px-20 py-4 cursor-pointer m-0"
      />
    </div>
  );
};

export default UploadBtn;
