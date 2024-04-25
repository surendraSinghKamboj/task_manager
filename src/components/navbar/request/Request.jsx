"use client";
import { SiGooglecolab } from "react-icons/si";
import React, { useState } from "react";
import Buttons from "./Buttons";

// [
//   {
//     _id: new ObjectId('662867751ae039a55793e8f7'),
//     projectId: {
//       _id: new ObjectId('6628636e1ae039a55793e8a2'),
//       projectName: 'VPS Manager'
//     },
//     createBy: {
//       _id: new ObjectId('662862771ae039a55793e895'),
//       name: ''
//     },
//     assignTo: new ObjectId('662866d51ae039a55793e8ce'),
//     isAccepted: false,
//     isRejected: false,
//     visible: true,
//     createdAt: 2024-04-24T01:59:17.927Z,
//     updatedAt: 2024-04-24T01:59:17.927Z,
//     __v: 0
//   }
// ]

const Request = async ({ requestData }) => {
  const [dialog, setDialog] = useState(false);

  const parsedData = JSON.parse(requestData);

  return (
    <>
      <div className="mr-4">
        <SiGooglecolab
          className="text-white text-2xl hover:text-gray-100 cursor-pointer"
          onClick={() => setDialog(!dialog)}
        />
      </div>
      {dialog && 
        <div className="flex flex-col justify-start items-center p-2 mt-2 fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 z-10 w-[600px] min-h-96 neumorphism overflow-y-scroll">
          <div className="w-full flex justify-end items-center text-red-500 font-bold">
            <span className="cursor-pointer" onClick={() => setDialog(false)}>
              X
            </span>
          </div>
          {parsedData.data.length >= 1 ?parsedData.data.map((req) => (
              <div key={req._id} className="neumorphism-2 px-2 py-1 w-full">
                <div className="flex justify-between items-center">
                  <h4 className="text-left text-black">
                    {req.projectId.projectName}
                  </h4>
                  <div>
                    {/* External Component */}
                    <Buttons reqId={req._id} projectId={req.projectId._id} />
                  </div>
                </div>
                <span className="text-gray-400">{`Created By: ${req.createBy.name}`}</span>
              </div>
            )):<div className="text-black">No request found</div>
            }
        </div>
      }
    </>
  );
};

export default Request;
