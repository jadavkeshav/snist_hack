import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
    Image,
    Button,
    Input,
    Chip,
    Link
  } from '@nextui-org/react';
  import useAuth from "../../hooks/use-auth"
  import { useState } from 'react';
  import {
    IoReloadSharp
  } from 'react-icons/io5';
  import axios from 'axios';
  import Cookies from 'js-cookie';
  
  const TutorProfile = () => {
  
    const { auth } = useAuth();
    const { user } = auth;
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState(user.avatar);
  
    const handlePasswordUpdate = async () => {
      try {
        await axios.put(`${import.meta.env.VITE_API_URL}/user/update-password`, {
          id: user.id,
          password
        });
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  
    const handleEmailUpdate = async () => {
      try {
        await axios.put(`${import.meta.env.VITE_API_URL}/user/update-email`, {
          id: user.id,
          email
        });
        Cookies.set("user", JSON.stringify({ ...user, email }), { expires: 3 });
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  
    const handleNameUpdate = async () => {
      try {
        await axios.put(`${import.meta.env.VITE_API_URL}/user/update-name`, {
          id: user.id,
          name
        });
        Cookies.set("user", JSON.stringify({ ...user, name }), { expires: 3 });
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  
    const handleAvatarUpdate = async () => {
      try {
        await axios.put(`${import.meta.env.VITE_API_URL}/user/update-avatar`, {
          id: user.id,
          avatar
        });
        Cookies.set("user", JSON.stringify({ ...user, avatar }), { expires: 3 });
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  
    const handleDeleteAccount = async () => {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/user/delete`, {
          data: {
            id: user.id
          }
        });
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  
    return (
      <div className="flex h-screen bg-neutral-100 w-full items-center justify-center">
        <Card className="w-1/2">
          <CardHeader className="flex gap-3 items-center">
            <Image
              alt="nextui logo"
              height={72}
              className="rounded-full"
              radius="sm"
              src={user.avatar}
              width={72}
            />
            <div className="flex flex-col w-full space-y-2">
              <Chip color="secondary">
                {user.username}
              </Chip>
              <div className="flex space-x-2">
                <Input
                  placeholder="Change your name"
                  className="w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  label="Name"
                />
                <Button isIconOnly className="h-auto" color="primary" onClick={handleNameUpdate}>
                  <IoReloadSharp size={20} />
                </Button>
              </div>
              <div className="flex space-x-2">
                <Input
                  placeholder="Change your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email"
                />
                <Button isIconOnly className="h-auto" color="primary" onClick={handleEmailUpdate}>
                  <IoReloadSharp size={20} />
                </Button>
              </div>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="flex flex-col space-y-2">
            <div className="flex space-x-2">
              <Input
                placeholder="Replace your avatar url"
                className="w-full"
                label="Avatar URL"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
              />
              <Button
                isIconOnly
                color="primary"
                className="h-auto"
                onClick={handleAvatarUpdate}
              >
                <IoReloadSharp size={20} />
              </Button>
            </div>
            <div className="flex space-x-2">
              <Input
                placeholder="Change your password"
                type="password"
                className="w-full"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                isIconOnly
                color="primary"
                className="h-auto"
                onClick={handlePasswordUpdate}
              >
                <IoReloadSharp size={20} />
              </Button>
            </div>
            <Divider />
            <Button
              color="danger"
              className="w-full"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
          </CardBody>
          <Divider />
          <CardFooter>
            <div className="flex flex-col space-y-2">
              <Link
                isExternal
                showAnchorIcon
                href="https://github.com/jadavkeshav/snist_hack"
              >
                Visit source code on GitHub.
              </Link>
              <p className="text-sm text-neutral-500">
                Feel free to contribute to the project. 🚀
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    )
  }
  
  export default TutorProfile