import { getPermission } from '@/api/permission';
import { useQuery } from '@/app/_hooks/request/use-query';

export const usePermissionQuery = (id: string) => {
  return useQuery({
    queryKey: ['permission', id],
    queryFn: () => getPermission(id),
  });
};
