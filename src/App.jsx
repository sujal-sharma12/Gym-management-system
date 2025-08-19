import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./Pages/Admin/AdminLayout";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AddMember from "./Pages/Admin/AddMember";
import MemberDashboard from "./Pages/Member/Memberlayout";
import UserDashboard from "./Pages/User/Dashboard";
import Home from "./Public/Home";
import AdminLogin from "./Pages/Admin/AdminLogin";
import MemberLogin from "./Pages/Member/MemberLogin";
import ViewEditMember from "./Pages/Admin/ViewEditMember";
import DeleteMember from "./Pages/Admin/DeleteMember";
import CreateBill from "./Pages/Admin/CreateBill";
import AssignPackages from "./Pages/Admin/Assignpackages";
import Report from "./Pages/Admin/Report";
import Supplements from "./Pages/Admin/Supplements";

import EditSupplements from "./Pages/Admin/editSupplements";
import DeleteSupplements from "./Pages/Admin/DeleteSupplements";
import AddDietPlan from "./Pages/Admin/AddDietPlan";
import ViewEditDietPlan from "./Pages/Admin/ViewEditDietPlan";
import DeleteDietPlan from "./Pages/Admin/DeleteDietPlan";
import MemberLayout from "./Pages/Member/Memberlayout";
import MyProfile from "./Pages/Member/MyProfile";
import Dashboard from "./Pages/Member/Dashboard";
import Bills from "./Pages/Member/Bill";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/member/login" element={<MemberLogin />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="addmember" element={<AddMember />} />
          <Route path="vieweditmember" element={<ViewEditMember />} />
          <Route path="deletemember" element={<DeleteMember />} />
          <Route path="createbill" element={<CreateBill/>} />
          <Route path="assignpackages" element={<AssignPackages/>} />
          <Route path="report" element={<Report/>} />
          <Route path="supplements" element={<Supplements/>} />
          <Route path="editsupplements" element={<EditSupplements/>} />
          <Route path="deletesupplements" element={<DeleteSupplements/>} />
          <Route path="adddietplan" element={<AddDietPlan/>} />
          <Route path="viewdietplan" element={<ViewEditDietPlan/>} />
          <Route path="deletedietplan" element={<DeleteDietPlan/>} />

         
        </Route>

        <Route path="/member" element={<MemberLayout />}>
          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="bill" element={<Bills/>} />
          <Route path="profile" element={<MyProfile/>} />
        
        </Route>
        <Route path="/user/dashboard" element={<UserDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
