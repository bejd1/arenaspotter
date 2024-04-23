"use client";
import React, { useState } from "react";
import { UploadButton, UploadDropzone } from "../utlis/uploadthing";
import DeleteBtn from "./deleteBtn";

const UploadBtn = () => {
  const [url, setUrl] = useState("");
  const [key, setKey] = useState("");
  return (
    <div className="mt-4">
      <UploadButton
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
      />
      {/* <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          res.map((r) => {
            setUrl(r.url);
            setKey(r.key);
            return r.url;
          });
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
        className="bg-slate-800 ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300 px-20"
      /> */}
      {url.length !== 0 && (
        <div>
          <h2 className="text-xl my-4">url: {url}</h2>
          <DeleteBtn url={url} />
        </div>
      )}
    </div>
  );
};

export default UploadBtn;
