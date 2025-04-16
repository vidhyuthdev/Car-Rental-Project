// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import useVerifyToken from "../../Hooks/useVerifyToken";
// import api from "../../api"

// const UserProfile = () => {
//   const navigate = useNavigate();
//   const { verifyToken } = useVerifyToken();
//   const [isEditOpen, setIsEditOpen] = useState(false);

//   // Old and New profile states
//   const [oldProfile, setOldProfile] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     count:0
//   });

//   const [newProfile, setNewProfile] = useState({ ...oldProfile });

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const token = localStorage.getItem("token");
  
//       try {
//         const res = await api.post("/profile/get-profile", { token });
//         const data = res.data;
        
        
  
//         setOldProfile({
//           name: data.name,
//           email: data.email,
//           phone: data.mobile,
//           count:data.count
//         });
  
//         setNewProfile({
//           name: data.name,
//           email: data.email,
//           phone: data.mobile,
//           count:data.count
//         });
//       } catch (error) {
//         if (error?.response?.status === 401) {
//           localStorage.removeItem("token");
//           localStorage.removeItem("name");
//           localStorage.removeItem("email");
//           toast.error("Session expired. Please log in again.");
//           navigate("/auth");
//         } else {
//           toast.error(error?.response?.data?.msg || "Failed to fetch profile");
//         }
//       }
//     };
  
//     fetchProfile();
//   }, []);
  

//   const handleSave = async () => {
//     try {
//       const t = localStorage.getItem("token");
  
//       const payload = {
//         token: t,
//         oldProfile,
//         newProfile,
//       };
  
//       const res = await api.post("/profile/update-profile", payload);
//       console.log(res.data);
      
//       if (res.status === 200) {
//         toast.success("Profile updated successfully");
  
//         // If email changed, force logout
//         if (oldProfile.email !== newProfile.email) {
//           toast("Email changed. Please log in again.");
//           localStorage.removeItem("token");
//           localStorage.removeItem("name");
//           localStorage.removeItem("email");
//           navigate("/auth");
//           return;
//         }
  
//         setOldProfile({ ...newProfile });
//         setIsEditOpen(false);
//       }
//     } catch (error) {
//       if (error?.response?.status === 401) {
//         localStorage.removeItem("token");
//         localStorage.removeItem("name");
//         localStorage.removeItem("email");
//         toast.error("Unauthorized. Please log in again.");
//         navigate("/auth");
//       } else {
//         toast.error(error?.response?.data?.msg || "Update failed");
//       }
//     }
//   };
  

//   return (
//     <div className="h-full p-8 bg-white text-custom-dark flex flex-col items-center">
//       {/* Avatar */}
//       <div className="w-24 h-24 rounded-full bg-custom-lightblue text-white flex items-center justify-center text-3xl font-bold shadow">
//         {oldProfile.name
//           .split(" ")
//           .map((n) => n[0])
//           .join("")}
//       </div>

//       {/* Name & Info */}
//       <h2 className="text-2xl font-semibold mt-4">{oldProfile.name}</h2>
//       <div className="mt-6 space-y-2 text-lg text-center">
//         <p className="text-left">
//           <strong>Email:</strong> {oldProfile.email}
//         </p>
//         <p className="text-left">
//           <strong>Phone:</strong> {oldProfile.phone}
//         </p>
//         <p className="text-left">
//           <strong>No of Bookings:</strong> {oldProfile.count}
//         </p>
//       </div>

//       {/* Edit Button */}
//       <div className="mt-6 flex gap-4 flex-wrap justify-center">
//         <button
//           className="bg-custom-dark text-white px-4 py-2 rounded-lg hover:opacity-90 transition cursor-pointer"
//           onClick={() => setIsEditOpen(true)}
//         >
//           Edit Profile
//         </button>
//       </div>

//       {/* Edit Modal */}
//       {isEditOpen && (
//         <div className="fixed inset-0 bg-[#000000b3] bg-opacity-40 flex justify-center items-center z-50">
//           <div className="bg-white text-black p-6 rounded-xl w-96 shadow-lg">
//             <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
//             <input
//               type="text"
//               value={newProfile.name}
//               onChange={(e) =>
//                 setNewProfile({ ...newProfile, name: e.target.value })
//               }
//               className="w-full p-2 border mt-2 rounded"
//               placeholder="Name"
//             />
//             <input
//               type="email"
//               value={newProfile.email}
//               onChange={(e) =>
//                 setNewProfile({ ...newProfile, email: e.target.value })
//               }
//               className="w-full p-2 border mt-2 rounded"
//               placeholder="Email"
//             />
//             <input
//               type="tel"
//               value={newProfile.phone}
//               onChange={(e) =>
//                 setNewProfile({ ...newProfile, phone: e.target.value })
//               }
//               className="w-full p-2 border mt-2 rounded"
//               placeholder="Phone"
//             />
//             <div className="mt-4 flex justify-end gap-2">
//               <button
//                 className="px-4 py-2 bg-gray-300 text-black rounded-lg cursor-pointer"
//                 onClick={() => {
//                   setIsEditOpen(false);
//                   setNewProfile({ ...oldProfile }); // Reset if cancelled
//                 }}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-custom-dark text-white rounded-lg cursor-pointer"
//                 onClick={handleSave}
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserProfile;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useVerifyToken from "../../Hooks/useVerifyToken";
import api from "../../api"

const UserProfile = () => {
  const navigate = useNavigate();
  
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Old and New profile states
  const [oldProfile, setOldProfile] = useState({
    name: "",
    email: "",
    phone: "",
    count: 0
  });

  const [newProfile, setNewProfile] = useState({ ...oldProfile });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await api.post("/profile/get-profile", { token });
        const data = res.data;
        setOldProfile({
          name: data.name,
          email: data.email,
          phone: data.mobile,
          count: data.count
        });
        setNewProfile({
          name: data.name,
          email: data.email,
          phone: data.mobile,
          count: data.count
        });
      } catch (error) {
        if (error?.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("name");
          localStorage.removeItem("email");
          toast.error("Session expired. Please log in again.");
          navigate("/auth");
        } else {
          toast.error(error?.response?.data?.msg || "Failed to fetch profile");
        }
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const t = localStorage.getItem("token");
      const payload = {
        token: t,       
        name:newProfile.name,
        mobile:newProfile.phone
      };
      const res = await api.post("/profile/update-profile", payload);
      if (res.status === 200) {
        toast.success("Profile updated successfully");
        setOldProfile({ ...newProfile });
        setIsEditOpen(false);
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        toast.error("Unauthorized. Please log in again.");
        navigate("/auth");
      } else {
        toast.error(error?.response?.data?.msg || "Update failed");
      }
    }
  };

  return (
    <div className="h-full p-8 bg-white text-custom-dark flex flex-col items-center">
      {/* Avatar */}
      <div className="w-24 h-24 rounded-full bg-custom-lightblue text-white flex items-center justify-center text-3xl font-bold shadow">
        {oldProfile.name
          .split(" ")
          .map((n) => n[0])
          .join(" ")}
      </div>

      {/* Name & Info */}
      <h2 className="text-2xl font-semibold mt-4">{oldProfile.name}</h2>
      <div className="mt-6 space-y-2 text-lg text-center">
        <p className="text-left">
          <strong>Email:</strong> {oldProfile.email}
        </p>
        <p className="text-left">
          <strong>Phone:</strong> {oldProfile.phone}
        </p>
        <p className="text-left">
          <strong>No of Bookings:</strong> {oldProfile.count}
        </p>
      </div>

      {/* Edit Button */}
      <div className="mt-6 flex gap-4 flex-wrap justify-center">
        <button
          className="bg-custom-dark text-white px-4 py-2 rounded-lg hover:opacity-90 transition cursor-pointer"
          onClick={() => setIsEditOpen(true)}
        >
          Edit Profile
        </button>
      </div>

      {/* Edit Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-[#000000b3] bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white text-black p-6 rounded-xl w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <input
              type="text"
              value={newProfile.name}
              onChange={(e) =>
                setNewProfile({ ...newProfile, name: e.target.value })
              }
              className="w-full p-2 border mt-2 rounded"
              placeholder="Name"
            />
            {/* Email is shown but not editable */}
            <input
              type="email"
              value={newProfile.email}
              disabled
              className="w-full p-2 border mt-2 rounded bg-gray-100 cursor-not-allowed"
              placeholder="Email"
            />
            <input
              type="tel"
              value={newProfile.phone}
              onChange={(e) =>
                setNewProfile({ ...newProfile, phone: e.target.value })
              }
              className="w-full p-2 border mt-2 rounded"
              placeholder="Phone"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 text-black rounded-lg cursor-pointer"
                onClick={() => {
                  setIsEditOpen(false);
                  setNewProfile({ ...oldProfile }); // Reset if cancelled
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-custom-dark text-white rounded-lg cursor-pointer"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
