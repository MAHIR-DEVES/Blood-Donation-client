import AdminStatistics from '../../../components/Dashboard/Statistics/AdminStatistics';
import DonarStatistics from '../../../components/Dashboard/Statistics/DonarStatistics';
import VolunteerStatistics from '../../../components/Dashboard/Statistics/VolunteerStatistics';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useRole from '../../../hooks/useRole';
const Statistics = () => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) return <LoadingSpinner />;
  console.log(role);

  return (
    <div>
      {role === 'admin' && <AdminStatistics />}
      {role === 'volunteer' && <VolunteerStatistics />}
      {role === 'donor' && <DonarStatistics />}
    </div>
  );
};

export default Statistics;
