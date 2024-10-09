import { CharactersResponse } from '@/types/models/character/character';
import { ApiEndpoints } from '@/api/config/config';
import { createDynamicQueryString } from '@/api/helpers/createDynamicQueryString';

interface getAllCharactersProps {
  page?: number;
  name?: string;
  status?: string;
  gender?: string;
}

export const getAllCharacters = async ({
  page,
  name,
  status,
  gender,
}: getAllCharactersProps): Promise<CharactersResponse> => {
  const data = await fetch(`${ApiEndpoints.characters}/${createDynamicQueryString(page, name, status, gender)}`);
  return await data.json();
};
