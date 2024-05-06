import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "../_components/loginForm";
import RegisterForm from "../_components/registerForm";

const MyAccount = () => {
  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <Card className="w-full sm:w-[500px] sm:p-12">
        <Tabs defaultValue="account">
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
