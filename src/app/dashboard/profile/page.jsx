import { fetchProfile } from "@/actions/profile";
import Dp from "@/components/profile/Dp";
import React from "react";

const Profile = async () => {
  const res = await fetchProfile();
  const data = JSON.parse(res);
  //--------------------------------Data Type--------------------------------
  /**
   * { name: user.name, email: user.email, contact: user.contact }
   */
  //-------------------------------------------------------------------------
  return (
    <div className="flex flex-col justify-center items-center min-h-96">
      {/* -------------------------------------------------------------------

                              Profile Data Fetched from Server

          -------------------------------------------------------------------
      */}

      {/* Profile Component */}
      <Dp photo={data?.photo} userId={data._id} />

      <h4 className="w-1/2 border-b-2 border-t-2 border-secondary-700 text-center mt-4">
        Your Profile
      </h4>
      <div className="grid grid-cols-3 w-1/2 mt-2">
        <span className="text-left font-bold text-2xl">Name</span>
        <span className="col-span-2">{data.name}</span>
      </div>
      <div className="grid grid-cols-3 w-1/2 mt-2">
        <span className="text-left font-bold text-2xl">Email</span>
        <span className="col-span-2">{data.email}</span>
      </div>
      <div className="grid grid-cols-3 w-1/2 mt-2">
        <span className="text-left font-bold text-2xl">Contact</span>
        <span className="col-span-2">{data.contact}</span>
      </div>
      {/* -------------------------------------------------------------------

                              Update Password Section
                              
          -------------------------------------------------------------------
      */}
      <h4 className="w-1/2 border-b-2 border-t-2 border-secondary-700 text-center mt-4">
        Change Password
      </h4>
      <div className="grid grid-cols-3 w-1/2 mt-2"></div>
    </div>
  );
};

export default Profile;
