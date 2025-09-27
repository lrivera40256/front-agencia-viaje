import PermissionPage from "./permission";
import RolePage from "./roles";
import UserPage from "./users";

const SecurityPage: React.FC = () => {
  return (
    <div className="p-4 space-y-10">
        <UserPage />
        <RolePage />    
        <PermissionPage />
    </div>
  );
};

export default SecurityPage;
