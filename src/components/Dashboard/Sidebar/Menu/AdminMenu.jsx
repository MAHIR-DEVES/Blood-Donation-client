import { FaUserCog } from 'react-icons/fa';
import MenuItem from './MenuItem';
import { BsGraphUp } from 'react-icons/bs';
import { BiSolidBookContent } from 'react-icons/bi';

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={BsGraphUp} label="Statistics" address="/dashboard" />
      <MenuItem icon={FaUserCog} label="Manage Users" address="manage-users" />
      <MenuItem
        icon={BiSolidBookContent}
        label="Content Manage "
        address="content-manage"
      />
    </>
  );
};

export default AdminMenu;
