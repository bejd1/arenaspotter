import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "../_components/loginForm";
import RegisterForm from "../_components/registerForm";

const MyAccount = () => {
  return (
    <div className="w-full flex items-center justify-center my-12">
      <Card className="w-[400px] sm:w-[500px] p-2 sm:p-12">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Login</TabsTrigger>
            <TabsTrigger value="password">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            {/* Login */}
            <LoginForm />
          </TabsContent>
          <TabsContent value="password">
            {/* Register */}
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default MyAccount;
