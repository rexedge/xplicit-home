import { logout } from "@/actions/auth";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

const LogOutButton = () => {
  return (
    <form action={logout} className="grid w-full">
      <Button type="submit" className="btn btn-primary justify-start px-3">
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </Button>
    </form>
  );
};

export default LogOutButton;
