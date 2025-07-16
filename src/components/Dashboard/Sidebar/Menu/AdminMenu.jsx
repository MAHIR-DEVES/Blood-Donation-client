import { FaUserCog } from 'react-icons/fa';
import MenuItem from './MenuItem';
import { BsGraphUp } from 'react-icons/bs';
import { BiSolidBookContent } from 'react-icons/bi';
import { MdAddBox } from 'react-icons/md';

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
      <MenuItem icon={MdAddBox} label="Add Blog" address="add-blog" />
    </>
  );
};

export default AdminMenu;
