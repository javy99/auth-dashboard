import { NavLink, Route, Routes } from "react-router";

export function ProfilePage() {
  return (
    <div className="p-4">
      <Routes>
        <Route index element={<Overview />} />
        <Route path="edit" element={<EditForm />} />
      </Routes>
    </div>
  );
}

function Overview() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Profile</h1>
      <div className="p-4">
        <NavLink to="edit" className="text-blue-600">
          Edit profile
        </NavLink>
      </div>
    </div>
  );
}

function EditForm() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Profile &gt; Edit</h1>
      <NavLink to="../" className="text-blue-600">
        Go back
      </NavLink>

      <div className="p-4">
        <h2 className="text-xl">Edit form</h2>
      </div>
    </div>
  );
}
