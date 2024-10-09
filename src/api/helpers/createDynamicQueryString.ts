export const createDynamicQueryString = (page?: number, name?: string, status?: string, gender?: string) => {
  const params = new URLSearchParams();
  if (page) params.append('page', page.toString());
  if (name) params.append('name', name);
  if (status) params.append('status', status);
  if (gender) params.append('gender', gender);

  return params.toString() ? `?${params.toString()}` : '';
};
