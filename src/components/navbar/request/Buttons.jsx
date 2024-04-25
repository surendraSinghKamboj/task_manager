"use client";
import React, { useState } from "react";
import { TiTick } from "react-icons/ti";
import { FaCircleNotch } from "react-icons/fa";
import { acceptRequest, rejectRequest } from "@/actions/request";

const Buttons = ({ reqId, projectId }) => {
  const [isAccepting, setIsAccepting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  const handleAccept = async () => {
    setIsAccepting(true);
    try {
      const res = await acceptRequest({ reqId, projectId });
      const data = JSON.parse(res);
      if (!data.status) {
        setIsAccepting(false);
      } else {
        setIsAccepting(false);
        window.location.reload();
      }
    } catch (error) {
      setIsAccepting(false);
    }
  };

  const handleReject = async () => {
    setIsRejecting(true);
    try {
      const res = await rejectRequest({ reqId, projectId });
      const data = JSON.parse(res);
      if (!data.status) {
        setIsAccepting(false);
      } else {
        setIsAccepting(false);
        window.location.reload();
      }
    } catch (error) {
      setIsAccepting(false);
    }
  };

  return (
    <div className="flex gap-1">
      {isAccepting ? (
        <FaCircleNotch className="animate-spin text-green-500 text-2xl" />
      ) : (
        <TiTick
          className="text-green-500 cursor-pointer hover:scale-110 transition-all duration-300 text-2xl"
          onClick={handleAccept}
        />
      )}
      {isRejecting ? (
        <FaCircleNotch className="animate-spin text-red-500 text-2xl" />
      ) : (
        <span
          className="text-red-500 cursor-pointer hover:scale-110 transition-all duration-300 font-bold"
          onClick={handleReject}
        >
          X
        </span>
      )}
    </div>
  );
};

export default Buttons;
