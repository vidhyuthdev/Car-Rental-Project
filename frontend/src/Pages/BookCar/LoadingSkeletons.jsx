import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const LoadingSkeletons = () => {
    return(
  <div className="border rounded-2xl shadow-md overflow-hidden text-sm p-3">
    <Skeleton height={150} width="100%" className="mb-2" />
    <Skeleton height={20} width="70%" className="mb-1" />
    <Skeleton height={14} width="40%" className="mb-1" />
    <Skeleton height={14} width="30%" className="mb-1" />
    <Skeleton height={18} width="50%" className="mb-2" />
    <Skeleton height={32} width="100%" />
  </div>)
};
export default LoadingSkeletons



