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
        label="Manage Orders"
        address="manage-orders"
      />
      <MenuItem icon={MdAddBox} label="Add Plant" address="add-plant" />
      <MenuItem icon={MdHomeWork} label="My Inventory" address="my-inventory" />
    </>
  );
};

export default Volunteer;
