import { BsFillHouseAddFill } from 'react-icons/bs';
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md';
import { MdAddBox } from 'react-icons/md';
import MenuItem from './MenuItem';

const Volunteer = () => {
  return (
    <>
      <MenuItem icon={BsFillHouseAddFill} label="Dashboard" address="" />
      <MenuItem
        icon={MdOutlineManageHistory}
        label="Manage Request"
        address="manage-request"
      />
      <MenuItem icon={MdAddBox} label="Add Blog" address="add-blog" />
      <MenuItem icon={MdHomeWork} label="Manage Blog" address="manage-blog" />
    </>
  );
};

export default Volunteer;
